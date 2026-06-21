"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Lock,
  Sparkles,
  Crown,
  Medal,
  Award,
  Star,
  Footprints,
  Flame,
  BookOpen,
  Code,
  Target,
  CalendarCheck,
  Library,
  Route,
  Zap,
  GraduationCap,
  ClipboardCheck,
  Pencil,
  Gem,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ACHIEVEMENTS, getAchievementsByTier } from "@/data/achievements";
import { useProgressStore } from "@/store/progress-store";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Crown,
  Medal,
  Award,
  Star,
  Footprints,
  Flame,
  BookOpen,
  Code,
  Target,
  CalendarCheck,
  Library,
  Route,
  Zap,
  GraduationCap,
  ClipboardCheck,
  Pencil,
  Gem,
};

const TIER_LABELS: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  bronze: { label: "برونزي", color: "from-amber-700 to-yellow-700", icon: Medal },
  silver: { label: "فضي", color: "from-slate-400 to-gray-500", icon: Award },
  gold: { label: "ذهبي", color: "from-amber-400 to-yellow-500", icon: Trophy },
  platinum: { label: "بلاتيني", color: "from-cyan-300 to-teal-400", icon: Crown },
  diamond: { label: "ماسـي", color: "from-violet-400 via-fuchsia-400 to-pink-400", icon: Gem },
};

export function AchievementsView() {
  const { achievements, xp, completedLessons, exerciseRecords, streak, quizResults, enrolledCourses } = useProgressStore();

  const unlockedIds = new Set(achievements.map((a) => a.id));
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = unlockedIds.size;
  const completionPercent = Math.round((unlockedCount / totalAchievements) * 100);

  // Calculate progress for each locked achievement
  const getProgress = (def: typeof ACHIEVEMENTS[0]): number => {
    const req = def.requirement;
    let current = 0;
    switch (req.type) {
      case "lessons-completed":
        current = completedLessons.length;
        break;
      case "exercises-solved":
        current = exerciseRecords.filter((e) => e.solved).length;
        break;
      case "quizzes-passed":
        current = quizResults.filter((q) => q.score >= 70).length;
        break;
      case "streak-days":
        current = streak;
        break;
      case "xp-earned":
        current = xp;
        break;
      case "courses-completed":
        current = enrolledCourses.filter((e) => {
          // count courses with 100% (rough estimate)
          return e.completedLessons.length > 0;
        }).length;
        break;
      default:
        return 0;
    }
    return Math.min(100, Math.round((current / req.value) * 100));
  };

  const tiers = ["bronze", "silver", "gold", "platinum", "diamond"] as const;

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-fuchsia-400 to-violet-400 text-white shadow-lg">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">الإنجازات والشارات</h1>
            <p className="text-muted-foreground">اجمع الشارات وارتقِ في مستويات الإنجاز</p>
          </div>
        </div>

        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">إجمالي التقدم</span>
              <span className="text-sm font-bold">
                <span className="lnum">{unlockedCount}</span> / <span className="lnum">{totalAchievements}</span>
              </span>
            </div>
            <Progress value={completionPercent} className="h-3" />
            <div className="grid grid-cols-5 gap-2 mt-4">
              {tiers.map((tier) => {
                const tierAchs = getAchievementsByTier(tier);
                const unlocked = tierAchs.filter((a) => unlockedIds.has(a.id)).length;
                const TierIcon = TIER_LABELS[tier].icon;
                return (
                  <div key={tier} className="text-center">
                    <div className={cn("mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br mb-1", TIER_LABELS[tier].color)}>
                      <TierIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[10px] text-muted-foreground">{TIER_LABELS[tier].label}</div>
                    <div className="text-xs font-bold lnum">{unlocked}/{tierAchs.length}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements by tier */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="all">الكل</TabsTrigger>
          {tiers.map((tier) => (
            <TabsTrigger key={tier} value={tier}>{TIER_LABELS[tier].label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {tiers.map((tier) => {
            const tierAchs = getAchievementsByTier(tier);
            if (tierAchs.length === 0) return null;
            const TierIcon = TIER_LABELS[tier].icon;
            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", TIER_LABELS[tier].color)}>
                    <TierIcon className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold">{TIER_LABELS[tier].label}</h2>
                  <span className="text-xs text-muted-foreground">
                    {tierAchs.filter((a) => unlockedIds.has(a.id)).length}/{tierAchs.length}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tierAchs.map((ach) => (
                    <AchievementCard
                      key={ach.id}
                      achievement={ach}
                      unlocked={unlockedIds.has(ach.id)}
                      progress={unlockedIds.has(ach.id) ? 100 : getProgress(ach)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {tiers.map((tier) => (
          <TabsContent key={tier} value={tier} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getAchievementsByTier(tier).map((ach) => (
                <AchievementCard
                  key={ach.id}
                  achievement={ach}
                  unlocked={unlockedIds.has(ach.id)}
                  progress={unlockedIds.has(ach.id) ? 100 : getProgress(ach)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function AchievementCard({
  achievement,
  unlocked,
  progress,
}: {
  achievement: typeof ACHIEVEMENTS[0];
  unlocked: boolean;
  progress: number;
}) {
  const Icon = ICONS[achievement.icon] || Trophy;
  const tier = TIER_LABELS[achievement.tier];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn(
        "h-full overflow-hidden relative",
        unlocked ? "border-brand/40" : "opacity-80"
      )}>
        <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", achievement.color)} />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
              unlocked ? achievement.color : "from-muted to-muted-foreground/30"
            )}>
              {unlocked ? (
                <Icon className="h-7 w-7 text-white" />
              ) : (
                <Lock className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <Badge variant="outline" className={cn("text-[10px]", unlocked && "border-brand/40 text-brand")}>
              {tier.label}
            </Badge>
          </div>

          <div>
            <h3 className={cn("font-bold", !unlocked && "text-muted-foreground")}>
              {achievement.title.ar}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {achievement.description.ar}
            </p>
          </div>

          {unlocked ? (
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-2 border-t border-border/50">
              <Sparkles className="h-3 w-3" />
              مفتوح! +{achievement.xpReward} XP
            </div>
          ) : (
            <div className="pt-2 border-t border-border/50 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">التقدم</span>
                <span className="font-medium lnum">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
              <div className="text-xs text-muted-foreground">
                المكافأة: +{achievement.xpReward} XP
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
