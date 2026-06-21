"use client";

import * as React from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleLog } from "@/store/playground-store";

// --------------------------------------------------------------------
// PreviewPane — sandboxed iframe that renders the generated preview
// HTML and forwards console messages from the iframe back to the
// parent window via postMessage.
// --------------------------------------------------------------------
export interface PreviewPaneProps {
  html: string;
  onConsoleLog: (log: ConsoleLog) => void;
  className?: string;
  isRunning?: boolean;
}

export function PreviewPane({
  html,
  onConsoleLog,
  className,
  isRunning = false,
}: PreviewPaneProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Use a key derived from html to force iframe reload on demand
  // (srcDoc change already reloads, but this is defensive).
  const reloadKey = React.useMemo(() => {
    return `preview-${html.length}-${html.slice(0, 32)}`;
  }, [html]);

  // Listen for postMessage events from the iframe
  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      if (!data.__playground_console) return;

      const level = (data.level as ConsoleLog["level"]) ?? "log";
      const message =
        typeof data.message === "string" ? data.message : String(data.message);
      const timestamp =
        typeof data.timestamp === "number" ? data.timestamp : Date.now();

      onConsoleLog({
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        level,
        message,
        timestamp,
      });
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onConsoleLog]);

  return (
    <div
      dir="ltr"
      className={cn(
        "relative h-full w-full bg-white",
        className,
      )}
    >
      <iframe
        ref={iframeRef}
        key={reloadKey}
        title="معاينة الكود"
        srcDoc={html}
        sandbox="allow-scripts allow-modals"
        className="h-full w-full border-0 bg-white"
      />
      {isRunning && (
        <div className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md bg-zinc-900/80 px-2 py-1 text-xs text-white">
          <Loader2 className="size-3 animate-spin" />
          جارٍ التشغيل…
        </div>
      )}
      {!html && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400">
          <RefreshCw className="ml-2 size-4" />
          لا توجد معاينة بعد
        </div>
      )}
    </div>
  );
}
