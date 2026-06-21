import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppProviders } from "@/components/providers/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeCraft Academy — تعلم البرمجة من الصفر إلى الاحتراف",
  description:
    "منصة تعليمية تفاعلية لتعلم البرمجة من الصفر إلى الاحتراف. مسارات شاملة في HTML, CSS, JavaScript, Python, React مع محرر كود تفاعلي، اختبارات، وشهادات معتمدة.",
  keywords: [
    "تعلم البرمجة",
    "CodeCraft",
    "أكاديمية البرمجة",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "React",
    "تطوير الويب",
    "دروس برمجة",
    "محرر كود تفاعلي",
  ],
  authors: [{ name: "CodeCraft Academy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CodeCraft Academy — تعلم البرمجة من الصفر إلى الاحتراف",
    description:
      "منصة تفاعلية لتعلم البرمجة بمسارات شاملة ومحرر كود مباشر واختبارات تقييمية.",
    siteName: "CodeCraft Academy",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCraft Academy",
    description: "تعلم البرمجة تفاعلياً من الصفر إلى الاحتراف",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${tajawal.variable} font-cairo antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>{children}</AppProviders>
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
