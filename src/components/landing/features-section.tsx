"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Play,
  Trophy,
  Users,
  Zap,
  BookOpen,
  Target,
  ShieldCheck,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const FEATURES: Feature[] = [
  {
    icon: Code2,
    title: "محرر كود تفاعلي",
    description:
      "اكتب الكود مباشرة في المتصفح وشاهد النتائج فوراً مع معاينة حية لـ HTML و CSS و JavaScript دون أي إعداد.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    title: "محتوى شامل ومتدرج",
    description:
      "أكثر من 500 درس منظم في مسارات تعلم واضحة، تبدأ من الأساسيات المطلقة وتنتقل تدريجياً حتى المستوى الاحترافي.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Trophy,
    title: "نظام إنجازات تحفيزي",
    description:
      "اكسب نقاط خبرة (XP)، ارتقِ في المستويات، حافظ على سلسلة تعلم يومية، وافتح أكثر من 50 شارة وإنجاز.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Target,
    title: "اختبارات تقييمية",
    description:
      "اختبر فهمك بعد كل درس من خلال اختبارات تفاعلية متعددة الأنواع مع شرح مفصل للإجابات الصحيحة والخاطئة.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Users,
    title: "مجتمع متعاون",
    description:
      "انضم لمجتمع من 250 ألف مطور، اطرح أسئلتك في المنتدى، شارك مشاريعك، وتعلم من تجارب الآخرين.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: ShieldCheck,
    title: "شهادات معتمدة",
    description:
      "احصل على شهادة إتمام لكل دورة تكملها، أضفها لملفك على LinkedIn وعرّف recruiters بمهاراتك.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
  },
  {
    icon: Zap,
    title: "تمارين عملية مكثفة",
    description:
      "تعلم بالممارسة من خلال تمارين برمجية حقيقية مع حالات اختبار تلقائية تتحقق من صحة حلولك فوراً.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: GraduationCap,
    title: "مسارات مهنية واضحة",
    description:
      "اختر مساراً مهنياً محدداً (Frontend, Backend, Full-Stack, AI) واتبع خريطة طريق واضحة للوصول لهدفك.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 border-t border-border/60">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="outline" className="mb-3 rounded-full px-3 py-1 border-brand/40 bg-brand/5 text-brand">
            لماذا CodeCraft؟
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            كل ما تحتاجه لإتقان البرمجة في مكان واحد
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            منصة مصممة بعناية لتجعل رحلة تعلمك ممتعة وفعالة. نقدم أدوات حديثة،
            محتوى عميق، ومجتمع داعم يساعدك على التحول من مبتدئ إلى محترف.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.1 }}
            >
              <Card className="group h-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 space-y-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
