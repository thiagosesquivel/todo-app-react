import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  token: string;
}

interface AuthState {
  user: User | null;
  authenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => void; // Inicializa o estado no carregamento da aplicação
}

const authState = create<AuthState>((set) => ({
  user: null,
  authenticated: false,

  login: (user) => {
    set({
      user,
      authenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token'); // Remove o token
    set({
      user: null,
      authenticated: false,
    });
    window.location.href = '/login'; // Redireciona para a página de login
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({
        authenticated: true,
      });
    }
  },
}));

export default authState;
