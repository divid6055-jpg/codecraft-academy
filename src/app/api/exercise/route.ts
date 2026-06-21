import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// POST /api/exercise — Submit exercise attempt
// Body: { userId, exerciseId, lessonId, courseId, solved, lastCode, testsPassed, totalTests }
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      exerciseId,
      lessonId,
      courseId,
      solved,
      lastCode,
      testsPassed,
      totalTests,
    } = body;

    if (!userId || !exerciseId || !lessonId || !courseId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find existing record
    const existing = await db.exerciseRecord.findUnique({
      where: {
        userId_exerciseId: { userId, exerciseId },
      },
    });

    let record;
    if (existing) {
      record = await db.exerciseRecord.update({
        where: { id: existing.id },
        data: {
          attempts: existing.attempts + 1,
          solved: solved || existing.solved,
          solvedAt: solved && !existing.solved ? new Date() : existing.solvedAt,
          lastCode: lastCode ?? existing.lastCode,
          testsPassed: testsPassed ?? existing.testsPassed,
          totalTests: totalTests ?? existing.totalTests,
        },
      });
    } else {
      record = await db.exerciseRecord.create({
        data: {
          userId,
          exerciseId,
          lessonId,
          courseId,
          attempts: 1,
          solved: solved || false,
          solvedAt: solved ? new Date() : null,
          lastCode: lastCode ?? "",
          testsPassed: testsPassed ?? 0,
          totalTests: totalTests ?? 0,
        },
      });
    }

    // Award XP if newly solved
    if (solved && (!existing || !existing.solved)) {
      const xpEarned = 50;
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
        data: { record, xpEarned },
      });
    }

    return NextResponse.json({
      success: true,
      data: { record, xpEarned: 0 },
    });
  } catch (error) {
    console.error("POST /api/exercise error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit exercise" },
      { status: 500 }
    );
  }
}
