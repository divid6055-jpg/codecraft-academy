import type { AchievementDefinition } from "@/types";

// ====================================================================
// CodeCraft Academy — Achievements Catalog
// ====================================================================

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // ------------------------------------------------------------------
  // Bronze tier — onboarding milestones
  // ------------------------------------------------------------------
  {
    id: "ach-first-lesson",
    slug: "first-lesson",
    title: { ar: "الخطوة الأولى", en: "First Step" },
    description: {
      ar: "أكمل أول درس لك في المنصة",
      en: "Complete your first lesson",
    },
    icon: "Footprints",
    color: "from-amber-700 to-yellow-700",
    tier: "bronze",
    xpReward: 25,
    requirement: { type: "lessons-completed", value: 1 },
  },
  {
    id: "ach-first-quiz",
    slug: "first-quiz",
    title: { ar: "أول اختبار", en: "First Quiz" },
    description: {
      ar: "أكمل أول اختبار لك",
      en: "Complete your first quiz",
    },
    icon: "ClipboardCheck",
    color: "from-amber-700 to-yellow-700",
    tier: "bronze",
    xpReward: 25,
    requirement: { type: "quizzes-passed", value: 1 },
  },
  {
    id: "ach-first-exercise",
    slug: "first-exercise",
    title: { ar: "التمرين الأول", en: "First Exercise" },
    description: {
      ar: "حل أول تمرين برمجي",
      en: "Solve your first coding exercise",
    },
    icon: "Pencil",
    color: "from-amber-700 to-yellow-700",
    tier: "bronze",
    xpReward: 25,
    requirement: { type: "exercises-solved", value: 1 },
  },
  {
    id: "ach-daily-goal",
    slug: "daily-goal",
    title: { ar: "الهدف اليومي", en: "Daily Goal" },
    description: {
      ar: "حقق هدفك اليومي للمرة الأولى",
      en: "Achieve your daily goal for the first time",
    },
    icon: "Target",
    color: "from-amber-700 to-yellow-700",
    tier: "bronze",
    xpReward: 30,
    requirement: { type: "daily-goal", value: 1 },
  },

  // ------------------------------------------------------------------
  // Silver tier — momentum
  // ------------------------------------------------------------------
  {
    id: "ach-streak-3",
    slug: "streak-3-days",
    title: { ar: "ثلاثة أيام متتالية", en: "3-Day Streak" },
    description: {
      ar: "حافظ على سلسلة تعلم لمدة 3 أيام متتالية",
      en: "Maintain a 3-day learning streak",
    },
    icon: "Flame",
    color: "from-slate-400 to-gray-500",
    tier: "silver",
    xpReward: 50,
    requirement: { type: "streak-days", value: 3 },
  },
  {
    id: "ach-lessons-10",
    slug: "lessons-10",
    title: { ar: "عشر دروس", en: "Ten Lessons" },
    description: {
      ar: "أكمل 10 دروس",
      en: "Complete 10 lessons",
    },
    icon: "BookOpen",
    color: "from-slate-400 to-gray-500",
    tier: "silver",
    xpReward: 75,
    requirement: { type: "lessons-completed", value: 10 },
  },
  {
    id: "ach-exercises-10",
    slug: "exercises-10",
    title: { ar: "عشرة تمارين", en: "Ten Exercises" },
    description: {
      ar: "حل 10 تمارين برمجية",
      en: "Solve 10 coding exercises",
    },
    icon: "Code",
    color: "from-slate-400 to-gray-500",
    tier: "silver",
    xpReward: 75,
    requirement: { type: "exercises-solved", value: 10 },
  },

  // ------------------------------------------------------------------
  // Gold tier — significant commitment
  // ------------------------------------------------------------------
  {
    id: "ach-streak-7",
    slug: "streak-7-days",
    title: { ar: "أسبوع كامل", en: "Full Week" },
    description: {
      ar: "حافظ على سلسلة تعلم لمدة 7 أيام متتالية",
      en: "Maintain a 7-day learning streak",
    },
    icon: "CalendarCheck",
    color: "from-amber-400 to-yellow-500",
    tier: "gold",
    xpReward: 150,
    requirement: { type: "streak-days", value: 7 },
  },
  {
    id: "ach-lessons-50",
    slug: "lessons-50",
    title: { ar: "خمسون درساً", en: "Fifty Lessons" },
    description: {
      ar: "أكمل 50 درساً",
      en: "Complete 50 lessons",
    },
    icon: "Library",
    color: "from-amber-400 to-yellow-500",
    tier: "gold",
    xpReward: 200,
    requirement: { type: "lessons-completed", value: 50 },
  },
  {
    id: "ach-perfect-quiz",
    slug: "perfect-quiz",
    title: { ar: "علامة كاملة", en: "Perfect Score" },
    description: {
      ar: "احصل على علامة كاملة في اختبار (100%)",
      en: "Score 100% on a quiz",
    },
    icon: "Star",
    color: "from-amber-400 to-yellow-500",
    tier: "gold",
    xpReward: 100,
    requirement: { type: "perfect-quiz", value: 1 },
  },
  {
    id: "ach-course-complete",
    slug: "first-course-complete",
    title: { ar: "أول دورة مكتملة", en: "First Course Complete" },
    description: {
      ar: "أكمل دورتك الأولى بنسبة 100%",
      en: "Complete your first course 100%",
    },
    icon: "Trophy",
    color: "from-amber-400 to-yellow-500",
    tier: "gold",
    xpReward: 250,
    requirement: { type: "courses-completed", value: 1 },
  },

  // ------------------------------------------------------------------
  // Platinum tier — advanced dedication
  // ------------------------------------------------------------------
  {
    id: "ach-streak-30",
    slug: "streak-30-days",
    title: { ar: "شهر من الالتزام", en: "Month of Dedication" },
    description: {
      ar: "حافظ على سلسلة تعلم لمدة 30 يوماً متتالياً",
      en: "Maintain a 30-day learning streak",
    },
    icon: "Award",
    color: "from-cyan-300 to-teal-400",
    tier: "platinum",
    xpReward: 500,
    requirement: { type: "streak-days", value: 30 },
  },
  {
    id: "ach-lessons-100",
    slug: "lessons-100",
    title: { ar: "مئة درس", en: "Hundred Lessons" },
    description: {
      ar: "أكمل 100 درس",
      en: "Complete 100 lessons",
    },
    icon: "GraduationCap",
    color: "from-cyan-300 to-teal-400",
    tier: "platinum",
    xpReward: 600,
    requirement: { type: "lessons-completed", value: 100 },
  },
  {
    id: "ach-xp-5000",
    slug: "xp-5000",
    title: { ar: "خمسة آلاف نقطة", en: "5K XP" },
    description: {
      ar: "اجمع 5000 نقطة خبرة",
      en: "Earn 5,000 XP",
    },
    icon: "Zap",
    color: "from-cyan-300 to-teal-400",
    tier: "platinum",
    xpReward: 300,
    requirement: { type: "xp-earned", value: 5000 },
  },
  {
    id: "ach-track-complete",
    slug: "track-complete",
    title: { ar: "مسار مكتمل", en: "Track Complete" },
    description: {
      ar: "أكمل مسار تعلم كامل",
      en: "Complete an entire learning track",
    },
    icon: "Route",
    color: "from-cyan-300 to-teal-400",
    tier: "platinum",
    xpReward: 800,
    requirement: { type: "track-completed", value: 1 },
  },

  // ------------------------------------------------------------------
  // Diamond tier — elite
  // ------------------------------------------------------------------
  {
    id: "ach-streak-100",
    slug: "streak-100-days",
    title: { ar: "مئة يوم", en: "100 Days" },
    description: {
      ar: "حافظ على سلسلة تعلم لمدة 100 يوم متتالٍ",
      en: "Maintain a 100-day learning streak",
    },
    icon: "Crown",
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    tier: "diamond",
    xpReward: 2000,
    requirement: { type: "streak-days", value: 100 },
  },
  {
    id: "ach-lessons-500",
    slug: "lessons-500",
    title: { ar: "خمس مئة درس", en: "500 Lessons" },
    description: {
      ar: "أكمل 500 درس — إنجاز استثنائي",
      en: "Complete 500 lessons — exceptional achievement",
    },
    icon: "Sparkles",
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    tier: "diamond",
    xpReward: 3000,
    requirement: { type: "lessons-completed", value: 500 },
  },
  {
    id: "ach-xp-20000",
    slug: "xp-20000",
    title: { ar: "عشرون ألف نقطة", en: "20K XP" },
    description: {
      ar: "اجمع 20,000 نقطة خبرة — مستوى النخبة",
      en: "Earn 20,000 XP — elite level",
    },
    icon: "Gem",
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    tier: "diamond",
    xpReward: 1000,
    requirement: { type: "xp-earned", value: 20000 },
  },
  {
    id: "ach-courses-5",
    slug: "courses-5",
    title: { ar: "خمس دورات", en: "Five Courses" },
    description: {
      ar: "أكمل 5 دورات كاملة",
      en: "Complete 5 full courses",
    },
    icon: "Medal",
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    tier: "diamond",
    xpReward: 1500,
    requirement: { type: "courses-completed", value: 5 },
  },
];

export function getAchievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function getAchievementsByTier(tier: AchievementDefinition["tier"]): AchievementDefinition[] {
  return ACHIEVEMENTS.filter((a) => a.tier === tier);
}
