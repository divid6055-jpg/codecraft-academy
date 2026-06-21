"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  Users,
  PlayCircle,
  ChevronLeft,
  CheckCircle2,
  Lock,
  BookOpen,
  Code2,
  Trophy,
  FileText,
  Award,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getCourseById, getCourseProgressStats, getRelatedCourses } from "@/data/courses";
import { getTrackById } from "@/data/tracks";
import { useNavigationStore } from "@/store/navigation-store";
import { useProgressStore } from "@/store/progress-store";
import { formatNumber, formatDuration, getDifficultyLabel, getDifficultyColor, cn } from "@/lib/utils";

const LESSON_TYPE_ICONS: Record<string, LucideIcon> = {
  reading: FileText,
  video: PlayCircle,
  interactive: Code2,
  exercise: Code2,
  quiz: Trophy,
  project: Award,
  challenge: Sparkles,
};

export function CourseDetailView({ courseId }: { courseId: string }) {
  const navigate = useNavigationStore((s) => s.navigate);
  const { isEnrolled, enrollCourse, isLessonCompleted, getCourseProgress } = useProgressStore();

  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">الدورة غير موجودة</h2>
        <Button onClick={() => navigate({ name: "catalog" })}>العودة للكتالوج</Button>
      </div>
    );
  }

  const stats = getCourseProgressStats(courseId);
  const track = getTrackById(course.trackId);
  const enrolled = isEnrolled(courseId);
  const progress = getCourseProgress(courseId, stats.totalLessons);
  const relatedCourses = getRelatedCourses(courseId, 3);

  const handleStart = () => {
    if (!enrolled) {
      enrollCourse(courseId);
    }
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      navigate({ name: "lesson", courseId: course.id, lessonId: firstLesson.id });
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className={cn("relative overflow-hidden bg-gradient-to-br", course.color)}>
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative mx-auto px-4 lg:px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 text-white space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => navigate({ name: "tracks" })} className="hover:underline opacity-80">
                  {track?.title.ar}
                </button>
                <ChevronLeft className="h-4 w-4 opacity-60" />
                <span className="opacity-80">{course.title.ar}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur">
                  {getDifficultyLabel(course.difficulty)}
                </Badge>
                {course.price === 0 && (
                  <Badge variant="secondary" className="bg-emerald-500/30 text-white border-0 backdrop-blur">
                    مجاني بالكامل
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur">
                  <Star className="h-3 w-3 ml-1 fill-amber-400 text-amber-400" />
                  <span className="lnum">{course.rating}</span>
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                {course.title.ar}
              </h1>
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                {course.subtitle.ar}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="h-4 w-4" />
                  <span className="lnum">{stats.totalLessons} درس</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {formatDuration(course.estimatedHours * 60)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span className="lnum">{formatNumber(course.studentsCount)} طالب</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="h-4 w-4" />
                  <span className="lnum">{stats.totalExercises} تمرين</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Avatar className="h-10 w-10 border-2 border-white/30">
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {course.instructor.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="opacity-80">المدرّس</div>
                  <div className="font-medium">{course.instructor.name}</div>
                </div>
              </div>
            </div>

            {/* Action card */}
            <Card className="bg-white/95 dark:bg-card/95 backdrop-blur border-0">
              <CardContent className="p-6 space-y-4">
                {enrolled && (
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">تقدمك في الدورة</span>
                      <span className="font-bold lnum">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-brand to-accent text-brand-foreground hover:opacity-90 text-base h-12"
                >
                  <PlayCircle className="h-5 w-5 ml-2" />
                  {enrolled ? "تابع التعلم" : "ابدأ الدورة الآن"}
                </Button>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-lg font-bold lnum">{stats.totalLessons}</div>
                    <div className="text-[10px] text-muted-foreground">درس</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-lg font-bold lnum">{stats.totalExercises}</div>
                    <div className="text-[10px] text-muted-foreground">تمرين</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-lg font-bold lnum">{stats.totalQuizzes}</div>
                    <div className="text-[10px] text-muted-foreground">اختبار</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    وصول مدى الحياة
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    شهادة إتمام
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    وصول للمجتمع
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: description & modules */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand" />
                  عن الدورة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course.description.ar}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-code">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-brand" />
                  محتوى الدورة
                  <span className="text-sm font-normal text-muted-foreground mr-2">
                    ({course.modules.length} وحدات • {stats.totalLessons} درس)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={[course.modules[0]?.id]} className="space-y-3">
                  {course.modules.map((module, idx) => {
                    const completedInModule = module.lessons.filter((l) =>
                      isLessonCompleted(l.id)
                    ).length;
                    const moduleProgress = module.lessons.length > 0
                      ? Math.round((completedInModule / module.lessons.length) * 100)
                      : 0;

                    return (
                      <AccordionItem
                        key={module.id}
                        value={module.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-muted/50">
                          <div className="flex items-center gap-3 text-right flex-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand text-sm font-bold lnum">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{module.title.ar}</div>
                              <div className="text-xs text-muted-foreground">
                                {module.lessons.length} دروس • {formatDuration(module.estimatedMinutes)}
                              </div>
                            </div>
                            {moduleProgress === 100 && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-2">
                          <div className="space-y-1">
                            {module.lessons.map((lesson) => {
                              const Icon = LESSON_TYPE_ICONS[lesson.type] || FileText;
                              const completed = isLessonCompleted(lesson.id);
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => {
                                    if (!enrolled) enrollCourse(courseId);
                                    navigate({ name: "lesson", courseId: course.id, lessonId: lesson.id });
                                  }}
                                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-right group"
                                >
                                  <div className={cn(
                                    "flex h-7 w-7 items-center justify-center rounded-md shrink-0",
                                    completed
                                      ? "bg-emerald-500/10 text-emerald-500"
                                      : "bg-muted text-muted-foreground group-hover:text-foreground"
                                  )}>
                                    {completed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium line-clamp-1">{lesson.title.ar}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {lesson.type === "quiz" ? "اختبار" :
                                       lesson.type === "exercise" ? "تمرين" :
                                       lesson.type === "video" ? "فيديو" : "درس"} • {lesson.estimatedMinutes} دقيقة
                                    </div>
                                  </div>
                                  {lesson.isFree && !enrolled && (
                                    <Badge variant="secondary" className="text-[10px]">مجاني</Badge>
                                  )}
                                  {lesson.isLocked && (
                                    <Lock className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>المدرّس</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground">
                      {course.instructor.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-lg">{course.instructor.name}</div>
                    <div className="text-sm text-brand">{course.instructor.title.ar}</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="lnum">{course.instructor.rating}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="lnum">{formatNumber(course.instructor.studentsCount)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {course.instructor.bio.ar}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">مهارات ستكتسبها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {course.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {tag}
                  </div>
                ))}
              </CardContent>
            </Card>

            {relatedCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">دورات ذات صلة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedCourses.map((rc) => (
                    <button
                      key={rc.id}
                      onClick={() => navigate({ name: "course-detail", courseId: rc.id })}
                      className="w-full flex items-start gap-3 text-right hover:bg-muted p-2 rounded-lg transition-colors group"
                    >
                      <div className={cn("h-10 w-10 rounded-lg bg-gradient-to-br shrink-0", rc.color)} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-2 group-hover:text-brand">
                          {rc.title.ar}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {rc.modules.reduce((s, m) => s + m.lessons.length, 0)} دروس
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
