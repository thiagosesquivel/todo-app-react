import useNotificationStore from '../store/notificationStore';

const useNotification = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  const notify = (color: 'info' | 'success' | 'warning' | 'error', message: string, duration = 3000) => {
    const id = `${Date.now()}`; // ID único para cada notificação
    addNotification({ id, message, color, duration });
  };

  return { notify };
};

export default useNotification;