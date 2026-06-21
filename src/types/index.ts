// ====================================================================
// CodeCraft Academy — Core Domain Types
// ====================================================================
// This file defines the central data model for the entire learning
// platform: tracks, courses, modules, lessons, exercises, quizzes and
// user progress. Every component and store relies on these contracts.
// ====================================================================

export type Locale = "ar" | "en";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type LessonType =
  | "reading"
  | "video"
  | "interactive"
  | "exercise"
  | "quiz"
  | "project"
  | "challenge";

export type ProgrammingLanguage =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "python"
  | "react"
  | "nodejs"
  | "sql"
  | "bash"
  | "json"
  | "markdown"
  | "text";

export interface LocalizedString {
  ar: string;
  en?: string;
}

// --------------------------------------------------------------------
// Learning Track — top-level category (e.g. "Frontend", "Backend")
// --------------------------------------------------------------------
export interface Track {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // lucide icon name
  color: string; // tailwind gradient classes
  accentColor: string; // hex/oklch for charts
  difficulty: DifficultyLevel;
  estimatedHours: number;
  coursesCount: number;
  studentsCount: number;
  rating: number;
  tags: string[];
  featured: boolean;
  order: number;
}

// --------------------------------------------------------------------
// Course — a structured learning path within a track
// --------------------------------------------------------------------
export interface Course {
  id: string;
  slug: string;
  trackId: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  prerequisites: string[]; // course ids
  icon: string;
  color: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  language: ProgrammingLanguage;
  instructor: Instructor;
  modules: Module[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: number; // 0 = free
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: LocalizedString;
  avatar: string;
  bio: LocalizedString;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

// --------------------------------------------------------------------
// Module — a group of lessons within a course
// --------------------------------------------------------------------
export interface Module {
  id: string;
  courseId: string;
  title: LocalizedString;
  description: LocalizedString;
  order: number;
  lessons: Lesson[];
  isLocked: boolean;
  estimatedMinutes: number;
}

// --------------------------------------------------------------------
// Lesson — atomic learning unit
// --------------------------------------------------------------------
export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  type: LessonType;
  order: number;
  estimatedMinutes: number;
  content: LessonContent;
  isFree: boolean;
  isLocked: boolean;
}

export interface LessonContent {
  // Markdown body (RTL aware)
  body: LocalizedString;
  // Code samples shown in monospace blocks
  codeSamples?: CodeSample[];
  // Interactive playground starter code
  starterCode?: string;
  solutionCode?: string;
  // For "exercise" / "challenge" lessons
  exercise?: Exercise;
  // For "quiz" lessons
  quiz?: Quiz;
  // Key takeaways
  keyTakeaways?: LocalizedString[];
  // External references
  references?: Reference[];
  // Tip / warning / info callouts
  callouts?: Callout[];
}

export interface CodeSample {
  id: string;
  language: ProgrammingLanguage;
  filename?: string;
  code: string;
  explanation?: LocalizedString;
  runnable?: boolean;
}

export interface Exercise {
  id: string;
  prompt: LocalizedString;
  instructions: LocalizedString[];
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hints: LocalizedString[];
  language: ProgrammingLanguage;
  points: number;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
  description?: LocalizedString;
}

export interface Quiz {
  id: string;
  passingScore: number; // percentage
  questions: QuizQuestion[];
}

export type QuizQuestionType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "order";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: LocalizedString;
  options?: LocalizedString[];
  correctAnswers: number[]; // indexes
  explanation: LocalizedString;
  points: number;
}

export interface Reference {
  title: LocalizedString;
  url: string;
  type: "doc" | "video" | "article" | "book";
}

export interface Callout {
  type: "tip" | "warning" | "info" | "danger" | "success";
  title?: LocalizedString;
  body: LocalizedString;
}

// --------------------------------------------------------------------
// User Progress & Gamification
// --------------------------------------------------------------------
export interface UserProgress {
  userId: string;
  enrolledCourses: EnrolledCourse[];
  completedLessons: string[]; // lesson ids
  completedExercises: string[];
  quizResults: QuizResult[];
  xp: number;
  level: number;
  streak: number;
  lastActivity: string;
  achievements: Achievement[];
  dailyGoal: number; // minutes
  weeklyStats: WeeklyStats[];
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  progress: number; // 0..100
  lastLessonId?: string;
  completedLessons: string[];
  totalLessons: number;
}

export interface QuizResult {
  quizId: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  takenAt: string;
  timeSpent: number; // seconds
}

export interface WeeklyStats {
  weekStart: string;
  lessonsCompleted: number;
  xpEarned: number;
  minutesSpent: number;
  exercisesSolved: number;
}

export interface Achievement {
  id: string;
  unlockedAt: string;
  progress: number; // 0..100
}

// --------------------------------------------------------------------
// Achievement definition (catalog of all possible achievements)
// --------------------------------------------------------------------
export interface AchievementDefinition {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  xpReward: number;
  requirement: {
    type:
      | "lessons-completed"
      | "courses-completed"
      | "exercises-solved"
      | "quizzes-passed"
      | "streak-days"
      | "xp-earned"
      | "perfect-quiz"
      | "fast-solve"
      | "daily-goal"
      | "track-completed";
    value: number;
  };
}

// --------------------------------------------------------------------
// Forum / Community
// --------------------------------------------------------------------
export interface ForumCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: string;
  threadsCount: number;
  postsCount: number;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  title: string;
  body: string;
  author: ForumUser;
  createdAt: string;
  updatedAt: string;
  replies: ForumPost[];
  views: number;
  likes: number;
  pinned: boolean;
  solved: boolean;
  tags: string[];
}

export interface ForumPost {
  id: string;
  threadId: string;
  body: string;
  author: ForumUser;
  createdAt: string;
  likes: number;
  isAnswer: boolean;
}

export interface ForumUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  role: "student" | "mentor" | "instructor" | "moderator" | "admin";
  reputation: number;
}

// --------------------------------------------------------------------
// Code Editor / Playground
// --------------------------------------------------------------------
export interface CodeFile {
  id: string;
  name: string;
  language: ProgrammingLanguage;
  content: string;
}

export interface PlaygroundProject {
  id: string;
  title: string;
  description: string;
  files: CodeFile[];
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------
// View Navigation (single-page app state)
// --------------------------------------------------------------------
export type AppView =
  | { name: "home" }
  | { name: "catalog" }
  | { name: "tracks" }
  | { name: "track-detail"; trackId: string }
  | { name: "course-detail"; courseId: string }
  | { name: "lesson"; courseId: string; lessonId: string }
  | { name: "playground" }
  | { name: "dashboard" }
  | { name: "achievements" }
  | { name: "forum" }
  | { name: "forum-thread"; threadId: string }
  | { name: "profile" }
  | { name: "instructors" }
  | { name: "pricing" }
  | { name: "about" }
  | { name: "settings" }
  | { name: "search"; query: string };

// --------------------------------------------------------------------
// Notifications
// --------------------------------------------------------------------
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "achievement" | "social";
  title: string;
  body: string;
  icon?: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}
