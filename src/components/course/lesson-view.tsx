"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Bookmark,
  Share2,
  CheckCircle2,
  Circle,
  Lightbulb,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  PlayCircle,
  Code2,
  Copy,
  Check,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  getCourseById,
  getLessonById,
  getNextLesson,
  getPreviousLesson,
  getCourseProgressStats,
} from "@/data/courses";
import { useNavigationStore } from "@/store/navigation-store";
import { useProgressStore } from "@/store/progress-store";
import { useNotificationStore } from "@/store/notification-store";
import { cn, copyToClipboard, formatDuration } from "@/lib/utils";
import type { Callout, CodeSample, LocalizedString } from "@/types";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { ExerciseRunner } from "@/components/quiz/exercise-runner";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const CALLOUT_STYLES: Record<
  Callout["type"],
  { icon: typeof Lightbulb; classes: string; iconColor: string; label: string }
> = {
  tip: {
    icon: Lightbulb,
    classes: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-500",
    label: "نصيحة",
  },
  warning: {
    icon: AlertTriangle,
    classes: "border-orange-500/30 bg-orange-500/5",
    iconColor: "text-orange-500",
    label: "تحذير",
  },
  info: {
    icon: Info,
    classes: "border-sky-500/30 bg-sky-500/5",
    iconColor: "text-sky-500",
    label: "معلومة",
  },
  danger: {
    icon: AlertCircle,
    classes: "border-rose-500/30 bg-rose-500/5",
    iconColor: "text-rose-500",
    label: "تنبيه",
  },
  success: {
    icon: CheckCircle,
    classes: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-500",
    label: "نجاح",
  },
};

function CodeBlock({ sample }: { sample: CodeSample }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card my-4" dir="ltr">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono">{sample.filename || "code"}</span>
          <Badge variant="outline" className="text-[10px] font-mono">
            {sample.language}
          </Badge>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="نسخ الكود"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono leading-relaxed overflow-x-auto text-foreground/90">
        <code>{sample.code}</code>
      </pre>
      {sample.explanation && (
        <div className="px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          {sample.explanation.ar}
        </div>
      )}
    </div>
  );
}

