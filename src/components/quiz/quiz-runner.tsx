"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Clock,
  Award,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useProgressStore } from "@/store/progress-store";
import { cn } from "@/lib/utils";
import type { Quiz, QuizQuestion } from "@/types";

interface QuizRunnerProps {
  quiz: Quiz;
  courseId: string;
  lessonId: string;
  onComplete?: (score: number) => void;
}

export function QuizRunner({ quiz, courseId, lessonId, onComplete }: QuizRunnerProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number[]>>({});
  const [showResults, setShowResults] = React.useState(false);
  const [startTime] = React.useState(Date.now());
  const [showExplanation, setShowExplanation] = React.useState(false);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  const currentQuestion: QuizQuestion = quiz.questions[currentIdx];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIdx + (showResults ? 1 : 0)) / totalQuestions) * 100;

  const handleSelect = (questionId: string, optionIdx: number, multi: boolean) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (multi) {
        return {
          ...prev,
          [questionId]: current.includes(optionIdx)
            ? current.filter((i) => i !== optionIdx)
            : [...current, optionIdx].sort(),
        };
      }
      return { ...prev, [questionId]: [optionIdx] };
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      const userAns = (answers[q.id] || []).sort();
      const correctAns = [...q.correctAnswers].sort();
      if (JSON.stringify(userAns) === JSON.stringify(correctAns)) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(false);
    } else {
      const score = calculateScore();
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      recordQuiz({
        quizId: quiz.id,
        lessonId,
        courseId,
        score,
        totalQuestions,
        correctAnswers: Math.round((score / 100) * totalQuestions),
        timeSpent,
      });
      setShowResults(true);
      onComplete?.(score);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentIdx(0);
    setShowExplanation(false);
  };

  // ----------------------------------------------------------------
  // Results screen
  // ----------------------------------------------------------------
  if (showResults) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;
    const correctCount = Math.round((score / 100) * totalQuestions);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className={cn(
          "border-2",
          passed ? "border-emerald-500/40 bg-emerald-500/5" : "border-rose-500/40 bg-rose-500/5"
        )}>
          <CardContent className="p-8 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={cn(
                "inline-flex h-20 w-20 items-center justify-center rounded-full",
                passed ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
              )}
            >
              {passed ? <Trophy className="h-10 w-10" /> : <AlertCircle className="h-10 w-10" />}
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold mb-1">
                {passed ? "مبروك! اجتزت الاختبار" : "لم تنجح هذه المرة"}
              </h2>
              <p className="text-muted-foreground">
                {passed
                  ? "أداء رائع! واصل التعلم."
                  : `تحتاج إلى ${quiz.passingScore}% للنجاح. حاول مرة أخرى!`}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="rounded-lg bg-card p-3">
                <div className="text-2xl font-bold lnum">{score}%</div>
                <div className="text-xs text-muted-foreground">النتيجة</div>
              </div>
              <div className="rounded-lg bg-card p-3">
                <div className="text-2xl font-bold lnum">{correctCount}/{totalQuestions}</div>
                <div className="text-xs text-muted-foreground">إجابات صحيحة</div>
              </div>
              <div className="rounded-lg bg-card p-3">
                <div className="text-2xl font-bold lnum">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}</div>
                <div className="text-xs text-muted-foreground">الوقت</div>
              </div>
            </div>

            <Button onClick={handleRestart} variant="outline">
              <RotateCcw className="h-4 w-4 ml-2" />
              إعادة الاختبار
            </Button>
          </CardContent>
        </Card>

        {/* Review answers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">مراجعة الإجابات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quiz.questions.map((q, idx) => {
              const userAns = answers[q.id] || [];
              const isCorrect = JSON.stringify(userAns.sort()) === JSON.stringify([...q.correctAnswers].sort());
              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-lg border p-4",
                    isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="font-medium text-sm">
                        {idx + 1}. {q.prompt.ar}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        إجابتك: {userAns.map(i => q.options?.[i]?.ar).join(", ") || "لم تجب"}
                      </div>
                      {!isCorrect && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">
                          الإجابة الصحيحة: {q.correctAnswers.map(i => q.options?.[i]?.ar).join(", ")}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        {q.explanation.ar}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ----------------------------------------------------------------
  // Question screen
  // ----------------------------------------------------------------
  const isMulti = currentQuestion.type === "multiple-choice";
  const userAnswer = answers[currentQuestion.id] || [];
  const isAnswered = userAnswer.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3 w-3" />
          سؤال {currentIdx + 1} من {totalQuestions}
        </Badge>
        <Badge variant="secondary">{currentQuestion.points} نقطة</Badge>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">
                {currentQuestion.prompt.ar}
              </CardTitle>
              {isMulti && (
                <p className="text-xs text-muted-foreground">
                  يمكنك اختيار أكثر من إجابة
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              {currentQuestion.options?.map((opt, i) => {
                const selected = userAnswer.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(currentQuestion.id, i, isMulti)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border-2 text-right transition-all",
                      selected
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-brand/40 hover:bg-muted/50"
                    )}
                  >
                    {isMulti ? (
                      <Checkbox checked={selected} className="data-[state=checked]:bg-brand" />
                    ) : (
                      <div className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2",
                        selected ? "border-brand bg-brand" : "border-muted-foreground/40"
                      )}>
                        {selected && <div className="h-2 w-2 rounded-full bg-brand-foreground" />}
                      </div>
                    )}
                    <span className="flex-1 text-sm">{opt.ar}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIdx === 0}
        >
          <ChevronRight className="h-4 w-4 ml-1" />
          السابق
        </Button>
        <div className="flex gap-1">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === currentIdx
                  ? "bg-brand w-6"
                  : answers[quiz.questions[i].id]?.length
                  ? "bg-emerald-500"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-gradient-to-r from-brand to-accent text-brand-foreground"
        >
          {currentIdx === totalQuestions - 1 ? "إنهاء الاختبار" : "التالي"}
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  );
}
