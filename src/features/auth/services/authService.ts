import { api } from "@/provider";
import { AuthResponse, LoginCredentials } from "@/features/auth/types";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/login", credentials);
  return data;
};
