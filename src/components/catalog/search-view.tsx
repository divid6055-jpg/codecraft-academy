"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Code2, Users, Star, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COURSES, getCourseProgressStats } from "@/data/courses";
import { TRACKS } from "@/data/tracks";
import { INSTRUCTORS } from "@/data/instructors";
import { useNavigationStore } from "@/store/navigation-store";
import { cn, formatNumber, formatDuration, getDifficultyLabel } from "@/lib/utils";

export function SearchView({ query: initialQuery }: { query: string }) {
  const navigate = useNavigationStore((s) => s.navigate);
  const [query, setQuery] = React.useState(initialQuery);

  React.useEffect(() => setQuery(initialQuery), [initialQuery]);

  const q = query.toLowerCase().trim();

  const courseResults = q
    ? COURSES.filter(
        (c) =>
          c.title.ar.toLowerCase().includes(q) ||
          c.description.ar.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const trackResults = q
    ? TRACKS.filter(
        (t) =>
          t.title.ar.toLowerCase().includes(q) ||
          t.description.ar.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : [];

  const instructorResults = q
    ? INSTRUCTORS.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.title.ar.toLowerCase().includes(q) ||
          i.bio.ar.toLowerCase().includes(q)
      )
    : [];

  const totalResults = courseResults.length + trackResults.length + instructorResults.length;

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-8">
      {/* Search bar */}
      <div className="space-y-4">
        <div className="relative max-w-2xl">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن دورات، مسارات، أو مدربين..."
            className="pr-12 h-12 text-base"
            autoFocus
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {q ? `${totalResults} نتيجة لـ "${query}"` : "ابدأ الكتابة للبحث..."}
        </p>
      </div>

      {!q && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <Search className="mx-auto h-16 w-16 mb-4 opacity-30" />
            <p className="text-lg font-medium">ابحث في كل محتوى CodeCraft</p>
            <p className="text-sm mt-1">دورات، مسارات تعلم، مدربون، ودروس</p>
          </CardContent>
        </Card>
      )}

      {/* Course results */}
      {courseResults.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand" />
            دورات ({courseResults.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courseResults.map((course) => {
              const stats = getCourseProgressStats(course.id);
              return (
                <Card
                  key={course.id}
                  onClick={() => navigate({ name: "course-detail", courseId: course.id })}
                  className="cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className={cn("h-20 rounded-lg bg-gradient-to-br mb-3", course.color)} />
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{course.title.ar}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{course.subtitle.ar}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="lnum">{stats.totalLessons} دروس</span>
                      <span className="lnum">{formatDuration(course.estimatedHours * 60)}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Track results */}
      {trackResults.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-brand" />
            مسارات ({trackResults.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trackResults.map((track) => (
              <Card
                key={track.id}
                onClick={() => navigate({ name: "track-detail", trackId: track.id })}
                className="cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardContent className="p-4">
                  <div className={cn("h-16 rounded-lg bg-gradient-to-br mb-3", track.color)} />
                  <h3 className="font-semibold text-sm mb-1">{track.title.ar}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{track.description.ar}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Instructor results */}
      {instructorResults.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-brand" />
            مدربون ({instructorResults.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {instructorResults.map((inst) => (
              <Card
                key={inst.id}
                onClick={() => navigate({ name: "instructors" })}
                className="cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-brand-foreground text-sm font-medium">
                    {inst.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{inst.name}</h3>
                    <p className="text-xs text-muted-foreground">{inst.title.ar}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {q && totalResults === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="mx-auto h-16 w-16 mb-4 text-muted-foreground/40" />
            <p className="text-lg font-medium mb-1">لا توجد نتائج</p>
            <p className="text-sm text-muted-foreground mb-4">
              جرّب كلمات أخرى أو تصفح الدورات مباشرة
            </p>
            <Button onClick={() => navigate({ name: "catalog" })} variant="outline">
              تصفح الكتالوج
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
