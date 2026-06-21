"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CodeFile, ProgrammingLanguage } from "@/types";

// --------------------------------------------------------------------
// Language colors (used for the small dot on each file tab)
// --------------------------------------------------------------------
const LANG_COLORS: Record<ProgrammingLanguage, string> = {
  html: "#e34c26",
  css: "#2965f1",
  javascript: "#f7df1e",
  typescript: "#3178c6",
  python: "#3776ab",
  react: "#61dafb",
  nodejs: "#339933",
  sql: "#4479a1",
  bash: "#4eaa25",
  json: "#525252",
  markdown: "#083fa1",
  text: "#6b7280",
};

export function languageColor(language: ProgrammingLanguage | string): string {
  return (LANG_COLORS as Record<string, string>)[language] ?? "#6b7280";
}

// --------------------------------------------------------------------
// FileTab
// --------------------------------------------------------------------
export interface FileTabProps {
  file: CodeFile;
  isActive: boolean;
  onClick: () => void;
  onClose?: () => void;
  className?: string;
}

export function FileTab({
  file,
  isActive,
  onClick,
  onClose,
  className,
}: FileTabProps) {
  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      dir="rtl"
      className={cn(
        "group relative flex h-9 cursor-pointer items-center gap-2 rounded-t-md border border-b-0 px-3 text-sm whitespace-nowrap transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive
          ? "bg-background text-foreground border-border"
          : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/70 hover:text-foreground",
        className,
      )}
      title={file.name}
    >
      <span
        aria-hidden
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: languageColor(file.language) }}
      />
      <span className="font-mono text-xs">{file.name}</span>
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={cn(
            "inline-flex size-4 items-center justify-center rounded text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100",
            isActive && "opacity-100",
          )}
          aria-label={`إغلاق ${file.name}`}
        >
          <X className="size-3" />
        </button>
      )}
      {isActive && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
        />
      )}
    </div>
  );
}
