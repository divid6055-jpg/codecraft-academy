"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigationStore } from "@/store/navigation-store";
import { useUserStore } from "@/store/user-store";

const BENEFITS = [
  "وصول كامل لجميع المسارات والدورات",
  "محرر كود تفاعلي غير محدود",
  "شهادات إتمام معتمدة لكل دورة",
  "مشاركة في مجتمع المطورين",
  "دعم فني على مدار الساعة",
  "تحديثات مستمرة للمحتوى",
];

export function CTASection() {
  const navigate = useNavigationStore((s) => s.navigate);
  const { isAuthenticated } = useUserStore();

  return (
    <section className="py-16 lg:py-24 border-t border-border/60">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="relative overflow-hidden border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-accent opacity-95" />
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <CardContent className="relative p-8 lg:p-16 text-center text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">ابدأ رحلتك اليوم</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
                مستقبلك في البرمجة يبدأ من هنا
              </h2>
              <p className="text-white/85 text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                انضم لأكثر من 250 ألف طالب اختاروا CodeCraft لتعلم البرمجة بطريقة
                تفاعلية وعملية. المسؤولون ждетونك. ابدأ مجاناً الآن دون أي التزام.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Button
                  size="lg"
                  onClick={() => navigate({ name: isAuthenticated ? "dashboard" : "catalog" })}
                  className="bg-white text-brand hover:bg-white/90 text-base h-12 px-8"
                >
                  {isAuthenticated ? "تابع رحلتك" : "ابدأ مجاناً الآن"}
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ name: "tracks" })}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white text-base h-12 px-8"
                >
                  استكشف المسارات
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto text-start">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 text-sm text-white/90"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                    <span>{b}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
