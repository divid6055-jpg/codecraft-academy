"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code2,
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  Settings,
  Trophy,
  LayoutDashboard,
  Bookmark,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigationStore } from "@/store/navigation-store";
import { useUserStore } from "@/store/user-store";
import { useProgressStore } from "@/store/progress-store";
import { useNotificationStore } from "@/store/notification-store";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigationStore((s) => s.navigate);
  const currentView = useNavigationStore((s) => s.view);
  const { isAuthenticated, profile, logout } = useUserStore();
  const { level, xp } = useProgressStore();
  const { notifications, unreadCount } = useNotificationStore();

  React.useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ name: "search", query: searchQuery.trim() });
    }
  };

  const isActive = (viewName: string) => currentView.name === viewName;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4 lg:px-6">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="القائمة">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-right">القائمة</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    navigate({ name: item.view } as any);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-right text-sm font-medium transition-colors",
                    isActive(item.view)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <button
          onClick={() => navigate({ name: "home" })}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent shadow-lg shadow-brand/20">
            <Code2 className="h-5 w-5 text-brand-foreground" />
          </div>
          <div className="hidden sm:block text-start">
            <div className="font-bold text-base leading-tight">CodeCraft</div>
            <div className="text-[10px] text-muted-foreground leading-tight">
              أكاديمية البرمجة
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 mx-4">
          {NAV_ITEMS.slice(0, 6).map((item) => (
            <button
              key={item.view}
              onClick={() => navigate({ name: item.view } as any)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.view)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="relative hidden md:flex flex-1 max-w-sm mr-auto"
        >
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن دورة أو درس..."
            className="pr-10 pl-3 bg-muted/60 border-muted"
          />
        </form>

        <div className="flex items-center gap-1 mr-auto md:mr-0">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="تبديل الثيم"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="الإشعارات">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  الإشعارات
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-[10px]">
                      {unreadCount} جديد
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    <Bell className="mx-auto h-8 w-8 mb-2 opacity-40" />
                    لا توجد إشعارات
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 8).map((n) => (
                      <DropdownMenuItem
                        key={n.id}
                        className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 w-full">
                          {!n.read && (
                            <div className="h-2 w-2 rounded-full bg-brand shrink-0" />
                          )}
                          <span className="font-medium text-sm flex-1 truncate">
                            {n.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground line-clamp-2">
                          {n.body}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User menu */}
          {isAuthenticated && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2" aria-label="حسابي">
                  <Avatar className="h-8 w-8 border-2 border-brand/30">
                    <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground text-xs">
                      {profile.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-start">
                    <div className="text-xs font-medium leading-tight max-w-[100px] truncate">
                      {profile.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-tight">
                      المستوى {level} • {xp} XP
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{profile.name}</span>
                    <span className="text-xs text-muted-foreground font-normal truncate">
                      {profile.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ name: "dashboard" })}>
                  <LayoutDashboard className="h-4 w-4 ml-2" />
                  لوحة التحكم
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ name: "profile" })}>
                  <User className="h-4 w-4 ml-2" />
                  ملفي الشخصي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ name: "achievements" })}>
                  <Trophy className="h-4 w-4 ml-2" />
                  الإنجازات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ name: "settings" })}>
                  <Settings className="h-4 w-4 ml-2" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => useUserStore.getState().login("guest@codecraft.academy", "طالب برمجة")}
                className="hidden sm:inline-flex"
              >
                دخول
              </Button>
              <Button
                size="sm"
                onClick={() => useUserStore.getState().login("guest@codecraft.academy", "طالب برمجة")}
                className="bg-gradient-to-r from-brand to-accent text-brand-foreground hover:opacity-90"
              >
                <Sparkles className="h-4 w-4 ml-1" />
                ابدأ مجاناً
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
