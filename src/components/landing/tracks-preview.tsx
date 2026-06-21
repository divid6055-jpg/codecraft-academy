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
  ArrowLeft,
  Clock,
  Users,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/tracks";
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

export function TracksPreview() {
  const navigate = useNavigationStore((s) => s.navigate);
  const featuredTracks = TRACKS.filter((t) => t.featured).slice(0, 6);

  return (
    <section className="py-16 lg:py-24 border-t border-border/60 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3 rounded-full px-3 py-1 border-brand/40 bg-brand/5 text-brand">
              مسارات التعلم
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
              اختر مسارك المهني
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              مسارات منظمة مصممة من قبل خبراء صناعة لضمان انتقالك من المبتدئ إلى
              المحترف خلال مدة محددة، مع مشاريع عملية تطبق فيها ما تعلمته.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate({ name: "tracks" })} className="shrink-0">
            عرض كل المسارات
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTracks.map((track, i) => {
            const Icon = ICONS[track.icon] || Code2;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <Card
                  onClick={() => navigate({ name: "track-detail", trackId: track.id })}
                  className="group h-full cursor-pointer hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                >
                  <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", track.color)} />
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
                      <h3 className="font-bold text-lg mb-1">{track.title.ar}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {track.description.ar}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {track.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] font-code">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
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
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
