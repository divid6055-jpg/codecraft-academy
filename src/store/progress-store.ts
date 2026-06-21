"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --------------------------------------------------------------------
// Progress Store — user learning progress and XP / gamification state
// --------------------------------------------------------------------
interface EnrolledCourseState {
  courseId: string;
  enrolledAt: string;
  completedLessons: string[];
  lastLessonId?: string;
  lastVisitedAt: string;
}

interface QuizResultRecord {
  quizId: string;
  lessonId: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  takenAt: string;
  timeSpent: number;
}

interface ExerciseRecord {
  exerciseId: string;
  lessonId: string;
  courseId: string;
  attempts: number;
  solved: boolean;
  solvedAt?: string;
  lastCode: string;
  testsPassed: number;
  totalTests: number;
}

interface StreakDay {
  date: string; // YYYY-MM-DD
  xpEarned: number;
  lessonsCompleted: number;
  minutesSpent: number;
}

interface UnlockedAchievement {
  id: string;
  slug: string;
  unlockedAt: string;
}

interface ProgressState {
  xp: number;
  level: number;
  streak: number;
  lastActivityDate: string;
  enrolledCourses: EnrolledCourseState[];
  completedLessons: string[];
  bookmarkedLessons: string[];
  exerciseRecords: ExerciseRecord[];
  quizResults: QuizResultRecord[];
  streakHistory: StreakDay[];
  achievements: UnlockedAchievement[];
  totalMinutesSpent: number;
  dailyGoalMinutes: number;
  todayMinutesSpent: number;

  // Actions
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, xp: number) => void;
  bookmarkLesson: (lessonId: string) => void;
  unbookmarkLesson: (lessonId: string) => void;
  recordExercise: (record: Partial<ExerciseRecord> & { exerciseId: string; lessonId: string; courseId: string }) => void;
  recordQuiz: (result: Omit<QuizResultRecord, "takenAt">) => void;
  addXp: (amount: number) => void;
  unlockAchievement: (achievement: UnlockedAchievement) => void;
  recordActivity: (minutes: number, xp: number, lessonsCount?: number) => void;
  setDailyGoal: (minutes: number) => void;
  getCourseProgress: (courseId: string, totalLessons: number) => number;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonBookmarked: (lessonId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
  resetProgress: () => void;
}

const xpForLevel = (level: number) => 100 + level * 50;
const levelForXp = (xp: number) => {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return level;
};

