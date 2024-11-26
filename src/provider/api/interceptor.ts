// src/provider/api/authInterceptor.ts
import { AxiosInstance } from "axios";
import useAuthStore from "@/features/auth/state/authStore";

export const setupAuthInterceptor = (api: AxiosInstance) => {
  const logout = useAuthStore.getState().logout;

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout(); // Desloga o usuário em caso de erro 401
      }
      return Promise.reject(error);
    }
  );
};
