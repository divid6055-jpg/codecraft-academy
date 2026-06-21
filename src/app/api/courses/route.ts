import { NextRequest, NextResponse } from "next/server";

// ====================================================================
// GET /api/courses — List all published courses
// ====================================================================
export async function GET() {
  try {
    const { COURSES } = await import("@/data/courses");
    const published = COURSES.filter((c) => c.isPublished).map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      description: c.description,
      icon: c.icon,
      color: c.color,
      difficulty: c.difficulty,
      estimatedHours: c.estimatedHours,
      language: c.language,
      instructor: {
        id: c.instructor.id,
        name: c.instructor.name,
        title: c.instructor.title,
      },
      rating: c.rating,
      reviewsCount: c.reviewsCount,
      studentsCount: c.studentsCount,
      price: c.price,
      tags: c.tags,
      modulesCount: c.modules.length,
      lessonsCount: c.modules.reduce((s, m) => s + m.lessons.length, 0),
    }));

    return NextResponse.json({
      success: true,
      data: published,
      count: published.length,
    });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
