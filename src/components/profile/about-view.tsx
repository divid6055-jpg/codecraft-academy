"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Rocket,
  Target,
  Users,
  Award,
  Heart,
  Code2,
  BookOpen,
  Trophy,
  Zap,
  Shield,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigationStore } from "@/store/navigation-store";

const VALUES = [
  {
    icon: Target,
    title: "التعلم بالممارسة",
    description: "نؤمن أن أفضل طريقة لتعلم البرمجة هي كتابتها. لذلك كل دروسنا تحتوي على تمارين عملية ومحرر كود تفاعلي مباشر في المتصفح.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "المجتمع أولاً",
    description: "التعلم ليس رحلة فردية. مجتمعنا من 250 ألف مطور موجود لمساعدتك في كل خطوة، من السؤال البسيط حتى مراجعة المشاريع.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "محتوى عصري ومحدّث",
    description: "عالم البرمجة يتغير بسرعة، ونحن نواكب. محتوانا يُحدّث باستمرار ليعكس أحدث التقنيات وأفضل الممارسات في الصناعة.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Shield,
    title: "جودة لا تساوم",
    description: "كل درس يمر بمراجعة دقيقة من خبراء. لا ننشر محتوى إلا بعد التأكد من دقته العلمية ووضوحه التربوي وسهولة تطبيقه.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const MILESTONES = [
  { year: "2023", title: "انطلاق CodeCraft", desc: "بدأنا بفكرة بسيطة: تعليم البرمجة بالعربية بطريقة تفاعلية." },
  { year: "2024", title: "10,000 طالب", desc: "وصلنا لأول عشرة آلاف طالب في أول 6 أشهر." },
  { year: "2024", title: "إطلاق المسارات", desc: "أطلقنا نظام المسارات المهنية المنظمة." },
  { year: "2025", title: "100,000 طالب", desc: "تجاوزنا حاجز المئة ألف طالب نشط." },
  { year: "2025", title: "إطلاق المحرر التفاعلي", desc: "أضفنا محرر كود مباشر في المتصفح مع معاينة حية." },
];

export function AboutView() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <Badge variant="outline" className="mb-3 border-brand/40 bg-brand/5 text-brand">
          <Sparkles className="h-3 w-3 ml-1" />
          قصتنا
        </Badge>
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          نمكّن كل عربي من احتراف البرمجة
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          CodeCraft Academy بدأت كحلم بسيط: أن تكون هناك منصة عربية واحدة
          متكاملة لتعلم البرمجة، تجمع بين جودة المحتوى، التفاعلية، والمجتمع الداعم.
          اليوم، نساعد أكثر من 250 ألف طالب على تحقيق أحلامهم التقنية.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, value: "+250K", label: "طالب نشط", color: "text-emerald-500" },
          { icon: BookOpen, value: "+500", label: "درس تفاعلي", color: "text-amber-500" },
          { icon: Code2, value: "+1000", label: "تمرين برمجي", color: "text-violet-500" },
          { icon: Trophy, value: "+50", label: "إنجاز وشارة", color: "text-rose-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <stat.icon className={`mx-auto h-8 w-8 mb-2 ${stat.color}`} />
                <div className="text-2xl lg:text-3xl font-bold lnum">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">قيمنا</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          المبادئ التي توجّه كل قرار نتخذه في CodeCraft
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.bg} ${value.color}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">رحلتنا</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pr-12"
                >
                  <div className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand border-2 border-background">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-foreground" />
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="lnum">{m.year}</Badge>
                        <h4 className="font-semibold text-sm">{m.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Card className="relative overflow-hidden border-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-accent opacity-95" />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <CardContent className="relative p-8 lg:p-12 text-center text-white">
          <Rocket className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">انضم لرحلتنا اليوم</h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            سواء كنت مبتدئاً تماماً أو مطوراً تريد تطوير مهاراتك، CodeCraft هو مكانك.
            ابدأ مجاناً الآن دون أي التزام.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ name: "catalog" })}
              className="bg-white text-brand hover:bg-white/90"
            >
              <Heart className="h-5 w-5 ml-2" />
              ابدأ التعلم الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ name: "tracks" })}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              استكشف المسارات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
