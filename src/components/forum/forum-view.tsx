"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Search,
  Eye,
  ThumbsUp,
  Reply,
  Pin,
  CheckCircle2,
  TrendingUp,
  Users,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/store/navigation-store";
import { cn, formatNumber, timeAgo } from "@/lib/utils";

// Mock forum data
const CATEGORIES = [
  { id: "cat-1", name: "أسئلة عامة", icon: "❓", color: "from-sky-500 to-cyan-500", threads: 234, posts: 1820 },
  { id: "cat-2", name: "HTML & CSS", icon: "🎨", color: "from-emerald-500 to-teal-500", threads: 412, posts: 3210 },
  { id: "cat-3", name: "JavaScript", icon: "⚡", color: "from-amber-500 to-orange-500", threads: 687, posts: 5240 },
  { id: "cat-4", name: "Python", icon: "🐍", color: "from-blue-500 to-indigo-500", threads: 524, posts: 4100 },
  { id: "cat-5", name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500", threads: 398, posts: 2980 },
  { id: "cat-6", name: "مشاريع الطلاب", icon: "🚀", color: "from-fuchsia-500 to-pink-500", threads: 156, posts: 920 },
];

const TRENDING_THREADS = [
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
  {
    id: "t5",
    title: "شاركت مشروعي الأول: تطبيق قائمة مهام بـ Next.js",
    author: { name: "عبدالله ح.", initials: "عح", color: "bg-sky-500" },
    category: "مشاريع الطلاب",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    replies: 31,
    views: 720,
    likes: 89,
    pinned: false,
    solved: false,
    tags: ["project", "nextjs", "showcase"],
  },
];

export function ForumView() {
  const navigate = useNavigationStore((s) => s.navigate);
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("trending");

  const filteredThreads = TRENDING_THREADS.filter((t) =>
    !search || t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-brand-foreground shadow-lg">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">مجتمع CodeCraft</h1>
            <p className="text-muted-foreground text-sm">اطرح أسئلتك، شارك مشاريعك، وتعلم من الآخرين</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-brand to-accent text-brand-foreground">
          <Plus className="h-4 w-4 ml-2" />
          موضوع جديد
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold lnum">2,411</div>
              <div className="text-xs text-muted-foreground">موضوع</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Reply className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold lnum">18,270</div>
              <div className="text-xs text-muted-foreground">رد</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold lnum">12,840</div>
              <div className="text-xs text-muted-foreground">عضو نشط</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold lnum">234</div>
              <div className="text-xs text-muted-foreground">موضوع نشط اليوم</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar: categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm">الأقسام</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-right"
                  >
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-lg shrink-0", cat.color)}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-1">{cat.name}</div>
                      <div className="text-xs text-muted-foreground lnum">
                        {cat.threads} موضوع • {cat.posts} رد
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main: threads */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في المواضيع..."
                className="pr-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="trending" className="gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  رائج
                </TabsTrigger>
                <TabsTrigger value="latest">الأحدث</TabsTrigger>
                <TabsTrigger value="unanswered">بدون رد</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Threads list */}
          <div className="space-y-3">
            {filteredThreads.map((thread, i) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  onClick={() => navigate({ name: "forum-thread", threadId: thread.id })}
                  className="hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className={cn("text-white text-xs", thread.author.color)}>
                          {thread.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.pinned && (
                            <Badge variant="secondary" className="text-[10px] gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400">
                              <Pin className="h-2.5 w-2.5" />
                              مثبت
                            </Badge>
                          )}
                          {thread.solved && (
                            <Badge variant="secondary" className="text-[10px] gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              تم الحل
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-[10px]">{thread.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-base mb-1 line-clamp-2 hover:text-brand transition-colors">
                          {thread.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span>{thread.author.name}</span>
                          <span>•</span>
                          <span>{timeAgo(thread.createdAt)}</span>
                          <span className="flex items-center gap-1">
                            <Reply className="h-3 w-3" />
                            <span className="lnum">{thread.replies}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span className="lnum">{thread.views}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span className="lnum">{thread.likes}</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {thread.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] font-code">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
