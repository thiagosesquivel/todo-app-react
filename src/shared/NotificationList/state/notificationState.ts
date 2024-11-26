// src/shared/notifications/store/notificationStore.ts
import { create } from "zustand";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

export const notificationState = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
   {
     set((state) => ({
      notifications: [...state.notifications, notification],
    }))},
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
