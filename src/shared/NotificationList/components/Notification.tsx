import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, Person as PersonIcon } from '@mui/icons-material';

interface NotificationProps {
  id: string;
  message: string;
  color?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // Tempo de exibição em milissegundos
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  color = 'info',
  duration = 3000, // Duração padrão de 3 segundos
  onClose,
}) => {
  const getBackgroundColor = () => {
    switch (color) {
      case 'info':
        return '#2196f3'; // Azul
      case 'success':
        return '#4caf50'; // Verde
      case 'warning':
        return '#ff9800'; // Laranja
      default:
        return '#2196f3'; // Padrão: Azul
    }
  };

  // Configura o timeout para fechar automaticamente
  useEffect(() => {
    const timeout = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timeout); // Limpa o timeout se o componente for desmontado
  }, [id, duration, onClose]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: getBackgroundColor(),
        borderRadius: 2,
        padding: '10px 16px',
        gap: 1.5,
        maxWidth: 400,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        color: '#fff',
      }}
    >
      {/* Ícone no círculo à esquerda */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
        }}
      >
        <PersonIcon />
      </Box>

      {/* Mensagem no centro */}
      <Typography sx={{ flexGrow: 1, fontSize: 16 }}>{message}</Typography>

      {/* Botão de fechar */}
      <IconButton
        size="small"
        onClick={() => onClose(id)}
        sx={{
          color: '#fff',
          padding: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default Notification;
