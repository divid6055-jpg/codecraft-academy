"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Code2,
  PlayCircle,
  CheckCircle2,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COURSES, getCourseProgressStats } from "@/data/courses";
import { TRACKS } from "@/data/tracks";
import { useNavigationStore } from "@/store/navigation-store";
import { useProgressStore } from "@/store/progress-store";
import { formatNumber, formatDuration, getDifficultyLabel, getDifficultyColor, cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Code2,
};

export function CatalogView() {
  const navigate = useNavigationStore((s) => s.navigate);
  const { isEnrolled, getCourseProgress } = useProgressStore();
  const [search, setSearch] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<string>("all");
  const [trackFilter, setTrackFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("popular");

  const filteredCourses = React.useMemo(() => {
    let result = COURSES.filter((c) => c.isPublished);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.title.ar.toLowerCase().includes(q) ||
          c.description.ar.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (difficulty !== "all") {
      result = result.filter((c) => c.difficulty === difficulty);
    }

    if (trackFilter !== "all") {
      result = result.filter((c) => c.trackId === trackFilter);
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "duration-asc":
        result.sort((a, b) => a.estimatedHours - b.estimatedHours);
        break;
    }

    return result;
  }, [search, difficulty, trackFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">كتالوج الدورات</h1>
        <p className="text-muted-foreground">
          استكشف {COURSES.length}+ دورة تفاعلية في مختلف مجالات البرمجة
        </p>
      </motion.div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن دورة..."
              className="pr-10"
            />
          </div>
          <Select value={trackFilter} onValueChange={setTrackFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="المسار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المسارات</SelectItem>
              {TRACKS.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title.ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="المستوى" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المستويات</SelectItem>
              <SelectItem value="beginner">مبتدئ</SelectItem>
              <SelectItem value="intermediate">متوسط</SelectItem>
              <SelectItem value="advanced">متقدم</SelectItem>
              <SelectItem value="expert">خبير</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="ترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">الأكثر شعبية</SelectItem>
              <SelectItem value="rating">الأعلى تقييماً</SelectItem>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="duration-asc">الأقصر مدة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>{filteredCourses.length} نتيجة</span>
        </div>
      </div>

      {/* Courses grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="font-medium text-lg mb-1">لا توجد نتائج</h3>
          <p className="text-sm text-muted-foreground">
            جرّب تعديل الفلاتر أو البحث بكلمات أخرى
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, i) => {
            const stats = getCourseProgressStats(course.id);
            const enrolled = isEnrolled(course.id);
            const progress = getCourseProgress(course.id, stats.totalLessons);
            const track = TRACKS.find((t) => t.id === course.trackId);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  onClick={() => navigate({ name: "course-detail", courseId: course.id })}
                  className="group h-full cursor-pointer hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                >
                  {/* Header gradient */}
                  <div className={cn("h-32 bg-gradient-to-br relative", course.color)}>
                    <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur">
                        {getDifficultyLabel(course.difficulty)}
                      </Badge>
                      {course.price === 0 && (
                        <Badge variant="secondary" className="bg-emerald-500/30 text-white border-0 backdrop-blur">
                          مجاني
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <Badge variant="secondary" className="bg-black/30 text-white border-0 backdrop-blur text-[10px]">
                        {track?.title.ar}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title.ar}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.subtitle.ar}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-code">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-3.5 w-3.5" />
                        {stats.totalLessons} درس
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(course.estimatedHours * 60)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="lnum">{course.rating}</span>
                      </div>
                    </div>

                    {enrolled && progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">تقدمك</span>
                          <span className="font-medium text-brand lnum">{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand to-accent transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-brand-foreground text-xs font-medium">
                          {course.instructor.name.slice(0, 2)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {course.instructor.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {formatNumber(course.studentsCount)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
