import { NextRequest, NextResponse } from "next/server";

// ====================================================================
// GET /api/search?q=X — Search courses, tracks, instructors
// ====================================================================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase().trim() || "";

    if (!q) {
      return NextResponse.json({
        success: true,
        data: { courses: [], tracks: [], instructors: [] },
      });
    }

    const { COURSES } = await import("@/data/courses");
    const { TRACKS } = await import("@/data/tracks");
    const { INSTRUCTORS } = await import("@/data/instructors");

    const courses = COURSES.filter(
      (c) =>
        c.title.ar.toLowerCase().includes(q) ||
        c.title.en?.toLowerCase().includes(q) ||
        c.description.ar.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    ).map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: c.subtitle,
      color: c.color,
      icon: c.icon,
      type: "course",
    }));

    const tracks = TRACKS.filter(
      (t) =>
        t.title.ar.toLowerCase().includes(q) ||
        t.title.en?.toLowerCase().includes(q) ||
        t.description.ar.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    ).map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      color: t.color,
      icon: t.icon,
      type: "track",
    }));

    const instructors = INSTRUCTORS.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.title.ar.toLowerCase().includes(q) ||
        i.bio.ar.toLowerCase().includes(q)
    ).map((i) => ({
      id: i.id,
      name: i.name,
      title: i.title,
      type: "instructor",
    }));

    return NextResponse.json({
      success: true,
      data: { courses, tracks, instructors },
      total: courses.length + tracks.length + instructors.length,
    });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search" },
      { status: 500 }
    );
  }
}
