"use client";

import * as React from "react";
import {
  Settings,
  Bell,
  Palette,
  Code2,
  Globe,
  Moon,
  Sun,
  Volume2,
  Save,
  RotateCcw,
  Trash2,
  Download,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useUserStore } from "@/store/user-store";
import { useProgressStore } from "@/store/progress-store";
import { useToast } from "@/hooks/use-toast";
import { useNavigationStore } from "@/store/navigation-store";
import { downloadAsFile } from "@/lib/utils";

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreferences, profile } = useUserStore();
  const { resetProgress, xp, level, completedLessons } = useProgressStore();
  const { toast } = useToast();
  const navigate = useNavigationStore((s) => s.navigate);

  const handleResetProgress = () => {
    if (confirm("هل أنت متأكد؟ سيتم حذف كل تقدمك ولا يمكن التراجع.")) {
      resetProgress();
      toast({
        title: "تم إعادة تعيين التقدم",
        description: "تم حذف كل تقدمك بنجاح.",
      });
    }
  };

  const handleExport = () => {
    const data = {
      profile,
      preferences,
      progress: {
        xp,
        level,
        completedLessons,
      },
      exportedAt: new Date().toISOString(),
    };
    downloadAsFile("codecraft-data.json", JSON.stringify(data, null, 2), "application/json");
    toast({ title: "تم التصدير", description: "تم تصدير بياناتك بنجاح." });
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7 text-brand" />
          الإعدادات
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          خصّص تجربتك في CodeCraft حسب احتياجاتك
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-5 w-5 text-violet-500" />
              المظهر
            </CardTitle>
            <CardDescription>اختر ثيم الواجهة المفضل لديك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>الثيم</Label>
                <p className="text-xs text-muted-foreground mt-1">الوضع الداكن أو الفاتح</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4 ml-1" />
                  فاتح
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4 ml-1" />
                  داكن
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-5 w-5 text-sky-500" />
              اللغة
            </CardTitle>
            <CardDescription>لغة الواجهة والمحتوى</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>لغة الواجهة</Label>
                <p className="text-xs text-muted-foreground mt-1">اللغة الحالية: العربية</p>
              </div>
              <Select
                value={preferences.language}
                onValueChange={(v) => updatePreferences({ language: v as "ar" | "en" })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Editor preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code2 className="h-5 w-5 text-emerald-500" />
              محرر الكود
            </CardTitle>
            <CardDescription>خصائص محرر الأكواد التفاعلي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>إظهار أرقام الأسطر</Label>
                <p className="text-xs text-muted-foreground mt-1">عرض أرقام الأسطر في المحرر</p>
              </div>
              <Switch
                checked={preferences.showLineNumbers}
                onCheckedChange={(v) => updatePreferences({ showLineNumbers: v })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>الحفظ التلقائي</Label>
                <p className="text-xs text-muted-foreground mt-1">حفظ التغييرات تلقائياً</p>
              </div>
              <Switch
                checked={preferences.codeAutoSave}
                onCheckedChange={(v) => updatePreferences({ codeAutoSave: v })}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>حجم الخط</Label>
                <span className="text-sm text-muted-foreground lnum">{preferences.fontSize}px</span>
              </div>
              <Slider
                value={[preferences.fontSize]}
                onValueChange={([v]) => updatePreferences({ fontSize: v })}
                min={12}
                max={20}
                step={1}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>حجم indentation</Label>
                <span className="text-sm text-muted-foreground lnum">{preferences.tabSize} مسافات</span>
              </div>
              <Slider
                value={[preferences.tabSize]}
                onValueChange={([v]) => updatePreferences({ tabSize: v })}
                min={2}
                max={8}
                step={2}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>ثيم المحرر</Label>
                <p className="text-xs text-muted-foreground mt-1">ألوان تمييز الكود</p>
              </div>
              <Select
                value={preferences.editorTheme}
                onValueChange={(v) => updatePreferences({ editorTheme: v as any })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">VS Dark</SelectItem>
                  <SelectItem value="vs-light">VS Light</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-5 w-5 text-amber-500" />
              الإشعارات
            </CardTitle>
            <CardDescription>تحكم في الإشعارات التي تصلك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات البريد الإلكتروني</Label>
                <p className="text-xs text-muted-foreground mt-1">إشعارات حول الدروس الجديدة والتذكيرات</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(v) => updatePreferences({ emailNotifications: v })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات المتصفح</Label>
                <p className="text-xs text-muted-foreground mt-1">إشعارات فورية في المتصفح</p>
              </div>
              <Switch
                checked={preferences.pushNotifications}
                onCheckedChange={(v) => updatePreferences({ pushNotifications: v })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>التقرير الأسبوعي</Label>
                <p className="text-xs text-muted-foreground mt-1">ملخص أسبوعي بتقدمك</p>
              </div>
              <Switch
                checked={preferences.weeklyReport}
                onCheckedChange={(v) => updatePreferences({ weeklyReport: v })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>المؤثرات الصوتية</Label>
                <p className="text-xs text-muted-foreground mt-1">أصوات عند إكمال الدروس والإنجازات</p>
              </div>
              <Switch
                checked={preferences.soundEffects}
                onCheckedChange={(v) => updatePreferences({ soundEffects: v })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Volume2 className="h-5 w-5 text-rose-500" />
              أهداف التعلم
            </CardTitle>
            <CardDescription>حدد هدفك اليومي للحفاظ على الاستمرارية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>الهدف اليومي</Label>
              <span className="text-sm text-muted-foreground lnum">{preferences.dailyGoalMinutes} دقيقة</span>
            </div>
            <Slider
              value={[preferences.dailyGoalMinutes]}
              onValueChange={([v]) => updatePreferences({ dailyGoalMinutes: v })}
              min={15}
              max={120}
              step={15}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15 د</span>
              <span>60 د</span>
              <span>120 د</span>
            </div>
          </CardContent>
        </Card>

        {/* Data management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings className="h-5 w-5 text-muted-foreground" />
              إدارة البيانات
            </CardTitle>
            <CardDescription>تصدير أو إعادة تعيين بياناتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" onClick={handleExport} className="w-full justify-start">
              <Download className="h-4 w-4 ml-2" />
              تصدير بياناتي (JSON)
            </Button>
            <Button variant="outline" onClick={handleResetProgress} className="w-full justify-start text-rose-600 hover:text-rose-700">
              <RotateCcw className="h-4 w-4 ml-2" />
              إعادة تعيين التقدم
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (confirm("هل تريد العودة للرئيسية؟")) navigate({ name: "home" });
              }}
              className="w-full justify-start"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              حذف الحساب
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
