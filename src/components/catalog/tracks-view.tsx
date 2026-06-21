"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Code2,
  Binary,
  Layers,
  Smartphone,
  Cloud,
  BrainCircuit,
  Clock,
  Users,
  Star,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/tracks";
import { getCoursesByTrack } from "@/data/courses";
import { useNavigationStore } from "@/store/navigation-store";
import { formatNumber, formatDuration, getDifficultyLabel, getDifficultyColor, cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Layout,
  Server,
  Code2,
  Binary,
  Layers,
  Smartphone,
  Cloud,
  BrainCircuit,
};

export function TracksView() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center max-w-2xl mx-auto"
      >
        <Badge variant="outline" className="mb-3 border-brand/40 bg-brand/5 text-brand">
          مسارات التعلم
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">اختر مسارك المهني</h1>
        <p className="text-muted-foreground leading-relaxed">
          مسارات منظمة من قبل خبراء صناعة، مصممة لتأخذك من المبتدئ إلى المحترف
          خلال مدة محددة، مع مشاريع عملية تطبق فيها ما تعلمته.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {TRACKS.map((track, i) => {
          const Icon = ICONS[track.icon] || Code2;
          const courses = getCoursesByTrack(track.id);

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                onClick={() => navigate({ name: "track-detail", trackId: track.id })}
                className="group h-full cursor-pointer hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", track.color)} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", track.color)}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] border", getDifficultyColor(track.difficulty))}>
                      {getDifficultyLabel(track.difficulty)}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-1">{track.title.ar}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {track.description.ar}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {track.tags.slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] font-code">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5" />
                      <span className="lnum">{courses.length || track.coursesCount} دورات</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDuration(track.estimatedHours * 60)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {formatNumber(track.studentsCount)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="lnum">{track.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <Button variant="ghost" size="sm" className="text-brand group-hover:gap-2 transition-all">
                      استكشف المسار
                      <ArrowLeft className="h-4 w-4 mr-1 group-hover:mr-0 transition-all" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
