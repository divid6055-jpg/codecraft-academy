import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// POST /api/quiz — Submit quiz result
// Body: { userId, quizId, lessonId, courseId, score, totalQuestions, correctAnswers, timeSpentSecs }
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      quizId,
      lessonId,
      courseId,
      score,
      totalQuestions,
      correctAnswers,
      timeSpentSecs,
    } = body;

    if (!userId || !quizId || !lessonId || !courseId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const passed = score >= 70;

    // Upsert quiz result
    const result = await db.quizResult.upsert({
      where: {
        userId_quizId_lessonId: { userId, quizId, lessonId },
      },
      update: {
        score,
        totalQuestions,
        correctAnswers,
        timeSpentSecs,
        passed,
        takenAt: new Date(),
      },
      create: {
        userId,
        quizId,
        lessonId,
        courseId,
        score,
        totalQuestions,
        correctAnswers,
        timeSpentSecs,
        passed,
      },
    });

    // Award XP if passed
    if (passed) {
      const xpEarned = Math.floor(score / 10) * 5;
      const user = await db.user.findUnique({ where: { id: userId } });
      if (user) {
        const newXp = user.xp + xpEarned;
        const newLevel = Math.floor(Math.sqrt(newXp / 25)) + 1;
        await db.user.update({
          where: { id: userId },
          data: { xp: newXp, level: newLevel },
        });
      }
      return NextResponse.json({
        success: true,
        data: { result, passed: true, xpEarned },
      });
    }

    return NextResponse.json({
      success: true,
      data: { result, passed: false, xpEarned: 0 },
    });
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
