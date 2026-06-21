"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Trophy,
  Zap,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Calendar,
  Award,
  Star,
  ArrowLeft,
  Bookmark,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { COURSES, getCourseById } from "@/data/courses";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useNavigationStore } from "@/store/navigation-store";
import { useUserStore } from "@/store/user-store";
import { useProgressStore, getLastNDaysStreak, xpForLevel, xpToNextLevel } from "@/store/progress-store";
import { cn, formatDuration, formatNumber, getDifficultyLabel } from "@/lib/utils";

export function DashboardView() {
  const navigate = useNavigationStore((s) => s.navigate);
  const { profile } = useUserStore();
  const {
    xp,
    level,
    streak,
    enrolledCourses,
    completedLessons,
    bookmarkedLessons,
    exerciseRecords,
    quizResults,
    achievements,
    totalMinutesSpent,
    todayMinutesSpent,
    dailyGoalMinutes,
    streakHistory,
  } = useProgressStore();

  // Build last 14 days data
  const last14Days = React.useMemo(() => {
    const result = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split("T")[0];
      const entry = streakHistory.find((s) => s.date === dateStr);
      result.push({
        date: date.toLocaleDateString("ar-EG", { weekday: "short" }),
        xp: entry?.xpEarned ?? 0,
        minutes: entry?.minutesSpent ?? 0,
        lessons: entry?.lessonsCompleted ?? 0,
      });
    }
    return result;
  }, [streakHistory]);

  const { current, needed, remaining } = xpToNextLevel(xp, level);
  const levelProgress = (current / needed) * 100;
  const todayProgress = Math.min(100, (todayMinutesSpent / dailyGoalMinutes) * 100);

  const enrolledCoursesData = enrolledCourses
    .map((e) => {
      const course = getCourseById(e.courseId);
      if (!course) return null;
      const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
      return {
        ...e,
        course,
        totalLessons,
        progress: totalLessons > 0 ? Math.round((e.completedLessons.length / totalLessons) * 100) : 0,
      };
    })
    .filter(Boolean) as Array<{
    course: typeof COURSES[0];
    completedLessons: string[];
    progress: number;
    totalLessons: number;
    courseId: string;
  }>;

  const recentAchievements = achievements
    .map((a) => ({
      ...a,
      def: ACHIEVEMENTS.find((ad) => ad.id === a.id),
    }))
    .filter((a) => a.def)
    .slice(-5)
    .reverse();

  const stats = [
    {
      icon: Flame,
      label: "سلسلة الأيام",
      value: streak,
      suffix: "يوم",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Zap,
      label: "نقاط الخبرة",
      value: xp,
      suffix: "XP",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Trophy,
      label: "المستوى",
      value: level,
      suffix: "",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: CheckCircle2,
      label: "دروس مكتملة",
      value: completedLessons.length,
      suffix: "درس",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-brand/30">
            <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground text-xl font-bold">
              {profile?.name.slice(0, 2) || "ط"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">مرحباً، {profile?.name}!</h1>
            <p className="text-muted-foreground text-sm">استمر في رحلة التعلم — أنت تفعل بشكل رائع!</p>
          </div>
        </div>
        <Button onClick={() => navigate({ name: "catalog" })} className="bg-gradient-to-r from-brand to-accent text-brand-foreground">
          <BookOpen className="h-4 w-4 ml-2" />
          استكشف دورات جديدة
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
                <div className="text-2xl font-bold lnum">
                  {stat.value}
                  <span className="text-sm text-muted-foreground mr-1">{stat.suffix}</span>
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: activity chart + enrolled courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-5 w-5 text-brand" />
                نشاطك خلال الأسبوعين الماضيين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={last14Days}>
                  <defs>
                    <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="xp"
                    stroke="var(--brand)"
                    strokeWidth={2}
                    fill="url(#xpGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrolled courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-base">
                  <BookOpen className="h-5 w-5 text-brand" />
                  دوراتي المسجلة
                </span>
                {enrolledCoursesData.length > 0 && (
                  <Badge variant="secondary">{enrolledCoursesData.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledCoursesData.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground mb-3">لم تسجل في أي دورة بعد</p>
                  <Button onClick={() => navigate({ name: "catalog" })} variant="outline">
                    تصفح الدورات
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledCoursesData.map((enrolled) => (
                    <div
                      key={enrolled.courseId}
                      onClick={() => navigate({ name: "course-detail", courseId: enrolled.courseId })}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors group"
                    >
                      <div className={cn("h-12 w-12 rounded-lg bg-gradient-to-br shrink-0", enrolled.course.color)} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-1 group-hover:text-brand transition-colors">
                          {enrolled.course.title.ar}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={enrolled.progress} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground lnum">{enrolled.progress}%</span>
                        </div>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: level, daily goal, achievements */}
        <div className="space-y-6">
          {/* Level card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                المستوى {level}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{current} XP</span>
                <span className="text-muted-foreground lnum">{needed} XP</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                تحتاج <span className="font-medium text-brand lnum">{remaining} XP</span> للمستوى التالي
              </p>
            </CardContent>
          </Card>

          {/* Daily goal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-5 w-5 text-brand" />
                هدف اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold lnum">
                  {todayMinutesSpent}
                  <span className="text-base text-muted-foreground"> / {dailyGoalMinutes} دقيقة</span>
                </div>
              </div>
              <Progress value={todayProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {todayProgress >= 100
                  ? "🎉 أحسنت! حققت هدف اليوم"
                  : `تبقى ${dailyGoalMinutes - todayMinutesSpent} دقيقة لهدفك`}
              </p>
            </CardContent>
          </Card>

          {/* Recent achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-5 w-5 text-violet-500" />
                الإنجازات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentAchievements.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  لا توجد إنجازات بعد. ابدأ التعلم لفتح إنجازاتك الأولى!
                </p>
              ) : (
                <div className="space-y-2">
                  {recentAchievements.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => navigate({ name: "achievements" })}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs", a.def?.color)}>
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-1">{a.def?.title.ar}</div>
                        <div className="text-xs text-muted-foreground">+{a.def?.xpReward} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookmarks */}
          {bookmarkedLessons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-brand fill-current" />
                  الدروس المحفوظة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  لديك {bookmarkedLessons.length} درس محفوظ
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto mt-1"
                  onClick={() => navigate({ name: "profile" })}
                >
                  عرض الكل
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
