import type { Course } from "@/types";
import { ADVANCED_CSS_COURSE } from "./advanced-css-course";
import { AI_COURSE } from "./ai-course";
import { DEVOPS_COURSE } from "./devops-course";
import { DSA_COURSE } from "./dsa-course";
import { HTML_CSS_COURSE } from "./html-css-course";
import { JAVASCRIPT_COURSE } from "./javascript-course";
import { NODEJS_COURSE } from "./nodejs-course";
import { PYTHON_ADVANCED_COURSE } from "./python-advanced-course";
import { PYTHON_COURSE } from "./python-course";
import { REACT_COURSE } from "./react-course";
import { SQL_COURSE } from "./sql-course";
import { TYPESCRIPT_COURSE } from "./typescript-course";

// ====================================================================
// CodeCraft Academy — Courses Catalog
// ====================================================================
// Central index of all courses. Add new courses here as you create them.
// ====================================================================

export const COURSES: Course[] = [
  HTML_CSS_COURSE,
  ADVANCED_CSS_COURSE,
  JAVASCRIPT_COURSE,
  PYTHON_COURSE,
  PYTHON_ADVANCED_COURSE,
  REACT_COURSE,
  SQL_COURSE,
  DSA_COURSE,
  NODEJS_COURSE,
  TYPESCRIPT_COURSE,
  DEVOPS_COURSE,
  AI_COURSE,
  // Future courses will be added here:
  // ...
];

// --------------------------------------------------------------------
// Helper functions
// --------------------------------------------------------------------
export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCoursesByTrack(trackId: string): Course[] {
  return COURSES.filter((c) => c.trackId === trackId);
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.isPublished).slice(0, 6);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase().trim();
  if (!q) return COURSES;
  return COURSES.filter(
    (c) =>
      c.title.ar.toLowerCase().includes(q) ||
      c.title.en?.toLowerCase().includes(q) ||
      c.description.ar.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getAllLessons() {
  return COURSES.flatMap((c) => c.modules.flatMap((m) => m.lessons));
}

export function getLessonById(lessonId: string) {
  return getAllLessons().find((l) => l.id === lessonId);
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  return getAllLessons().find(
    (l) => l.courseId === course.id && l.slug === lessonSlug
  );
}

export function getCourseProgressStats(courseId: string) {
  const course = getCourseById(courseId);
  if (!course) return { totalLessons: 0, totalMinutes: 0, totalExercises: 0, totalQuizzes: 0 };
  const lessons = course.modules.flatMap((m) => m.lessons);
  return {
    totalLessons: lessons.length,
    totalMinutes: lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
    totalExercises: lessons.filter((l) => l.type === "exercise").length,
    totalQuizzes: lessons.filter((l) => l.type === "quiz").length,
  };
}

export function getRelatedCourses(courseId: string, limit: number = 3): Course[] {
  const course = getCourseById(courseId);
  if (!course) return [];
  return COURSES.filter(
    (c) => c.id !== courseId && c.trackId === course.trackId
  ).slice(0, limit);
}

export function getNextLesson(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  if (idx === -1 || idx === allLessons.length - 1) return undefined;
  return allLessons[idx + 1];
}

export function getPreviousLesson(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return undefined;
  return allLessons[idx - 1];
}
