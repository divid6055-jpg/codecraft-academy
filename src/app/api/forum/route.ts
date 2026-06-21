import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ====================================================================
// GET /api/forum — List threads with optional filters
// ?category=X&sort=trending|latest|unanswered&q=X
// ====================================================================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "trending";
    const q = searchParams.get("q")?.toLowerCase().trim();

    // For now return mock data — in production, fetch from db
    const mockThreads = [
      {
        id: "t1",
        title: "كيف أحسن من أداء تطبيق React الخاص بي؟",
        author: { name: "محمد ع.", initials: "مع", color: "bg-emerald-500" },
        category: "React",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        replies: 12,
        views: 234,
        likes: 18,
        pinned: true,
        solved: true,
        tags: ["react", "performance", "hooks"],
      },
      {
        id: "t2",
        title: "ما الفرق بين let و const و var في JavaScript؟",
        author: { name: "سارة م.", initials: "سم", color: "bg-amber-500" },
        category: "JavaScript",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        replies: 8,
        views: 156,
        likes: 24,
        pinned: false,
        solved: true,
        tags: ["javascript", "basics"],
      },
      {
        id: "t3",
        title: "مشكلة في Flexbox على Safari — العناصر لا تتوزع بشكل صحيح",
        author: { name: "خالد ش.", initials: "خش", color: "bg-rose-500" },
        category: "HTML & CSS",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        replies: 5,
        views: 89,
        likes: 7,
        pinned: false,
        solved: false,
        tags: ["css", "flexbox", "safari"],
      },
      {
        id: "t4",
        title: "أفضل الموارد لتعلم بايثون في 2025",
        author: { name: "نورة س.", initials: "نس", color: "bg-violet-500" },
        category: "Python",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        replies: 23,
        views: 543,
        likes: 42,
        pinned: false,
        solved: false,
        tags: ["python", "resources", "learning"],
      },
    ];

    let filtered = mockThreads;
    if (category && category !== "all") {
      filtered = filtered.filter((t) => t.category === category);
    }
    if (q) {
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(q));
    }

    switch (sort) {
      case "latest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "unanswered":
        filtered.sort((a, b) => a.replies - b.replies);
        break;
      case "trending":
      default:
        filtered.sort((a, b) => b.views + b.likes * 2 - (a.views + a.likes * 2));
        break;
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      count: filtered.length,
    });
  } catch (error) {
    console.error("GET /api/forum error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch forum threads" },
      { status: 500 }
    );
  }
}

// ====================================================================
// POST /api/forum — Create a new thread
// Body: { title, body, categoryId, authorId, tags }
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, body: threadBody, categoryId, authorId, tags = [] } = body;

    if (!title || !threadBody || !authorId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const thread = await db.forumThread.create({
      data: {
        title,
        body: threadBody,
        authorId,
        categoryId: categoryId || "cat-1",
        tags: JSON.stringify(tags),
      },
    });

    return NextResponse.json({
      success: true,
      data: thread,
    });
  } catch (error) {
    console.error("POST /api/forum error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create thread" },
      { status: 500 }
    );
  }
}
