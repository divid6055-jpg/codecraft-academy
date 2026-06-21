// ====================================================================
// CodeCraft Academy — Navigation Items
// ====================================================================

import {
  Home,
  BookOpen,
  Route,
  Code2,
  LayoutDashboard,
  Trophy,
  MessageSquare,
  Users,
  Info,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  view: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { view: "home", label: "الرئيسية", icon: Home },
  { view: "catalog", label: "الدورات", icon: BookOpen },
  { view: "tracks", label: "المسارات", icon: Route },
  { view: "playground", label: "المحرر", icon: Code2 },
  { view: "dashboard", label: "لوحتي", icon: LayoutDashboard },
  { view: "achievements", label: "الإنجازات", icon: Trophy },
  { view: "forum", label: "المجتمع", icon: MessageSquare },
  { view: "instructors", label: "المدربون", icon: Users },
  { view: "about", label: "عن المنصة", icon: Info },
];
