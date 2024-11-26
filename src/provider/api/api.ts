import axios from 'axios';
import useAuthStore from '../features/auth/state/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  useAuthStore.getState().initialize(); // Seta o estado de autenticação
}


// Intercepta as respostas para lidar com erros 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout(); // Desloga o usuário e redireciona
    }
    return Promise.reject(error);
  }
);

export default api;
