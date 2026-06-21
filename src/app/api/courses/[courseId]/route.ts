import { NextRequest, NextResponse } from "next/server";

// ====================================================================
// GET /api/courses/[courseId] — Get course by ID with full content
// ====================================================================
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const { getCourseById } = await import("@/data/courses");
    const course = getCourseById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("GET /api/courses/[courseId] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