const todayStr = () => new Date().toISOString().split("T")[0];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      lastActivityDate: "",
      enrolledCourses: [],
      completedLessons: [],
      bookmarkedLessons: [],
      exerciseRecords: [],
      quizResults: [],
      streakHistory: [],
      achievements: [],
      totalMinutesSpent: 0,
      dailyGoalMinutes: 30,
      todayMinutesSpent: 0,

      enrollCourse: (courseId) => {
        const state = get();
        if (state.enrolledCourses.some((c) => c.courseId === courseId)) return;
        set({
          enrolledCourses: [
            ...state.enrolledCourses,
            {
              courseId,
              enrolledAt: new Date().toISOString(),
              completedLessons: [],
              lastVisitedAt: new Date().toISOString(),
            },
          ],
        });
      },

      unenrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourses: state.enrolledCourses.filter((c) => c.courseId !== courseId),
        })),

      completeLesson: (courseId, lessonId, xp) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const enrolled = state.enrolledCourses.map((c) =>
          c.courseId === courseId
            ? {
                ...c,
                completedLessons: [...c.completedLessons, lessonId],
                lastLessonId: lessonId,
                lastVisitedAt: new Date().toISOString(),
              }
            : c
        );

        const newEnrolled =
          enrolled.some((c) => c.courseId === courseId)
            ? enrolled
            : [
                ...enrolled,
                {
                  courseId,
                  enrolledAt: new Date().toISOString(),
                  completedLessons: [lessonId],
                  lastLessonId: lessonId,
                  lastVisitedAt: new Date().toISOString(),
                },
              ];

        const newTotalXp = state.xp + xp;
        const today = todayStr();
        const todayEntry = state.streakHistory.find((s) => s.date === today);
        const newStreakHistory = todayEntry
          ? state.streakHistory.map((s) =>
              s.date === today
                ? {
                    ...s,
                    xpEarned: s.xpEarned + xp,
                    lessonsCompleted: s.lessonsCompleted + 1,
                  }
                : s
            )
          : [
              ...state.streakHistory,
              { date: today, xpEarned: xp, lessonsCompleted: 1, minutesSpent: 0 },
            ];

        set({
          completedLessons: [...state.completedLessons, lessonId],
          enrolledCourses: newEnrolled,
          xp: newTotalXp,
          level: levelForXp(newTotalXp),
          streakHistory: newStreakHistory,
          lastActivityDate: today,
        });
      },

      bookmarkLesson: (lessonId) =>
        set((state) =>
          state.bookmarkedLessons.includes(lessonId)
            ? state
            : { bookmarkedLessons: [...state.bookmarkedLessons, lessonId] }
        ),

      unbookmarkLesson: (lessonId) =>
        set((state) => ({
          bookmarkedLessons: state.bookmarkedLessons.filter((id) => id !== lessonId),
        })),

      recordExercise: (record) =>
        set((state) => {
          const existing = state.exerciseRecords.find(
            (e) => e.exerciseId === record.exerciseId
          );
          if (existing) {
            return {
              exerciseRecords: state.exerciseRecords.map((e) =>
                e.exerciseId === record.exerciseId
                  ? {
                      ...e,
                      ...record,
                      attempts: e.attempts + 1,
                      solved: record.solved ?? e.solved,
                      solvedAt: record.solved ? new Date().toISOString() : e.solvedAt,
                      lastCode: record.lastCode ?? e.lastCode,
                      testsPassed: record.testsPassed ?? e.testsPassed,
                      totalTests: record.totalTests ?? e.totalTests,
                    }
                  : e
              ),
            };
          }
          return {
            exerciseRecords: [
              ...state.exerciseRecords,
              {
                exerciseId: record.exerciseId,
                lessonId: record.lessonId,
                courseId: record.courseId,
                attempts: 1,
                solved: record.solved ?? false,
                solvedAt: record.solved ? new Date().toISOString() : undefined,
                lastCode: record.lastCode ?? "",
                testsPassed: record.testsPassed ?? 0,
                totalTests: record.totalTests ?? 0,
              },
            ],
          };
        }),

      recordQuiz: (result) =>
        set((state) => {
          const newResults = [
            ...state.quizResults.filter((r) => r.quizId !== result.quizId || r.lessonId !== result.lessonId),
            { ...result, takenAt: new Date().toISOString() },
          ];
          const passed = result.score >= 70;
          const newTotalXp = state.xp + (passed ? Math.floor(result.score / 10) * 5 : 0);
          return {
            quizResults: newResults,
            xp: newTotalXp,
            level: levelForXp(newTotalXp),
          };
        }),

      addXp: (amount) =>
        set((state) => {
          const newTotal = Math.max(0, state.xp + amount);
          return { xp: newTotal, level: levelForXp(newTotal) };
        }),

      unlockAchievement: (achievement) =>
        set((state) =>
          state.achievements.some((a) => a.id === achievement.id)
            ? state
            : {
                achievements: [...state.achievements, achievement],
                xp: state.xp + 50, // bonus xp
                level: levelForXp(state.xp + 50),
              }
        ),

      recordActivity: (minutes, xp, lessonsCount = 0) => {
        const state = get();
        const today = todayStr();
        const todayEntry = state.streakHistory.find((s) => s.date === today);
        const newStreakHistory = todayEntry
          ? state.streakHistory.map((s) =>
              s.date === today
                ? {
                    ...s,
                    minutesSpent: s.minutesSpent + minutes,
                    xpEarned: s.xpEarned + xp,
                    lessonsCompleted: s.lessonsCompleted + lessonsCount,
                  }
                : s
            )
          : [
              ...state.streakHistory,
              {
                date: today,
                minutesSpent: minutes,
                xpEarned: xp,
                lessonsCompleted: lessonsCount,
              },
            ];

        // Update streak
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];
        let newStreak = state.streak;
        if (state.lastActivityDate !== today) {
          if (state.lastActivityDate === yesterday) {
            newStreak = state.streak + 1;
          } else if (state.lastActivityDate !== today) {
            newStreak = 1;
          }
        }

        const newTotalXp = state.xp + xp;
        set({
          streakHistory: newStreakHistory,
          lastActivityDate: today,
          streak: newStreak,
          totalMinutesSpent: state.totalMinutesSpent + minutes,
          todayMinutesSpent: state.todayMinutesSpent + minutes,
          xp: newTotalXp,
          level: levelForXp(newTotalXp),
        });
      },

      setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),

      getCourseProgress: (courseId, totalLessons) => {
        const state = get();
        const enrolled = state.enrolledCourses.find((c) => c.courseId === courseId);
        if (!enrolled || totalLessons === 0) return 0;
        return Math.round((enrolled.completedLessons.length / totalLessons) * 100);
      },

      isLessonCompleted: (lessonId) => get().completedLessons.includes(lessonId),
      isLessonBookmarked: (lessonId) => get().bookmarkedLessons.includes(lessonId),
      isEnrolled: (courseId) =>
        get().enrolledCourses.some((c) => c.courseId === courseId),

      resetProgress: () =>
        set({
          xp: 0,
          level: 1,
          streak: 0,
          lastActivityDate: "",
          enrolledCourses: [],
          completedLessons: [],
          bookmarkedLessons: [],
          exerciseRecords: [],
          quizResults: [],
          streakHistory: [],
          achievements: [],
          totalMinutesSpent: 0,
          todayMinutesSpent: 0,
        }),
    }),
    {
      name: "codecraft-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper: get all streak history (last N days)
export function getLastNDaysStreak(days: number) {
  const history = useProgressStore.getState().streakHistory;
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000)
      .toISOString()
      .split("T")[0];
    const entry = history.find((s) => s.date === date);
    result.push({
      date,
      xp: entry?.xpEarned ?? 0,
      lessons: entry?.lessonsCompleted ?? 0,
      minutes: entry?.minutesSpent ?? 0,
    });
  }
  return result;
}

export { xpForLevel, levelForXp };

// Helper: XP progress within current level
export function xpToNextLevel(xp: number, level: number): {
  current: number;
  needed: number;
  remaining: number;
} {
  let remaining = xp;
  for (let l = 1; l < level; l++) {
    remaining -= xpForLevel(l);
  }
  const needed = xpForLevel(level);
  return {
    current: Math.max(0, remaining),
    needed,
    remaining: Math.max(0, needed - remaining),
  };
}

// Helper: percentage progress within current level
export function xpProgressInLevel(xp: number, level: number): number {
  const { current, needed } = xpToNextLevel(xp, level);
  return needed === 0 ? 0 : Math.min(100, (current / needed) * 100);
}
