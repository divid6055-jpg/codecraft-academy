"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Rocket, Star, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigationStore } from "@/store/navigation-store";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "مجاني",
    icon: Sparkles,
    color: "from-emerald-500 to-teal-500",
    price: 0,
    period: "للأبد",
    description: "مثالي للبدء وتجربة المنصة",
    features: [
      "وصول كامل لجميع الدروس المجانية",
      "محرر كود تفاعلي (5 ملفات)",
      "اختبارات تقييمية",
      "تتبع التقدم الأساسي",
      "مشاركة في المجتمع",
    ],
    notIncluded: [
      "دروس متقدمة",
      "مشاريع عملية",
      "شهادات معتمدة",
      "دعم فني مخصص",
    ],
    cta: "ابدأ الآن",
    popular: false,
  },
  {
    name: "احترافي",
    icon: Crown,
    color: "from-amber-500 via-orange-500 to-rose-500",
    price: 49,
    period: "شهرياً",
    description: "للمتعلمين الجادين الذين يريدون الوصول للقمة",
    features: [
      "كل ميزات الباقة المجانية",
      "وصول كامل لجميع الدروس المتقدمة",
      "محرر كود غير محدود",
      "جميع المشاريع العملية",
      "شهادات معتمدة لكل دورة",
      "تتبع تقدم متقدم مع تحليلات",
      "دعم فني خلال 24 ساعة",
      "إعلانات بدون إزعاج",
    ],
    notIncluded: [],
    cta: "اشترك الآن",
    popular: true,
  },
  {
    name: "فرق",
    icon: Rocket,
    color: "from-violet-500 to-fuchsia-500",
    price: 199,
    period: "شهرياً",
    description: "للفرق التقنية والشركات الناشئة",
    features: [
      "كل ميزات الباقة الاحترافية",
      "حتى 10 أعضاء في الفريق",
      "لوحة تحكم للمدير",
      "تقارير جماعية للأداء",
      "دورات حصرية للفرق",
      "دعم فني مخصص خلال 4 ساعات",
      "اجتماع شهري مع مدرب",
      "تخصيص المسارات حسب احتياجاتكم",
    ],
    notIncluded: [],
    cta: "تواصل مع المبيعات",
    popular: false,
  },
];

export function PricingView() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <Badge variant="outline" className="mb-3 border-brand/40 bg-brand/5 text-brand">
          <Star className="h-3 w-3 ml-1" />
          الباقات والأسعار
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          اختر الباقة المناسبة لك
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          ابدأ مجاناً وارتقِ متى احتجت. لا توجد عقود، ألغِ متى شئت.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(plan.popular && "lg:-mt-4")}
          >
            <Card className={cn(
              "h-full relative overflow-hidden",
              plan.popular && "border-2 border-brand shadow-xl"
            )}>
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-brand to-accent text-brand-foreground text-center py-1.5 text-xs font-bold">
                  الأكثر شعبية
                </div>
              )}
              <CardContent className={cn("p-6 space-y-5", plan.popular && "pt-10")}>
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", plan.color)}>
                    <plan.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div>
                  <span className="text-4xl font-bold lnum">
                    {plan.price === 0 ? "مجاني" : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground mr-1">ر.س / {plan.period}</span>
                  )}
                </div>

                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-gradient-to-r from-brand to-accent text-brand-foreground"
                      : ""
                  )}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate({ name: "catalog" })}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">المميزات</div>
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground line-through opacity-60">
                      <span className="text-xs">✕</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ teaser */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-xl font-bold mb-4">لماذا تختار CodeCraft؟</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <Zap className="mx-auto h-8 w-8 text-brand" />
            <div className="font-medium text-sm">تعلم بالوتيرة الخاصة بك</div>
            <p className="text-xs text-muted-foreground">لا مواعيد، لا ضغط</p>
          </div>
          <div className="space-y-1">
            <Users className="mx-auto h-8 w-8 text-brand" />
            <div className="font-medium text-sm">مجتمع داعم</div>
            <p className="text-xs text-muted-foreground">+250 ألف مطور</p>
          </div>
          <div className="space-y-1">
            <Star className="mx-auto h-8 w-8 text-brand" />
            <div className="font-medium text-sm">محتوى عالي الجودة</div>
            <p className="text-xs text-muted-foreground">تقييم 4.9/5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
