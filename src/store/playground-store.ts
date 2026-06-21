"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CodeFile, ProgrammingLanguage } from "@/types";

// --------------------------------------------------------------------
// Playground Store — interactive code editor state
// --------------------------------------------------------------------
interface PlaygroundState {
  files: CodeFile[];
  activeFileId: string | null;
  output: string;
  isRunning: boolean;
  previewHtml: string;
  consoleLogs: ConsoleLog[];
  isAutosaveEnabled: boolean;
  lastSavedAt: string | null;

  // Actions
  setActiveFile: (fileId: string) => void;
  addFile: (file: Omit<CodeFile, "id">) => string;
  removeFile: (fileId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  renameFile: (fileId: string, name: string) => void;
  runCode: () => void;
  clearOutput: () => void;
  setOutput: (output: string) => void;
  setPreviewHtml: (html: string) => void;
  addConsoleLog: (log: ConsoleLog) => void;
  clearConsole: () => void;
  loadProject: (files: CodeFile[]) => void;
  saveSnapshot: () => void;
  reset: () => void;
}

export interface ConsoleLog {
  id: string;
  level: "log" | "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: number;
}

const DEFAULT_FILES: CodeFile[] = [
  {
    id: "file-html",
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تجربتي الأولى</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="card">
    <h1>مرحبا بالعالم!</h1>
    <p>أنا أكتب كود HTML حقيقي.</p>
    <button id="btn">اضغط هنا</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: "file-css",
    name: "styles.css",
    language: "css",
    content: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #fff;
}

.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2.5rem;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

h1 { font-size: 2rem; margin-bottom: 0.5rem; }
p  { opacity: 0.85; margin-bottom: 1.5rem; }

button {
  background: #fff;
  color: #6366f1;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform .2s ease;
}

button:hover { transform: translateY(-2px); }`,
  },
  {
    id: "file-js",
    name: "script.js",
    language: "javascript",
    content: `const btn = document.getElementById("btn");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  btn.textContent = \`تم الضغط \${count} مرة\`;
  console.log("Click count:", count);
});

console.log("تم تحميل السكربت بنجاح");`,
  },
];

const buildPreview = (files: CodeFile[]): string => {
  const htmlFile = files.find((f) => f.language === "html");
  const cssFile = files.find((f) => f.language === "css");
  const jsFile = files.find((f) => f.language === "javascript");

  if (!htmlFile) return "<p style='font-family: sans-serif; padding: 1rem;'>لا يوجد ملف HTML</p>";

  let html = htmlFile.content;

  // Inject CSS
  if (cssFile) {
    const cssTag = `<style data-injected="true">\n${cssFile.content}\n</style>`;
    html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, cssTag);
    if (!/<style data-injected/i.test(html)) {
      html = html.replace(/<\/head>/i, `${cssTag}</head>`);
    }
  }

  // Inject JS with console capture
  if (jsFile) {
    const consoleCapture = `
<script>
(function(){
  const send = (level, args) => {
    try {
      window.parent.postMessage({
        __playground_console: true,
        level,
        message: Array.from(args).map(a => {
          try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
          catch(e) { return String(a); }
        }).join(' '),
        timestamp: Date.now()
      }, '*');
    } catch(e) {}
  };
  ['log','info','warn','error','debug'].forEach(level => {
    const orig = console[level];
    console[level] = function(...args){ send(level, args); orig.apply(console, args); };
  });
  window.onerror = function(msg, src, line, col, err){
    send('error', [(err && err.stack ? err.stack : msg) + ' (line ' + line + ')']);
    return false;
  };
})();
</script>`;
    const jsTag = `<script>\ntry {\n${jsFile.content}\n} catch(e) { console.error(e.message); }\n</script>`;
    html = html.replace(/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/gi, consoleCapture + jsTag);
    if (!/<script data-injected/i.test(html)) {
      html = html.replace(/<\/body>/i, `${consoleCapture}${jsTag}</body>`);
    }
  }

  return html;
};

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set, get) => ({
      files: DEFAULT_FILES,
      activeFileId: DEFAULT_FILES[0].id,
      output: "",
      isRunning: false,
      previewHtml: buildPreview(DEFAULT_FILES),
      consoleLogs: [],
      isAutosaveEnabled: true,
      lastSavedAt: null,

      setActiveFile: (fileId) => set({ activeFileId: fileId }),

      addFile: (file) => {
        const id = `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const newFile: CodeFile = { ...file, id };
        set((state) => ({
          files: [...state.files, newFile],
          activeFileId: id,
        }));
        return id;
      },

      removeFile: (fileId) =>
        set((state) => {
          if (state.files.length <= 1) return state;
          const newFiles = state.files.filter((f) => f.id !== fileId);
          return {
            files: newFiles,
            activeFileId:
              state.activeFileId === fileId ? newFiles[0].id : state.activeFileId,
          };
        }),

      updateFileContent: (fileId, content) => {
        set((state) => ({
          files: state.files.map((f) => (f.id === fileId ? { ...f, content } : f)),
        }));
        // Live preview if HTML/CSS/JS
        const state = get();
        if (state.isAutosaveEnabled) {
          set({ previewHtml: buildPreview(state.files) });
        }
      },

      renameFile: (fileId, name) =>
        set((state) => ({
          files: state.files.map((f) => (f.id === fileId ? { ...f, name } : f)),
        })),

      runCode: () => {
        const state = get();
        set({ isRunning: true, consoleLogs: [], output: "" });
        const html = buildPreview(state.files);
        set({ previewHtml: html, isRunning: false, lastSavedAt: new Date().toISOString() });
      },

      clearOutput: () => set({ output: "" }),
      setOutput: (output) => set({ output }),
      setPreviewHtml: (html) => set({ previewHtml: html }),

      addConsoleLog: (log) =>
        set((state) => ({ consoleLogs: [...state.consoleLogs, log].slice(-200) })),

      clearConsole: () => set({ consoleLogs: [] }),

      loadProject: (files) =>
        set({
          files,
          activeFileId: files[0]?.id ?? null,
          previewHtml: buildPreview(files),
          consoleLogs: [],
          output: "",
        }),

      saveSnapshot: () => set({ lastSavedAt: new Date().toISOString() }),

      reset: () =>
        set({
          files: DEFAULT_FILES,
          activeFileId: DEFAULT_FILES[0].id,
          output: "",
          isRunning: false,
          previewHtml: buildPreview(DEFAULT_FILES),
          consoleLogs: [],
        }),
    }),
    {
      name: "codecraft-playground",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        files: state.files,
        activeFileId: state.activeFileId,
        isAutosaveEnabled: state.isAutosaveEnabled,
      }),
    }
  )
);