function CalloutBlock({ callout }: { callout: Callout }) {
  const style = CALLOUT_STYLES[callout.type];
  const Icon = style.icon;
  return (
    <div className={cn("rounded-lg border p-4 my-4 flex gap-3", style.classes)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", style.iconColor)} />
      <div className="flex-1">
        {callout.title && (
          <div className="font-medium text-sm mb-1">{callout.title.ar}</div>
        )}
        <p className="text-sm text-foreground/80 leading-relaxed">{callout.body.ar}</p>
      </div>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-5 mb-2 text-foreground">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pr-5 space-y-1.5 mb-4 text-foreground/90">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pr-5 space-y-1.5 mb-4 text-foreground/90">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-brand" dir="ltr">
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border border-border rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted px-3 py-2 text-right font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">{children}</td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-r-4 border-brand/40 bg-muted/30 pr-4 py-2 my-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline inline-flex items-center gap-0.5"
            >
              {children}
              <ExternalLink className="h-3 w-3" />
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function LessonView({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const navigate = useNavigationStore((s) => s.navigate);
  const {
    isLessonCompleted,
    completeLesson,
    isLessonBookmarked,
    bookmarkLesson,
    unbookmarkLesson,
    recordActivity,
  } = useProgressStore();
  const pushNotification = useNotificationStore((s) => s.push);

  const course = getCourseById(courseId);
  const lesson = getLessonById(lessonId);

  if (!course || !lesson) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">الدرس غير موجود</h2>
        <Button onClick={() => navigate({ name: "course-detail", courseId })}>
          العودة للدورة
        </Button>
      </div>
    );
  }

  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isLessonBookmarked(lesson.id);
  const nextLesson = getNextLesson(courseId, lessonId);
  const prevLesson = getPreviousLesson(courseId, lessonId);
  const stats = getCourseProgressStats(courseId);
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIdx = allLessons.findIndex((l) => l.id === lesson.id);
  const progressPct = Math.round(((currentIdx + 1) / allLessons.length) * 100);

  const handleComplete = () => {
    if (!completed) {
      completeLesson(courseId, lesson.id, 30);
      recordActivity(lesson.estimatedMinutes, 30, 1);
      pushNotification({
        type: "achievement",
        title: "أحسنت! أكملت الدرس",
        body: `أنهيت درس "${lesson.title.ar}" بنجاح. +30 XP`,
        icon: "CheckCircle",
      });
    }
    if (nextLesson) {
      navigate({ name: "lesson", courseId, lessonId: nextLesson.id });
    } else {
      navigate({ name: "course-detail", courseId });
      pushNotification({
        type: "success",
        title: "تهانينا! أكملت الدورة",
        body: `أنهيت دورة "${course.title.ar}" بالكامل!`,
        icon: "Trophy",
      });
    }
  };

  const handleBookmark = () => {
    if (bookmarked) {
      unbookmarkLesson(lesson.id);
    } else {
      bookmarkLesson(lesson.id);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-10">
      {/* Breadcrumb & progress */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <button
            onClick={() => navigate({ name: "course-detail", courseId })}
            className="hover:text-brand transition-colors line-clamp-1"
          >
            {course.title.ar}
          </button>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{lesson.title.ar}</span>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progressPct} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground lnum">
            {currentIdx + 1} / {allLessons.length}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {lesson.type === "quiz" ? "اختبار" :
                   lesson.type === "exercise" ? "تمرين" :
                   lesson.type === "video" ? "فيديو" : "درس"}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.estimatedMinutes} دقيقة
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">{lesson.title.ar}</h1>
              <p className="text-muted-foreground">{lesson.summary.ar}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                aria-label="حفظ"
                className={cn(bookmarked && "text-brand")}
              >
                <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="مشاركة">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Reading / Interactive content */}
          {(lesson.type === "reading" || lesson.type === "interactive" || lesson.type === "video") && (
            <article className="space-y-4">
              <MarkdownContent content={lesson.content.body.ar} />

              {lesson.content.callouts?.map((callout, i) => (
                <CalloutBlock key={i} callout={callout} />
              ))}

              {lesson.content.codeSamples?.map((sample) => (
                <CodeBlock key={sample.id} sample={sample} />
              ))}

              {lesson.content.keyTakeaways && lesson.content.keyTakeaways.length > 0 && (
                <Card className="border-brand/20 bg-brand/5">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand" />
                      النقاط الرئيسية
                    </h3>
                    <ul className="space-y-2">
                      {lesson.content.keyTakeaways.map((kt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                          <span>{kt.ar}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {lesson.content.references && lesson.content.references.length > 0 && (
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-brand" />
                      مراجع للمزيد
                    </h3>
                    <ul className="space-y-2">
                      {lesson.content.references.map((ref, i) => (
                        <li key={i}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand hover:underline flex items-center gap-1"
                          >
                            {ref.title.ar}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </article>
          )}

          {/* Quiz content */}
          {lesson.type === "quiz" && lesson.content.quiz && (
            <QuizRunner
              quiz={lesson.content.quiz}
              courseId={courseId}
              lessonId={lessonId}
              onComplete={(score) => {
                recordActivity(10, score, 0);
              }}
            />
          )}

          {/* Exercise content */}
          {lesson.type === "exercise" && lesson.content.exercise && (
            <ExerciseRunner
              exercise={lesson.content.exercise}
              courseId={courseId}
              lessonId={lessonId}
              onComplete={(passed) => {
                if (passed) {
                  recordActivity(15, 50, 0);
                  pushNotification({
                    type: "achievement",
                    title: "أحسنت! حللت التمرين",
                    body: `نجحت في حل تمرين "${lesson.title.ar}". +50 XP`,
                    icon: "Trophy",
                  });
                }
              }}
            />
          )}

          {/* Navigation footer */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => prevLesson && navigate({ name: "lesson", courseId, lessonId: prevLesson.id })}
              disabled={!prevLesson}
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              الدرس السابق
            </Button>
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-brand to-accent text-brand-foreground"
            >
              {completed ? (
                <>
                  {nextLesson ? "الدرس التالي" : "إنهاء الدورة"}
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </>
              ) : (
                <>
                  إكمال ومتابعة
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar: lessons list */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm">محتوى الدورة</h3>
                <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {course.modules.map((module, mIdx) => (
                    <div key={module.id} className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground px-2 pt-2 pb-1">
                        {mIdx + 1}. {module.title.ar}
                      </div>
                      {module.lessons.map((l) => {
                        const lCompleted = isLessonCompleted(l.id);
                        const isCurrent = l.id === lesson.id;
                        return (
                          <button
                            key={l.id}
                            onClick={() => navigate({ name: "lesson", courseId, lessonId: l.id })}
                            className={cn(
                              "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-right text-xs hover:bg-muted transition-colors",
                              isCurrent && "bg-brand/10 text-brand font-medium"
                            )}
                          >
                            {lCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="line-clamp-1">{l.title.ar}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
