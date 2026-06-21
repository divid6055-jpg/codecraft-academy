// ====================================================================
// CodeCraft Academy — Utility Functions
// ====================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --------------------------------------------------------------------
// Formatting helpers
// --------------------------------------------------------------------
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} ساعة`;
  return `${hours} س ${mins} د`;
}

export function formatDate(iso: string, locale: string = "ar"): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function timeAgo(iso: string, locale: string = "ar"): string {
  const date = new Date(iso);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [number, string, string][] = [
    [31536000, "سنة", "year"],
    [2592000, "شهر", "month"],
    [86400, "يوم", "day"],
    [3600, "ساعة", "hour"],
    [60, "دقيقة", "minute"],
  ];
  for (const [secondsInUnit, arLabel, enLabel] of intervals) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return locale === "ar"
        ? `منذ ${interval} ${arLabel}`
        : `${interval} ${enLabel}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return locale === "ar" ? "الآن" : "just now";
}

// --------------------------------------------------------------------
// XP / Level helpers
// --------------------------------------------------------------------
export function xpProgressInLevel(xp: number, level: number): number {
  let remaining = xp;
  for (let l = 1; l < level; l++) {
    remaining -= 100 + l * 50;
  }
  const needed = 100 + level * 50;
  return Math.min(100, (remaining / needed) * 100);
}

export function xpToNextLevel(xp: number, level: number): { current: number; needed: number; remaining: number } {
  let remaining = xp;
  for (let l = 1; l < level; l++) {
    remaining -= 100 + l * 50;
  }
  const needed = 100 + level * 50;
  return { current: remaining, needed, remaining: needed - remaining };
}

// --------------------------------------------------------------------
// Color helpers
// --------------------------------------------------------------------
export function getDifficultyColor(level: string): string {
  switch (level) {
    case "beginner":
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900";
    case "intermediate":
      return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900";
    case "advanced":
      return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900";
    case "expert":
      return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900";
    default:
      return "text-muted-foreground bg-muted border-border";
  }
}

export function getDifficultyLabel(level: string, locale: string = "ar"): string {
  const labels: Record<string, { ar: string; en: string }> = {
    beginner: { ar: "مبتدئ", en: "Beginner" },
    intermediate: { ar: "متوسط", en: "Intermediate" },
    advanced: { ar: "متقدم", en: "Advanced" },
    expert: { ar: "خبير", en: "Expert" },
  };
  return labels[level]?.[locale] ?? level;
}

// --------------------------------------------------------------------
// ID generators
// --------------------------------------------------------------------
export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// --------------------------------------------------------------------
// Misc
// --------------------------------------------------------------------
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function downloadAsFile(filename: string, content: string, mime: string = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "…";
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
