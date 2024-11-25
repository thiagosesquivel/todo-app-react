import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  color: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // Adicionado o tempo de exibição
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

export default useNotificationStore;
