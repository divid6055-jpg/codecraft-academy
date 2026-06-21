"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "محمد العنزي",
    role: "مطور واجهات أمامية في شركة تقنية",
    avatar: "",
    rating: 5,
    text: "بدأت من الصفر تماماً دون أي خلفية برمجية، وخلال 6 أشهر من الالتزام بمسار Frontend في CodeCraft، حصلت على أول وظيفة لي كمطور. المحتوى متدرج بذكاء والمحرر التفاعلي ساعدني كثيراً في فهم المفاهيم.",
    initials: "مع",
    color: "bg-emerald-500",
  },
  {
    name: "نورة السبيعي",
    role: "طالبة علوم حاسب ومطورة Backend",
    avatar: "",
    rating: 5,
    text: "أفضل منصة عربية لتعلم البرمجة على الإطلاق. الشروحات واضحة والتمارين تتدرج بشكل ممتاز. نظام الإنجازات والـ XP يحفزني على الاستمرار يومياً، والمنتدى مليء بمطورين يساعدون بعضهم.",
    initials: "نس",
    color: "bg-amber-500",
  },
  {
    name: "عبدالله الحربي",
    role: "مهندس برمجيات في Google",
    avatar: "",
    rating: 5,
    text: "استخدمت CodeCraft للتحضير لمقابلات الشركات الكبرى، ومسار هياكل البيانات والخوارزميات كان الأفضل على الإطلاق. التمارين تحاكي أسئلة المقابلات الحقيقية والشرح يركز على الفهم لا الحفظ.",
    initials: "عح",
    color: "bg-rose-500",
  },
  {
    name: "ريم القحطاني",
    role: "خبيرة تعلم آلة ناشئة",
    avatar: "",
    rating: 5,
    text: "مسار الذكاء الاصطناعي مذهل! يبدأ من أساسيات بايثون وينتقل بسلاسة إلى تعلم الآلة والشبكات العصبية. المشاريع العملية رائعة وأضفتها لمعرض أعمالي الذي ساعدني في الحصول على تدريب صيفي مميز.",
    initials: "رق",
    color: "bg-violet-500",
  },
  {
    name: "فهد المطيري",
    role: "صاحب شركة ناشئة",
    avatar: "",
    rating: 5,
    text: "كنت أريد فهم الجانب التقني لمشروعي الناشئ، و CodeCraft أعطاني أساساً متيناً في Full-Stack. الآن أستطيع التحدث مع فريقي التقني بثقة وحتى تنفيذ بعض التعديلات بنفسي. استثمار رائع للوقت.",
    initials: "فم",
    color: "bg-sky-500",
  },
  {
    name: "أمل الزهراني",
    role: "مطورة موبايل مستقلة",
    avatar: "",
    rating: 5,
    text: "تعلمت React Native من خلال CodeCraft وأنجزت أول تطبيق لي خلال شهرين. الجودة عالية جداً والمدربون يشرحون بأسلوب مبسط دون التضحية بالعمق التقني. أنصح بها كل من يريد دخول عالم الموبايل.",
    initials: "أز",
    color: "bg-fuchsia-500",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 border-t border-border/60">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">قصص نجاح من مجتمعنا</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            طلابنا يحققون أهدافهم
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            أكثر من 250 ألف طالب اختاروا CodeCraft لبدء رحلتهم في عالم البرمجة.
            استمع لبعض قصص نجاحهم.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-muted-foreground/30" />
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/90">
                    {t.text}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarFallback className={`${t.color} text-white text-xs font-medium`}>
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
