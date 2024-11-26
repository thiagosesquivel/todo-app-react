import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/features/tasks/services/tasksService";
import useNotification from "@/shared/NotificationList/hooks/useNotification";

// Hook para buscar todas as tarefas
export const useTasks = () => {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
};

// Hook para criar uma tarefa
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      // Atualiza o cache adicionando a nova tarefa no topo
      queryClient.setQueryData(["tasks"], (oldTasks: any) => {
        return [newTask, ...(oldTasks || [])]; // Novo item no topo
      });

      // Notificação de sucesso
      notify("success", "Tarefa adicionada com sucesso!");
    },
    onError: () => {
      // Notificação de erro
      notify("error", "Oops! Algo deu errado. Tente novamente.");
    },
  });
};

// Hook para atualizar uma tarefa
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // Atualiza o cache ao editar
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Notificação de sucesso
      notify("success", "Tarefa atualizada com sucesso!");
    },
    onError: () => {
      // Notificação de erro
      notify("error", "Oops! Algo deu errado. Tente novamente.");
    },
  });
};

// Hook para deletar uma tarefa
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
const { notify } = useNotification();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Atualiza o cache ao deletar
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Notificação de sucesso
      notify("success", "Tarefa deletada com sucesso!");
    },
    onError: () => {
      // Notificação de erro
      notify("error", "Oops! Algo deu errado. Tente novamente.");
    },
  });
};
