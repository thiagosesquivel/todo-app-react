import useNotification from '@/shared/NotificationList/hooks/useNotification';
import { QueryClient } from '@tanstack/react-query';

 const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    },
    mutations: {
      onSuccess: (data) => {
        const { notify } = useNotification();
        notify("success", "Operação realizada com sucesso!");
      },
      onError: (error) => {
        const { notify } = useNotification();
        notify("error", "Oops! Algo deu errado. Tente novamente.");
      },
    },

  },
});

export default queryClient;