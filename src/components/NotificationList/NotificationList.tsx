import React from 'react';
import { Box } from '@mui/material';
import Notification from './Notification';
import useNotificationStore from '../../store/notificationStore';

const NotificationList: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 60,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      {notifications.map(({ id, message, color }) => (
        <Notification
          key={id}
          id={id}
          message={message}
          color={color}
          onClose={removeNotification}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
