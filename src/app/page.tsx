"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TracksPreview } from "@/components/landing/tracks-preview";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { useNavigationStore } from "@/store/navigation-store";
import { useUserStore } from "@/store/user-store";
import { useProgressStore } from "@/store/progress-store";
import { useNotificationStore } from "@/store/notification-store";
import { useEffectOnce } from "@/hooks/use-effect-once";

export default function Home() {
  const view = useNavigationStore((s) => s.view);
  const navigate = useNavigationStore((s) => s.navigate);
  const { isAuthenticated, login, preferences, updatePreferences } = useUserStore();
  const { achievements, completeLesson } = useProgressStore();
  const pushNotification = useNotificationStore((s) => s.push);

  // Auto-login as guest on first visit so user can try features immediately
  useEffectOnce(() => {
    if (!isAuthenticated) {
      login("guest@codecraft.academy", "طالب برمجة");
      // Welcome notification
      setTimeout(() => {
        pushNotification({
          type: "info",
          title: "مرحباً بك في CodeCraft Academy!",
          body: "جاهز لبدء رحلتك في عالم البرمجة؟ استكشف المسارات أو جرّب المحرر التفاعلي.",
          icon: "Sparkles",
        });
      }, 1500);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TracksPreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
