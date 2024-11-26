import {api} from "@/provider/index";
import { Task } from "@/features/tasks/types";



export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", task);
  return data;
};

export const updateTask = async ({ id,  updatedTask,}:{
  id: number;
  updatedTask: Partial<Omit<Task, "id">>;
}): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, updatedTask);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
