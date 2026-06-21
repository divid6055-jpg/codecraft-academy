"use client";

import { Code2, Github, Twitter, Linkedin, Youtube, Mail, Heart } from "lucide-react";
import { useNavigationStore } from "@/store/navigation-store";

const FOOTER_LINKS = {
  platform: {
    title: "المنصة",
    links: [
      { label: "الدورات", view: "catalog" as const },
      { label: "المسارات", view: "tracks" as const },
      { label: "المحرر التفاعلي", view: "playground" as const },
      { label: "المدربون", view: "instructors" as const },
    ],
  },
  community: {
    title: "المجتمع",
    links: [
      { label: "المنتدى", view: "forum" as const },
      { label: "لوحة الإنجازات", view: "achievements" as const },
      { label: "عن المنصة", view: "about" as const },
      { label: "الأسعار", view: "pricing" as const },
    ],
  },
  account: {
    title: "حسابي",
    links: [
      { label: "لوحة التحكم", view: "dashboard" as const },
      { label: "ملفي الشخصي", view: "profile" as const },
      { label: "الإعدادات", view: "settings" as const },
    ],
  },
};

export function Footer() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => navigate({ name: "home" })} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent">
                <Code2 className="h-5 w-5 text-brand-foreground" />
              </div>
              <div className="text-start">
                <div className="font-bold text-base">CodeCraft Academy</div>
                <div className="text-[10px] text-muted-foreground">أكاديمية البرمجة التفاعلية</div>
              </div>
            </button>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              منصة تعليمية تفاعلية متكاملة لتعلم البرمجة من الصفر إلى الاحتراف. مسارات
              منظمة، محرر كود مباشر، اختبارات تقييمية، ومجتمع داعم من المدربين
              والمتعلمين.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([key, section]) => (
            <div key={key} className="space-y-3">
              <h4 className="font-semibold text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate({ name: link.view })}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} CodeCraft Academy. صُنع بـ</span>
            <Heart className="h-3 w-3 fill-destructive text-destructive" />
            <span>في المملكة العربية السعودية</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-primary transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-primary transition-colors">اتصل بنا</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
