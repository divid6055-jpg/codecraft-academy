"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Award,
  Mail,
  Github,
  Twitter,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { INSTRUCTORS } from "@/data/instructors";
import { formatNumber, cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-blue-500",
  "from-rose-500 to-pink-500",
  "from-cyan-500 to-teal-500",
];

export function InstructorsView() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <Badge variant="outline" className="mb-3 border-brand/40 bg-brand/5 text-brand">
          فريق التدريس
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">تعلّم من نخبة الخبراء</h1>
        <p className="text-muted-foreground leading-relaxed">
          مدربون يعملون في أكبر الشركات التقنية، بخبرة عملية تجاوزت العقود. كل
          منهم متخصص في مجاله ومتفرغ لمساعدتك على النجاح.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {INSTRUCTORS.map((instructor, i) => (
          <motion.div
            key={instructor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full overflow-hidden group hover:shadow-xl transition-shadow">
              <div className={cn("h-24 bg-gradient-to-br", AVATAR_COLORS[i % AVATAR_COLORS.length])} />
              <CardContent className="p-6 pt-0">
                <div className={cn("-mt-12 mb-4")}>
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarFallback className={cn("bg-gradient-to-br text-white text-2xl font-bold", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                      {instructor.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="font-bold text-lg">{instructor.name}</h3>
                <p className="text-sm text-brand mb-3">{instructor.title.ar}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                  {instructor.bio.ar}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="lnum font-medium">{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span className="lnum">{formatNumber(instructor.studentsCount)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span className="lnum">{instructor.coursesCount} دورات</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-brand hover:text-brand-foreground transition-colors" aria-label="بريد">
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-brand hover:text-brand-foreground transition-colors" aria-label="github">
                    <Github className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-brand hover:text-brand-foreground transition-colors" aria-label="twitter">
                    <Twitter className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-brand hover:text-brand-foreground transition-colors" aria-label="website">
                    <Globe className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
