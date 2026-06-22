import { apiClient } from "../../lib/api-client";
import type { AuthTokens, LoginPayload, MarketplaceUser, RegisterPayload } from "./types";

export async function login(payload: LoginPayload) {
  const response = await apiClient.post<AuthTokens>("/auth/token/", payload);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post<MarketplaceUser>("/auth/register/", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get<MarketplaceUser>("/auth/me/");
  return response.data;
}
