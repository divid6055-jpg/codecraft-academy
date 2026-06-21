"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Star, BookOpen, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTrackById } from "@/data/tracks";
import { getCoursesByTrack } from "@/data/courses";
import { useNavigationStore } from "@/store/navigation-store";
import { formatNumber, formatDuration, getDifficultyLabel, getDifficultyColor, cn } from "@/lib/utils";

export function TrackDetailView({ trackId }: { trackId: string }) {
  const navigate = useNavigationStore((s) => s.navigate);
  const track = getTrackById(trackId);

  if (!track) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">المسار غير موجود</h2>
        <Button onClick={() => navigate({ name: "tracks" })}>العودة للمسارات</Button>
      </div>
    );
  }

  const courses = getCoursesByTrack(trackId);

  return (
    <div>
      {/* Hero */}
      <div className={cn("relative overflow-hidden bg-gradient-to-br", track.color)}>
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative mx-auto px-4 lg:px-6 py-12 lg:py-16 text-white">
          <button
            onClick={() => navigate({ name: "tracks" })}
            className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للمسارات
          </button>

          <Badge variant="secondary" className={cn("mb-3", getDifficultyColor(track.difficulty))}>
            {getDifficultyLabel(track.difficulty)}
          </Badge>

          <h1 className="text-3xl lg:text-5xl font-bold mb-3">{track.title.ar}</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mb-6 leading-relaxed">
            {track.description.ar}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span className="lnum">{courses.length || track.coursesCount} دورات</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatDuration(track.estimatedHours * 60)}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span className="lnum">{formatNumber(track.studentsCount)} طالب</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="lnum">{track.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {track.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur font-code">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Courses list */}
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <h2 className="text-2xl font-bold mb-6">دورات هذا المسار</h2>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Code2 className="mx-auto h-12 w-12 mb-3 opacity-40" />
              <p>دورات هذا المسار قيد التطوير. ترقبوا!</p>
              <Button
                variant="outline"
                onClick={() => navigate({ name: "catalog" })}
                className="mt-4"
              >
                استكشف الدورات المتاحة
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  onClick={() => navigate({ name: "course-detail", courseId: course.id })}
                  className="group h-full cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow", course.color)}>
                        <Code2 className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className={cn("text-[10px]", getDifficultyColor(course.difficulty))}>
                        {getDifficultyLabel(course.difficulty)}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">{course.title.ar}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.subtitle.ar}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span className="lnum">
                          {course.modules.reduce((s, m) => s + m.lessons.length, 0)} درس
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(course.estimatedHours * 60)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="lnum">{course.rating}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
