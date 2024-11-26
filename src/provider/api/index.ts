// src/provider/api/index.ts
import { createApiClient } from "./api";
import useAuthStore from "@/features/auth/state/authState";

// Obtém o token armazenado no localStorage
const token = localStorage.getItem("token");

// Obtém a função de logout do Zustand
const logout = useAuthStore.getState().logout;

// Cria a instância padrão da API
const api = createApiClient(token, logout);

export default api;
