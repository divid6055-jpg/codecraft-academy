"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Play,
  Code2,
  Trophy,
  Users,
  Zap,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigationStore } from "@/store/navigation-store";
import { useProgressStore } from "@/store/progress-store";
import { useUserStore } from "@/store/user-store";

const STATS = [
  { icon: Users, value: "+250K", label: "طالب وطالبة", color: "text-emerald-500" },
  { icon: Code2, value: "+500", label: "درس تفاعلي", color: "text-amber-500" },
  { icon: Trophy, value: "+50", label: "إنجاز وشارة", color: "text-rose-500" },
  { icon: Star, value: "4.9", label: "تقييم الطلاب", color: "text-violet-500" },
];

const CODE_LINES = [
  { text: "function startYourJourney() {", color: "text-violet-400" },
  { text: "  const skills = ['HTML', 'CSS', 'JS'];", color: "text-emerald-400" },
  { text: "  const goal = 'احترف البرمجة';", color: "text-amber-400" },
  { text: "  ", color: "" },
  { text: "  skills.forEach(learn => {", color: "text-sky-400" },
  { text: "    practice(learn);", color: "text-pink-400" },
  { text: "    build(projects);", color: "text-fuchsia-400" },
  { text: "  });", color: "text-sky-400" },
  { text: "  ", color: "" },
  { text: "  return 🚀 success;", color: "text-emerald-400" },
  { text: "}", color: "text-violet-400" },
];

export function HeroSection() {
  const navigate = useNavigationStore((s) => s.navigate);
  const { isAuthenticated } = useUserStore();
  const { xp } = useProgressStore();

  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="container relative mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Right side (RTL): copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-right"
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border-brand/40 bg-brand/5 text-brand"
            >
              <Sparkles className="h-3 w-3" />
              منصة تعليمية رقم 1 في العالم العربي
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
              تعلم البرمجة
              <br />
              <span className="text-gradient-brand">من الصفر إلى الاحتراف</span>
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              منصة تفاعلية متكاملة تقدم مسارات تعلم منظمة في تطوير الويب، بايثون،
              هياكل البيانات، الذكاء الاصطناعي، والمزيد. مع محرر كود مباشر، اختبارات
              تقييمية، ومجتمع داعم.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => navigate({ name: isAuthenticated ? "dashboard" : "catalog" })}
                className="bg-gradient-to-r from-brand to-accent text-brand-foreground hover:opacity-90 text-base h-12 px-8"
              >
                <Play className="h-5 w-5 ml-2" />
                {isAuthenticated ? "تابع التعلم" : "ابدأ مجاناً الآن"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ name: "tracks" })}
                className="text-base h-12 px-8"
              >
                استكشف المسارات
                <ArrowLeft className="h-5 w-5 mr-2" />
              </Button>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                مجاني بالكامل
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                بدون بطاقة ائتمان
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                شهادة معتمدة
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 pt-4 max-w-xl mx-auto lg:mx-0">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center lg:text-right"
                >
                  <stat.icon className={`h-5 w-5 mx-auto lg:mr-0 mb-1 ${stat.color}`} />
                  <div className="text-xl lg:text-2xl font-bold lnum">{stat.value}</div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left side (RTL): code preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-accent/20 rounded-2xl blur-2xl" />
            <Card className="relative glass overflow-hidden">
              <CardContent className="p-0">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/40">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-muted-foreground font-code">
                    welcome.js
                  </span>
                  <Badge variant="secondary" className="text-[10px] gap-1">
                    <Zap className="h-3 w-3" />
                    تفاعلي
                  </Badge>
                </div>

                {/* Code */}
                <div className="p-5 font-code text-sm leading-relaxed text-right" dir="ltr">
                  {CODE_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex"
                    >
                      <span className="text-muted-foreground/40 select-none w-8 shrink-0 text-left">
                        {i + 1}
                      </span>
                      <span className={line.color || "text-foreground"}>{line.text || " "}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Output */}
                <div className="px-5 py-3 border-t border-border/50 bg-emerald-950/20">
                  <div className="flex items-center gap-2 text-xs text-emerald-500 font-code" dir="ltr">
                    <span className="text-emerald-400">›</span>
                    <span>Output: 🚀 Welcome to CodeCraft!</span>
                    <span className="ml-auto inline-block w-2 h-4 bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 hidden sm:block"
            >
              <div className="rounded-xl bg-card border border-border shadow-lg p-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-medium">إنجاز جديد!</div>
                  <div className="text-[10px] text-muted-foreground">+25 XP</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 hidden sm:block"
            >
              <div className="rounded-xl bg-card border border-border shadow-lg p-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Code2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-medium">درس مكتمل</div>
                  <div className="text-[10px] text-muted-foreground">HTML Basics</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
