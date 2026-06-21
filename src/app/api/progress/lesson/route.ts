import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// POST /api/progress/lesson — Mark a lesson as complete
// Body: { userId, courseId, lessonId, xpEarned }
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId, lessonId, xpEarned = 30 } = body;

    if (!userId || !courseId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create enrollment
    let enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (!enrollment) {
      enrollment = await db.enrollment.create({
        data: { userId, courseId, lastLessonId: lessonId },
      });
    }

    // Check if lesson already completed
    const existing = await db.lessonCompletion.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        data: { alreadyCompleted: true, completion: existing },
      });
    }

    // Create completion record
    const completion = await db.lessonCompletion.create({
      data: {
        userId,
        enrollmentId: enrollment.id,
        lessonId,
        courseId,
        xpEarned,
      },
    });

    // Update enrollment last activity
    await db.enrollment.update({
      where: { id: enrollment.id },
      data: { lastLessonId: lessonId, lastVisitedAt: new Date() },
    });

    // Update user XP and streak
    const user = await db.user.findUnique({ where: { id: userId } });
    if (user) {
      const today = new Date().toISOString().split("T")[0];
      const lastActivity = user.lastActivity?.toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      let newStreak = user.streak;
      if (lastActivity !== today) {
        if (lastActivity === yesterday) {
          newStreak = user.streak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newXp = user.xp + xpEarned;
      const newLevel = Math.floor(Math.sqrt(newXp / 25)) + 1;

      await db.user.update({
        where: { id: userId },
        data: {
          xp: newXp,
          level: newLevel,
          streak: newStreak,
          lastActivity: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: { completion, xpEarned },
    });
  } catch (error) {
    console.error("POST /api/progress/lesson error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to mark lesson complete" },
      { status: 500 }
    );
  }
}

// ====================================================================
// GET /api/progress/lesson?userId=X&courseId=Y — Get user progress for course
// ====================================================================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId required" },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (courseId) where.courseId = courseId;

    const completions = await db.lessonCompletion.findMany({ where });
    const enrollments = await db.enrollment.findMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      data: {
        completions: completions.map((c) => ({
          lessonId: c.lessonId,
          courseId: c.courseId,
          completedAt: c.completedAt,
          xpEarned: c.xpEarned,
        })),
        enrollments: enrollments.map((e) => ({
          courseId: e.courseId,
          enrolledAt: e.enrolledAt,
          lastLessonId: e.lastLessonId,
          lastVisitedAt: e.lastVisitedAt,
          completedAt: e.completedAt,
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/progress/lesson error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
