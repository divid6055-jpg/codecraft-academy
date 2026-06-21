import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// GET /api/stats — Platform statistics
// ====================================================================
export async function GET() {
  try {
    const { COURSES } = await import("@/data/courses");
    const { TRACKS } = await import("@/data/tracks");
    const { INSTRUCTORS } = await import("@/data/instructors");
    const { ACHIEVEMENTS } = await import("@/data/achievements");

    const totalLessons = COURSES.reduce(
      (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
      0
    );

    const totalExercises = COURSES.reduce(
      (sum, c) =>
        sum +
        c.modules.reduce(
          (s, m) => s + m.lessons.filter((l) => l.type === "exercise").length,
          0
        ),
      0
    );

    const totalStudents = COURSES.reduce((sum, c) => sum + c.studentsCount, 0);

    return NextResponse.json({
      success: true,
      data: {
        courses: COURSES.length,
        tracks: TRACKS.length,
        instructors: INSTRUCTORS.length,
        achievements: ACHIEVEMENTS.length,
        lessons: totalLessons,
        exercises: totalExercises,
        students: totalStudents,
        avgRating: (
          COURSES.reduce((s, c) => s + c.rating, 0) / COURSES.length
        ).toFixed(2),
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
