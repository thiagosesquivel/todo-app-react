import React, { useState } from "react";
import { Checkbox, ListItem, ListItemText, IconButton, TextField } from "@mui/material";
import { Edit, Delete, Check } from "@mui/icons-material";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); // Controle do modo de edição
  const [editedTitle, setEditedTitle] = useState(task.title); // Título editado

  const handleEditConfirm = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle); // Salva as alterações
      setIsEditing(false); // Sai do modo de edição
    }
  };

  return (
    <ListItem
      sx={{
        bgcolor: task.completed ? "action.selected" : "background.paper",
        borderRadius: 1,
        mb: 1,
        opacity: 1, // Sempre visível, mesmo se estiver concluída
      }}
    >
      {/* Checkbox para marcar como completo/incompleto */}
      <Checkbox
        edge="start"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)} // Alterna o estado
      />

      {/* Campo de edição ou texto */}
      {isEditing && !task.completed ? (
        <TextField
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEditConfirm} // Salva ao perder o foco
          size="small"
          fullWidth
        />
      ) : (
        <ListItemText
          primary={task.title}
          secondary={task.description || ""}
          sx={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        />
      )}

      {/* Botão de editar ou confirmar */}
      {!task.completed && (
        isEditing ? (
          <IconButton edge="end" aria-label="confirmar" onClick={handleEditConfirm}>
            <Check />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="editar"
            onClick={() => setIsEditing(true)}
          >
            <Edit />
          </IconButton>
        )
      )}

      {/* Botão de deletar */}
      <IconButton edge="end" aria-label="deletar" onClick={() => onDelete(task.id)}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};
