import React from 'react';
import { Box } from '@mui/material';
import Notification from './Notification';
import { notificationState } from '@/shared/NotificationList/state/notificationState';

const NotificationList: React.FC = () => {
  const notifications = notificationState((state) => state.notifications);
  const removeNotification = notificationState((state) => state.removeNotification);

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
      {notifications.map(({ id, message, type }) => (
        <Notification
          key={id}
          id={id}
          message={message}
          color={type}
          onClose={removeNotification}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
