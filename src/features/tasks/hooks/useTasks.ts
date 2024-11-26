import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/features/tasks/services/tasksService";

// Hook para buscar todas as tarefas
export const useTasks = () => {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
};

// Hook para criar uma tarefa
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: any) => {
        return [newTask, ...(oldTasks || [])]; // Novo item no topo
      });
    }
  });
};

// Hook para atualizar uma tarefa
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
};

// Hook para deletar uma tarefa
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Atualiza o cache ao deletar
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
};
