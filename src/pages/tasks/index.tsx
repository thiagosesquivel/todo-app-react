import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  CircularProgress,
} from "@mui/material";
import { TaskItem } from "../../components/TaskItem";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../../hooks/useTasks";
import authStore from "../../store/authStore";
import { Layout } from "../../layout/main";

const TasksPage = () => {
  const { data: tasks, isPending } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const logout = authStore((state) => state.logout);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarregar a página ao submeter o formulário
    if (!newTask.trim()) return;
    createTask.mutate({ title: newTask, description: "", completed: false });
    setNewTask("");
  };

  const handleEditTask = (id: string, newTitle: string) => {
    updateTask.mutate({ id, updatedTask: { title: newTitle } });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask.mutate(id);
  };

  const handleToggleTask = (id: string, completed: boolean) => {
    updateTask.mutate({ id, updatedTask: { completed: !completed } });
  };

  if (isPending)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Layout onLogout={logout}>
      {/* Container do CRUD */}
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          marginRight: "auto", // Alinha mais à esquerda
        }}
      >
        {/* Formulário para adicionar tarefa */}
        <form onSubmit={handleAddTask}>
          <Box display="flex" gap={2} mb={3}>
            <TextField
              label="Nova Tarefa"
              variant="outlined"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
              type="submit" // Submete o formulário ao pressionar Enter
              variant="contained"
              color="primary"
              disabled={createTask.isPending}
            >
              {createTask.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Adicionar"
              )}
            </Button>
          </Box>
        </form>

        {/* Lista de Tarefas */}
        <List>
          {tasks
            ?.sort((a, b) => b.id - a.id)
            ?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))}
        </List>
      </Box>
    </Layout>
  );
};

export default TasksPage;
