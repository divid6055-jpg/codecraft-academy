"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TracksPreview } from "@/components/landing/tracks-preview";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { CatalogView } from "@/components/catalog/catalog-view";
import { TracksView } from "@/components/catalog/tracks-view";
import { TrackDetailView } from "@/components/catalog/track-detail-view";
import { CourseDetailView } from "@/components/course/course-detail-view";
import { LessonView } from "@/components/course/lesson-view";
import { PlaygroundView } from "@/components/editor/playground-view";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { AchievementsView } from "@/components/achievements/achievements-view";
import { ForumView } from "@/components/forum/forum-view";
import { CommunityView } from "@/components/community/community-view";
import { InstructorsView } from "@/components/profile/instructors-view";
import { AboutView } from "@/components/profile/about-view";
import { PricingView } from "@/components/profile/pricing-view";
import { ProfileView } from "@/components/profile/profile-view";
import { SettingsView } from "@/components/profile/settings-view";
import { SearchView } from "@/components/catalog/search-view";
import { useNavigationStore } from "@/store/navigation-store";
import { useUserStore } from "@/store/user-store";
import { useNotificationStore } from "@/store/notification-store";
import { useEffectOnce } from "@/hooks/use-effect-once";

export default function Home() {
  const view = useNavigationStore((s) => s.view);
  const navigate = useNavigationStore((s) => s.navigate);
  const { isAuthenticated, login } = useUserStore();
  const pushNotification = useNotificationStore((s) => s.push);

  // Auto-login as guest on first visit
  useEffectOnce(() => {
    if (!isAuthenticated) {
      login("guest@codecraft.academy", "طالب برمجة");
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

  // Hide footer on certain views (lesson, playground) for more screen real estate
  const hideFooter = view.name === "lesson" || view.name === "playground";

  const renderView = () => {
    switch (view.name) {
      case "home":
        return (
          <>
            <HeroSection />
            <FeaturesSection />
            <TracksPreview />
            <TestimonialsSection />
            <CTASection />
          </>
        );
      case "catalog":
        return <CatalogView />;
      case "tracks":
        return <TracksView />;
      case "track-detail":
        return <TrackDetailView trackId={view.trackId} />;
      case "course-detail":
        return <CourseDetailView courseId={view.courseId} />;
      case "lesson":
        return <LessonView courseId={view.courseId} lessonId={view.lessonId} />;
      case "playground":
        return <PlaygroundView />;
      case "dashboard":
        return <DashboardView />;
      case "achievements":
        return <AchievementsView />;
      case "forum":
        return <ForumView />;
      case "forum-thread":
        return <CommunityView />; // Show community view with chat + forum
      case "community":
        return <CommunityView />;
      case "instructors":
        return <InstructorsView />;
      case "about":
        return <AboutView />;
      case "pricing":
        return <PricingView />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      case "search":
        return <SearchView query={view.query} />;
      default:
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h2>
            <button
              onClick={() => navigate({ name: "home" })}
              className="text-brand hover:underline"
            >
              العودة للرئيسية
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{renderView()}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
