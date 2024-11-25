import { useMutation } from '@tanstack/react-query';
import { login, LoginCredentials, AuthResponse } from '../services/authService';
import useAuthStore from '../store/authStore';
import api from '../provider/api'; // Axios configurado

/**
 * Hook para realizar o login.
 */
export const useAuth = () => {
  const loginStore = useAuthStore((state) => state.login);

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      // Atualiza o Zustand com os dados do usuário
      loginStore({
        id: data.id,
        username: data.username,
        token: data.token,
      });

      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);

      // Configura o token no cabeçalho do Axios
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    },
    onError: (error) => {
      console.error('Erro ao realizar login:', error.message);
    },
  });
};
