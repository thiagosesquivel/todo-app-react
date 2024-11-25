import api from "../provider/api";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", task);
  return data;
};

export const updateTask = async ({ id,  updatedTask,}:{
  id: string;
  updatedTask: Partial<Omit<Task, "id">>;
}): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, updatedTask);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
