import { api } from "@/lib/api/client";
import type { LoginPayload, RegisterPayload, User } from "@/types/marketplace";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<{ access: string; refresh: string }>("/auth/token/", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<User>("/auth/register/", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get<User>("/auth/me/");
  return data;
}
