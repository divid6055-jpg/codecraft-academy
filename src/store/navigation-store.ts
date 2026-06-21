"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppView } from "@/types";

// --------------------------------------------------------------------
// Navigation Store — single-page app router state
// --------------------------------------------------------------------
interface NavigationState {
  view: AppView;
  history: AppView[];
  historyIndex: number;
  navigate: (view: AppView) => void;
  back: () => void;
  forward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  reset: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      view: { name: "home" },
      history: [{ name: "home" }],
      historyIndex: 0,

      navigate: (view) => {
        const state = get();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(view);
        // Cap history at 50 entries
        if (newHistory.length > 50) newHistory.shift();
        set({
          view,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
        // Scroll to top on view change
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      back: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          set({ view: state.history[newIndex], historyIndex: newIndex });
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      },

      forward: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          set({ view: state.history[newIndex], historyIndex: newIndex });
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      },

      canGoBack: () => get().historyIndex > 0,
      canGoForward: () => get().historyIndex < get().history.length - 1,

      reset: () => set({ view: { name: "home" }, history: [{ name: "home" }], historyIndex: 0 }),
    }),
    {
      name: "codecraft-navigation",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ view: state.view }),
    }
  )
);
