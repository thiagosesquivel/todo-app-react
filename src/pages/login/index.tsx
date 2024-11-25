import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import useAuthStore from "../../store/authStore";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const authenticated = useAuthStore((state) => state.authenticated);
  const loginMutation = useAuth();

  // Redireciona o usuário para a página de tarefas se já estiver autenticado
  useEffect(() => {
    if (authenticated) {
      navigate("/tasks");
    }
  }, [authenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    loginMutation.mutate({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          type="text"
          label="Nome do usuário"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="password"
          type="password"
          label="Senha"
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loginMutation.isPending}
            sx={{ py: 1.5 }}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
      </form>
      {loginMutation.isError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Erro ao fazer login: {loginMutation.error?.message}
        </Alert>
      )}
    </Box>
  );
};

export default LoginPage;
