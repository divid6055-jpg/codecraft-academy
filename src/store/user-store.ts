"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --------------------------------------------------------------------
// User Store — authentication, profile, preferences
// --------------------------------------------------------------------
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  title: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
}

interface UserPreferences {
  language: "ar" | "en";
  dailyGoalMinutes: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReport: boolean;
  soundEffects: boolean;
  codeAutoSave: boolean;
  showLineNumbers: boolean;
  editorTheme: "vs-dark" | "vs-light" | "monokai" | "github";
  fontSize: number;
  tabSize: number;
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  preferences: UserPreferences;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  language: "ar",
  dailyGoalMinutes: 30,
  emailNotifications: true,
  pushNotifications: true,
  weeklyReport: true,
  soundEffects: true,
  codeAutoSave: true,
  showLineNumbers: true,
  editorTheme: "vs-dark",
  fontSize: 14,
  tabSize: 2,
};

const DEFAULT_PROFILE: UserProfile = {
  id: "guest-user",
  name: "طالب برمجة",
  email: "guest@codecraft.academy",
  avatar: "",
  bio: "بدأت رحلتي في عالم البرمجة لتعلم أساسيات تطوير الويب وتطبيقاته.",
  joinedAt: new Date().toISOString(),
  title: "مبتدئ",
  location: "",
  website: "",
  github: "",
  twitter: "",
  linkedin: "",
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      profile: null,
      preferences: DEFAULT_PREFERENCES,

      login: (email, name) => {
        const profile: UserProfile = {
          ...DEFAULT_PROFILE,
          id: `user-${Date.now()}`,
          email,
          name: name || email.split("@")[0] || "طالب برمجة",
          joinedAt: new Date().toISOString(),
        };
        set({ isAuthenticated: true, profile });
      },

      logout: () => set({ isAuthenticated: false, profile: null }),

      updateProfile: (partial) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...partial } : null,
        })),

      updatePreferences: (partial) =>
        set((state) => ({
          preferences: { ...state.preferences, ...partial },
        })),
    }),
    {
      name: "codecraft-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
