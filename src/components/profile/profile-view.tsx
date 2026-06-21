"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Calendar,
  Trophy,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Zap,
  Flame,
  Edit3,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user-store";
import { useProgressStore, xpToNextLevel } from "@/store/progress-store";
import { useNavigationStore } from "@/store/navigation-store";
import { COURSES, getLessonById } from "@/data/courses";
import { ACHIEVEMENTS } from "@/data/achievements";
import { cn, formatDate, formatNumber } from "@/lib/utils";

export function ProfileView() {
  const navigate = useNavigationStore((s) => s.navigate);
  const { profile, updateProfile } = useUserStore();
  const {
    xp,
    level,
    streak,
    enrolledCourses,
    completedLessons,
    bookmarkedLessons,
    exerciseRecords,
    quizResults,
    achievements,
    totalMinutesSpent,
  } = useProgressStore();

  const [editing, setEditing] = React.useState(false);
  const [form, setForm] = React.useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
    title: profile?.title || "",
    location: profile?.location || "",
    website: profile?.website || "",
    github: profile?.github || "",
    twitter: profile?.twitter || "",
    linkedin: profile?.linkedin || "",
  });

  React.useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        bio: profile.bio,
        title: profile.title,
        location: profile.location,
        website: profile.website,
        github: profile.github,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const { current, needed, remaining } = xpToNextLevel(xp, level);
  const levelProgress = (current / needed) * 100;

  const bookmarkedLessonObjects = bookmarkedLessons
    .map((id) => getLessonById(id))
    .filter(Boolean)
    .slice(0, 5);

  const unlockedAchievements = achievements
    .map((a) => ({ ...a, def: ACHIEVEMENTS.find((ad) => ad.id === a.id) }))
    .filter((a) => a.def)
    .slice(0, 6);

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>الرجاء تسجيل الدخول</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-6">
      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-brand via-brand to-accent" />
          <CardContent className="p-6 pt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground text-2xl font-bold">
                    {profile.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-2">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-sm text-muted-foreground">{profile.title || "طالب برمجة"}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      انضم {formatDate(profile.joinedAt)}
                    </span>
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant={editing ? "default" : "outline"}
                onClick={() => (editing ? handleSave() : setEditing(true))}
                className="bg-gradient-to-r from-brand to-accent text-brand-foreground"
              >
                {editing ? (
                  <>
                    <Save className="h-4 w-4 ml-1" />
                    حفظ التغييرات
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 ml-1" />
                    تعديل الملف
                  </>
                )}
              </Button>
            </div>

            {editing ? (
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">المسمى الوظيفي</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="مثال: مطور واجهات أمامية"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="مثال: الرياض، السعودية"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">الموقع الشخصي</Label>
                  <Input
                    id="website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="bio">نبذة عنك</Label>
                  <Textarea
                    id="bio"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    placeholder="username"
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{profile.bio}</p>

                <div className="flex flex-wrap gap-3 mt-4 text-xs">
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-brand">
                      <Globe className="h-3 w-3" />
                      {profile.website}
                    </a>
                  )}
                  {profile.github && (
                    <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-brand">
                      <Github className="h-3 w-3" />
                      {profile.github}
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-brand">
                      <Twitter className="h-3 w-3" />
                      {profile.twitter}
                    </a>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="mx-auto h-6 w-6 text-amber-500 mb-1" />
            <div className="text-2xl font-bold lnum">{xp}</div>
            <div className="text-xs text-muted-foreground">XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="mx-auto h-6 w-6 text-violet-500 mb-1" />
            <div className="text-2xl font-bold lnum">{level}</div>
            <div className="text-xs text-muted-foreground">المستوى</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="mx-auto h-6 w-6 text-orange-500 mb-1" />
            <div className="text-2xl font-bold lnum">{streak}</div>
            <div className="text-xs text-muted-foreground">سلسلة أيام</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-500 mb-1" />
            <div className="text-2xl font-bold lnum">{completedLessons.length}</div>
            <div className="text-xs text-muted-foreground">درس مكتمل</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="mx-auto h-6 w-6 text-sky-500 mb-1" />
            <div className="text-2xl font-bold lnum">{enrolledCourses.length}</div>
            <div className="text-xs text-muted-foreground">دورة مسجلة</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Level progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">تقدم المستوى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">المستوى {level}</span>
              <span className="text-muted-foreground">المستوى {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              تحتاج <span className="font-medium text-brand lnum">{remaining} XP</span> للمستوى التالي
            </p>
          </CardContent>
        </Card>

        {/* Recent achievements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>أحدث الإنجازات</span>
              <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => navigate({ name: "achievements" })}>
                عرض الكل
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unlockedAchievements.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                لا توجد إنجازات بعد
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {unlockedAchievements.map((a) => (
                  <div key={a.id} className="text-center">
                    <div className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-1", a.def?.color)}>
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[10px] line-clamp-1">{a.def?.title.ar}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bookmarked lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-brand fill-current" />
            الدروس المحفوظة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookmarkedLessonObjects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              لا توجد دروس محفوظة بعد. احفظ الدروس المهمة للرجوع إليها لاحقاً.
            </p>
          ) : (
            <div className="space-y-2">
              {bookmarkedLessonObjects.map((lesson) => {
                if (!lesson) return null;
                const course = COURSES.find((c) => c.id === lesson.courseId);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate({ name: "lesson", courseId: lesson.courseId, lessonId: lesson.id })}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-right"
                  >
                    <Bookmark className="h-4 w-4 text-brand fill-current shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-1">{lesson.title.ar}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{course?.title.ar}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
