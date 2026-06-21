"use client";

import * as React from "react";
import {
  Play,
  RotateCcw,
  Download,
  Plus,
  Sun,
  Moon,
  FileCode2,
  FilePlus2,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileTab, languageColor } from "@/components/editor/file-tab";
import { CodeEditor } from "@/components/editor/code-editor";
import { PreviewPane } from "@/components/editor/preview-pane";
import { ConsoleOutput } from "@/components/editor/console-output";
import {
  usePlaygroundStore,
  type ConsoleLog,
} from "@/store/playground-store";
import { useNavigationStore } from "@/store/navigation-store";
import { useTheme } from "next-themes";
import { cn, downloadAsFile } from "@/lib/utils";
import type { ProgrammingLanguage } from "@/types";

// --------------------------------------------------------------------
// Language options for the "new file" dialog
// --------------------------------------------------------------------
const LANGUAGES: { value: ProgrammingLanguage; label: string; ext: string }[] =
  [
    { value: "html", label: "HTML", ext: "html" },
    { value: "css", label: "CSS", ext: "css" },
    { value: "javascript", label: "JavaScript", ext: "js" },
    { value: "typescript", label: "TypeScript", ext: "ts" },
    { value: "json", label: "JSON", ext: "json" },
    { value: "markdown", label: "Markdown", ext: "md" },
    { value: "text", label: "نص", ext: "txt" },
  ];

// --------------------------------------------------------------------
// PlaygroundView — top-level entry point. Renders only when the
// navigation view is "playground".
// --------------------------------------------------------------------
export function PlaygroundView() {
  const view = useNavigationStore((s) => s.view);
  if (view.name !== "playground") return null;
  return <PlaygroundViewInner />;
}

// --------------------------------------------------------------------
// PlaygroundViewInner — the actual interactive editor
// --------------------------------------------------------------------
function PlaygroundViewInner() {
  const files = usePlaygroundStore((s) => s.files);
  const activeFileId = usePlaygroundStore((s) => s.activeFileId);
  const previewHtml = usePlaygroundStore((s) => s.previewHtml);
  const consoleLogs = usePlaygroundStore((s) => s.consoleLogs);
  const isRunning = usePlaygroundStore((s) => s.isRunning);

  const setActiveFile = usePlaygroundStore((s) => s.setActiveFile);
  const addFile = usePlaygroundStore((s) => s.addFile);
  const removeFile = usePlaygroundStore((s) => s.removeFile);
  const updateFileContent = usePlaygroundStore((s) => s.updateFileContent);
  const runCode = usePlaygroundStore((s) => s.runCode);
  const reset = usePlaygroundStore((s) => s.reset);
  const addConsoleLog = usePlaygroundStore((s) => s.addConsoleLog);
  const clearConsole = usePlaygroundStore((s) => s.clearConsole);

  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = React.useState<"light" | "dark">(
    "dark",
  );

  // Sync editor theme with the global theme unless user overrides locally
  React.useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setEditorTheme(theme);
    }
  }, [theme]);

  // Add file dialog state
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newFileName, setNewFileName] = React.useState("");
  const [newFileLang, setNewFileLang] =
    React.useState<ProgrammingLanguage>("html");

  const activeFile = React.useMemo(
    () => files.find((f) => f.id === activeFileId) ?? files[0],
    [files, activeFileId],
  );

  // Debounce the html fed to the iframe (500ms) to avoid flicker on
  // every keystroke.
  const [debouncedHtml, setDebouncedHtml] = React.useState(previewHtml);
  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedHtml(previewHtml), 500);
    return () => clearTimeout(t);
  }, [previewHtml]);

  const handleAddFile = () => {
    const trimmed = newFileName.trim();
    const langMeta = LANGUAGES.find((l) => l.value === newFileLang);
    const name = trimmed || `untitled.${langMeta?.ext ?? "txt"}`;
    addFile({
      name,
      language: newFileLang,
      content: "",
    });
    setNewFileName("");
    setNewFileLang("html");
    setIsAddOpen(false);
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const mime =
      activeFile.language === "html"
        ? "text/html"
        : activeFile.language === "css"
          ? "text/css"
          : activeFile.language === "javascript"
            ? "text/javascript"
            : activeFile.language === "json"
              ? "application/json"
              : "text/plain";
    downloadAsFile(activeFile.name, activeFile.content, mime);
  };

  const toggleEditorTheme = () => {
    setEditorTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const onConsoleLog = React.useCallback(
    (log: ConsoleLog) => addConsoleLog(log),
    [addConsoleLog],
  );

  return (
    <div
      dir="rtl"
      className="flex h-[calc(100vh-4rem)] flex-col bg-background"
    >
      {/* Top toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b bg-background px-3">
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
          >
            <Play className="size-3.5" />
            تشغيل
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="size-3.5" />
            إعادة تعيين
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!activeFile}
          >
            <Download className="size-3.5" />
            تنزيل
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleEditorTheme}
            aria-label="تبديل سمة المحرر"
            title="تبديل سمة المحرر"
          >
            {editorTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileCode2 className="size-3.5" />
          <span>المحرر التفاعلي</span>
          {activeFile && (
            <span className="hidden text-muted-foreground/70 sm:inline">
              · {activeFile.name}
            </span>
          )}
        </div>
      </div>

      {/* File tabs */}
      <div className="flex h-10 shrink-0 items-center gap-1 overflow-x-auto border-b bg-muted/30 px-2">
        {files.map((file) => (
          <FileTab
            key={file.id}
            file={file}
            isActive={file.id === activeFile?.id}
            onClick={() => setActiveFile(file.id)}
            onClose={
              files.length > 1 ? () => removeFile(file.id) : undefined
            }
          />
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="mr-1 h-8 shrink-0"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="size-3.5" />
          ملف جديد
        </Button>
      </div>

      {/* Main split: editor (left) | preview + console (right) */}
      <ResizablePanelGroup
        dir="ltr"
        direction="horizontal"
        className="flex-1"
      >
        <ResizablePanel defaultSize={50} minSize={25}>
          {activeFile ? (
            <CodeEditor
              value={activeFile.content}
              onChange={(content) =>
                updateFileContent(activeFile.id, content)
              }
              language={activeFile.language}
              theme={editorTheme}
              placeholder="ابدأ الكتابة هنا…"
              className="h-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
              لا يوجد ملف. أضف ملفاً للبدء.
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={25}>
          {/* Vertical split: preview (top) | console (bottom) */}
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={60} minSize={20}>
              <div className="h-full border-b bg-white">
                <PreviewPane
                  html={debouncedHtml}
                  onConsoleLog={onConsoleLog}
                  isRunning={isRunning}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={15}>
              <ConsoleOutput logs={consoleLogs} onClear={clearConsole} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Add file dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة ملف جديد</DialogTitle>
            <DialogDescription>
              أنشئ ملفاً جديداً للعمل عليه داخل المحرر التفاعلي.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="new-file-name">اسم الملف</Label>
              <Input
                id="new-file-name"
                placeholder="مثال: app.js"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label>لغة البرمجة</Label>
              <Select
                value={newFileLang}
                onValueChange={(v) =>
                  setNewFileLang(v as ProgrammingLanguage)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر لغة" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: languageColor(lang.value),
                          }}
                        />
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleAddFile}>
              <FilePlus2 className="size-4" />
              إنشاء الملف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
