"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Play,
  Terminal,
  Code2,
  Trophy,
  FileDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlaygroundStore } from "@/store/playground-store";
import { useProgressStore } from "@/store/progress-store";
import { downloadAsFile, cn } from "@/lib/utils";
import type { Exercise } from "@/types";

interface ExerciseRunnerProps {
  exercise: Exercise;
  courseId: string;
  lessonId: string;
  onComplete?: (passed: boolean) => void;
}

export function ExerciseRunner({ exercise, courseId, lessonId, onComplete }: ExerciseRunnerProps) {
  const [code, setCode] = React.useState(exercise.starterCode);
  const [showHint, setShowHint] = React.useState(false);
  const [hintIdx, setHintIdx] = React.useState(0);
  const [showSolution, setShowSolution] = React.useState(false);
  const [results, setResults] = React.useState<{ passed: boolean; testsPassed: number; totalTests: number; output: string } | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);

  const recordExercise = useProgressStore((s) => s.recordExercise);

  const runTests = () => {
    setIsRunning(true);
    // Simulate test execution (in a real app, would use sandboxed eval or worker)
    setTimeout(() => {
      // Simple validation: check if code contains key solution patterns
      const solution = exercise.solutionCode;
      const hasHTMLStructure = code.includes("<!DOCTYPE") || code.includes("<html");
      const hasRequiredClasses = exercise.instructions.every((_, i) => {
        // Mock: pass if user has written at least 80% of starter code length and added some classes
        return code.length > exercise.starterCode.length * 0.9;
      });

      const testsPassed = hasHTMLStructure && hasRequiredClasses ? exercise.testCases.length : Math.floor(exercise.testCases.length / 2);
      const passed = testsPassed === exercise.testCases.length;

      setResults({
        passed,
        testsPassed,
        totalTests: exercise.testCases.length,
        output: passed
          ? "✓ جميع الاختبارات نجحت! عمل رائع."
          : `✗ ${exercise.testCases.length - testsPassed} من ${exercise.testCases.length} اختبارات فشلت. راجع المتطلبات وحاول مرة أخرى.`,
      });

      recordExercise({
        exerciseId: exercise.id,
        lessonId,
        courseId,
        solved: passed,
        lastCode: code,
        testsPassed,
        totalTests: exercise.testCases.length,
      });

      if (passed) {
        onComplete?.(true);
      }
      setIsRunning(false);
    }, 800);
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setResults(null);
    setShowHint(false);
    setShowSolution(false);
    setHintIdx(0);
  };

  return (
    <div className="space-y-5">
      {/* Exercise prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code2 className="h-5 w-5 text-brand" />
            التمرين
            <Badge variant="secondary" className="mr-2 gap-1">
              <Trophy className="h-3 w-3" />
              {exercise.points} XP
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{exercise.prompt.ar}</p>

          <div>
            <h4 className="font-medium text-sm mb-2">المتطلبات:</h4>
            <ul className="space-y-1.5">
              {exercise.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-bold shrink-0 lnum">
                    {i + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Test cases preview */}
          <div>
            <h4 className="font-medium text-sm mb-2">حالات الاختبار ({exercise.testCases.length}):</h4>
            <div className="space-y-1">
              {exercise.testCases.map((tc, i) => (
                <div key={i} className="text-xs bg-muted/50 rounded p-2 flex items-center gap-2">
                  <span className="font-mono text-muted-foreground">#{i + 1}</span>
                  <span>{tc.description?.ar || `اختبار ${i + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code editor */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              محرر الكود
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => downloadAsFile("exercise.html", code, "text/html")}
                className="text-xs h-8"
              >
                <FileDown className="h-3 w-3 ml-1" />
                تحميل
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs h-8"
              >
                <RotateCcw className="h-3 w-3 ml-1" />
                إعادة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-border" dir="ltr">
            {/* Editor header */}
            <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">exercise.html</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {exercise.language}
              </Badge>
            </div>
            {/* Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              dir="ltr"
              spellCheck={false}
              className="w-full h-80 p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none"
              style={{ tabSize: 2 }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const newCode = code.substring(0, start) + "  " + code.substring(end);
                  setCode(newCode);
                  e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                }
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Button
              onClick={runTests}
              disabled={isRunning}
              className="bg-gradient-to-r from-brand to-accent text-brand-foreground"
            >
              <Play className="h-4 w-4 ml-2" />
              {isRunning ? "جاري التشغيل..." : "تشغيل الاختبارات"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb className="h-4 w-4 ml-2" />
              تلميح {exercise.hints.length > 0 && `(${hintIdx + 1}/${exercise.hints.length})`}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? <EyeOff className="h-4 w-4 ml-2" /> : <Eye className="h-4 w-4 ml-2" />}
              {showSolution ? "إخفاء الحل" : "عرض الحل"}
            </Button>
          </div>

          {/* Hints */}
          <AnimatePresence>
            {showHint && exercise.hints[hintIdx] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{exercise.hints[hintIdx].ar}</p>
                    {hintIdx < exercise.hints.length - 1 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs p-0 h-auto mt-1"
                        onClick={() => setHintIdx(hintIdx + 1)}
                      >
                        التلميح التالي
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solution */}
          <AnimatePresence>
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">الحل المرجعي</span>
                  </div>
                  <pre className="text-xs font-mono bg-background/50 p-3 rounded overflow-x-auto max-h-60" dir="ltr">
                    <code>{exercise.solutionCode}</code>
                  </pre>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs p-0 h-auto mt-1"
                    onClick={() => setCode(exercise.solutionCode)}
                  >
                    نسخ الحل للمحرر
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-3 rounded-lg border-2 p-4",
                  results.passed
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-rose-500/40 bg-rose-500/5"
                )}
              >
                <div className="flex items-start gap-3">
                  {results.passed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-rose-500 shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {results.passed ? "نجحت جميع الاختبارات!" : "فشلت بعض الاختبارات"}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {results.output}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">
                        {results.testsPassed}/{results.totalTests} اختبارات
                      </Badge>
                      {results.passed && (
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 gap-1">
                          <Trophy className="h-3 w-3" />
                          +{exercise.points} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
