import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// POST /api/achievements — Unlock achievement for user
// Body: { userId, achievementId }
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, achievementId } = body;

    if (!userId || !achievementId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if already unlocked
    const existing = await db.userAchievement.findUnique({
      where: {
        userId_achievementId: { userId, achievementId },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        data: { alreadyUnlocked: true, achievement: existing },
      });
    }

    // Unlock
    const achievement = await db.userAchievement.create({
      data: { userId, achievementId },
    });

    // Award bonus XP
    const { ACHIEVEMENTS } = await import("@/data/achievements");
    const def = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (def) {
      const user = await db.user.findUnique({ where: { id: userId } });
      if (user) {
        const newXp = user.xp + def.xpReward;
        const newLevel = Math.floor(Math.sqrt(newXp / 25)) + 1;
        await db.user.update({
          where: { id: userId },
          data: { xp: newXp, level: newLevel },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: { achievement, xpReward: def?.xpReward || 0 },
    });
  } catch (error) {
    console.error("POST /api/achievements error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unlock achievement" },
      { status: 500 }
    );
  }
}

// ====================================================================
// GET /api/achievements?userId=X — Get user achievements
// ====================================================================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId required" },
        { status: 400 }
      );
    }

    const achievements = await db.userAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}
