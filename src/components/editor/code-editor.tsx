"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --------------------------------------------------------------------
// CodeEditor — lightweight textarea-based code editor with a
// line-numbers gutter on the right side (RTL-aware) and Tab handling.
// --------------------------------------------------------------------
export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: "light" | "dark";
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "text",
  theme = "dark",
  className,
  readOnly = false,
  placeholder,
}: CodeEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);

  // Compute line numbers from current content (no wrapping expected)
  const lineCount = React.useMemo(
    () => Math.max(value.split("\n").length, 1),
    [value],
  );

  // ----------------------------------------------------------------
  // Tab key inserts 2 spaces instead of moving focus
  // ----------------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = value.slice(0, start) + "  " + value.slice(end);
      onChange(next);
      // Restore caret after React re-renders the new value
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const pos = start + 2;
          textareaRef.current.selectionStart = pos;
          textareaRef.current.selectionEnd = pos;
        }
      });
    }
  };

  // ----------------------------------------------------------------
  // Keep gutter scroll in sync with the textarea
  // ----------------------------------------------------------------
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      dir="rtl"
      data-language={language}
      className={cn(
        "relative flex h-full w-full overflow-hidden font-mono text-sm",
        isDark
          ? "bg-zinc-950 text-zinc-100"
          : "bg-white text-zinc-900",
        className,
      )}
    >
      {/* Gutter — appears on the RIGHT side because parent is RTL */}
      <div
        ref={gutterRef}
        dir="ltr"
        aria-hidden
        className={cn(
          "flex h-full shrink-0 select-none flex-col items-end overflow-hidden border-l px-3 py-3 text-left tabular-nums",
          isDark
            ? "border-zinc-800 bg-zinc-900/60 text-zinc-500"
            : "border-zinc-200 bg-zinc-50 text-zinc-400",
        )}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i} className="block leading-6">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Textarea — content is LTR */}
      <textarea
        ref={textareaRef}
        dir="ltr"
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        wrap="off"
        className={cn(
          "h-full flex-1 resize-none overflow-auto whitespace-pre bg-transparent px-3 py-3 leading-6 outline-none",
          "placeholder:text-muted-foreground/60",
        )}
        style={{ tabSize: 2 }}
      />
    </div>
  );
}
