"use client";

import * as React from "react";
import {
  Trash2,
  AlertTriangle,
  X,
  Info,
  Bug,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConsoleLog } from "@/store/playground-store";

// --------------------------------------------------------------------
// ConsoleOutput — displays captured console logs with level-based
// colors, icons, and timestamps.
// --------------------------------------------------------------------
export interface ConsoleOutputProps {
  logs: ConsoleLog[];
  onClear: () => void;
  className?: string;
}

type Level = ConsoleLog["level"];

const LEVEL_CONFIG: Record<
  Level,
  {
    color: string;
    bg: string;
    icon?: React.ComponentType<{ className?: string }>;
    label: string;
  }
> = {
  log: { color: "text-zinc-300", bg: "bg-transparent", label: "log" },
  info: {
    color: "text-sky-400",
    bg: "bg-sky-500/5",
    icon: Info,
    label: "info",
  },
  warn: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    icon: AlertTriangle,
    label: "warn",
  },
  error: {
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    icon: X,
    label: "error",
  },
  debug: {
    color: "text-violet-400",
    bg: "bg-violet-500/5",
    icon: Bug,
    label: "debug",
  },
};

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function ConsoleOutput({
  logs,
  onClear,
  className,
}: ConsoleOutputProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const errorCount = logs.filter((l) => l.level === "error").length;
  const warnCount = logs.filter((l) => l.level === "warn").length;

  return (
    <div
      dir="rtl"
      className={cn(
        "flex h-full flex-col bg-zinc-950 text-zinc-200",
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-800 px-3">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Terminal className="size-4" />
          <span>وحدة التحكم</span>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
            {logs.length}
          </span>
          {errorCount > 0 && (
            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-xs text-rose-400">
              {errorCount} خطأ
            </span>
          )}
          {warnCount > 0 && (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
              {warnCount} تحذير
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={logs.length === 0}
          className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <Trash2 className="size-3.5" />
          مسح
        </Button>
      </div>

      {/* Logs */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2"
      >
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-zinc-500">
            <p>لا يوجد مخرجات بعد. شغل الكود لرؤية النتائج.</p>
          </div>
        ) : (
          <ul dir="ltr" className="space-y-1 font-mono text-xs">
            {logs.map((log) => {
              const cfg = LEVEL_CONFIG[log.level] ?? LEVEL_CONFIG.log;
              const Icon = cfg.icon;
              return (
                <li
                  key={log.id}
                  className={cn(
                    "flex items-start gap-2 rounded px-2 py-1.5",
                    cfg.bg,
                  )}
                >
                  {Icon ? (
                    <Icon className={cn("mt-0.5 size-3.5 shrink-0", cfg.color)} />
                  ) : (
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 text-[10px] font-bold uppercase",
                        cfg.color,
                      )}
                    >
                      ›
                    </span>
                  )}
                  <span className="shrink-0 text-zinc-600">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  <span className="shrink-0 text-zinc-600">
                    [{cfg.label}]
                  </span>
                  <span
                    className={cn(
                      "whitespace-pre-wrap break-words leading-5",
                      cfg.color,
                    )}
                  >
                    {log.message}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
