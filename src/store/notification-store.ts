"use client";

import { create } from "zustand";
import type { Notification } from "@/types";

// --------------------------------------------------------------------
// Notifications Store — in-app toast/notifications center
// --------------------------------------------------------------------
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  push: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
}

const uid = () =>
  `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  push: (n) =>
    set((state) => {
      const notification: Notification = {
        ...n,
        id: uid(),
        createdAt: new Date().toISOString(),
        read: false,
      };
      return {
        notifications: [notification, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1,
      };
    }),

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  remove: (id) =>
    set((state) => {
      const notif = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notif && !notif.read ? state.unreadCount - 1 : state.unreadCount,
      };
    }),

  clear: () => set({ notifications: [], unreadCount: 0 }),
}));
