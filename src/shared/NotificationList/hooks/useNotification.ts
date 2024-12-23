import {notificationState} from '@/shared/NotificationList/state/notificationState';

const useNotification = () => {
  const addNotification = notificationState((state) => state.addNotification);

  const notify = (type: 'info' | 'success' | 'warning' | 'error', message: string, duration = 3000) => {
    const id = `${Date.now()}`; // ID único para cada notificação
    addNotification({ id, message, type });
  };

  return { notify };
};

export default useNotification;
