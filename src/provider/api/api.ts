import axios, { AxiosInstance } from "axios";


export const createApiClient = (
  token: string | null,
  logout: () => void
): AxiosInstance => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // URL base da API
    withCredentials: true, // Inclui cookies nas requisições
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Adiciona o token no cabeçalho, se disponível
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Configura os interceptores
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout(); // Executa o logout em caso de erro 401
      }
      return Promise.reject(error);
    }
  );

  return api;
};
