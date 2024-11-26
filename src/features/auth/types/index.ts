export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    id: string;
    username: string;
  }