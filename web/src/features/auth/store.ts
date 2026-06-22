"use client";

import { create } from "zustand";

import { getMe, login as requestLogin, register as requestRegister } from "@/features/auth/api";
import { tokenStorage } from "@/lib/storage/tokens";
import type { LoginPayload, RegisterPayload, User } from "@/types/marketplace";

type AuthTokens = { access: string; refresh: string };

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  hasInitialized: boolean;
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User | null) => void;
  authenticateWithTokens: (tokens: AuthTokens) => Promise<User>;
  signIn: (payload: LoginPayload) => Promise<User>;
  signUp: (payload: RegisterPayload) => Promise<User>;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const roleDashboard = {
  BRAND: "/brand/dashboard",
  CREATOR: "/creator/dashboard",
  ADMIN: "/admin",
} as const satisfies Record<User["role"], string>;

export function getDashboardForRole(role: User["role"]) {
  return roleDashboard[role];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: tokenStorage.getAccessToken(),
  isAuthenticated: false,
  isInitializing: true,
  hasInitialized: false,
  setTokens: (tokens) => {
    tokenStorage.setTokens(tokens);
    set({ accessToken: tokens.access });
  },
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
      isInitializing: false,
      hasInitialized: true,
    }),
  authenticateWithTokens: async (tokens) => {
    tokenStorage.setTokens(tokens);
    set({
      accessToken: tokens.access,
      isInitializing: true,
      hasInitialized: false,
    });

    try {
      const user = await getMe();
      set({
        user,
        accessToken: tokens.access,
        isAuthenticated: true,
        isInitializing: false,
        hasInitialized: true,
      });
      return user;
    } catch (error) {
      tokenStorage.clearTokens();
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isInitializing: false,
        hasInitialized: true,
      });
      throw error;
    }
  },
  signIn: async (payload) => {
    const tokens = await requestLogin(payload);
    return get().authenticateWithTokens(tokens);
  },
  signUp: async (payload) => {
    await requestRegister(payload);
    const tokens = await requestLogin({
      email: payload.email,
      password: payload.password,
    });
    return get().authenticateWithTokens(tokens);
  },
  initializeAuth: async () => {
    if (get().hasInitialized) {
      return;
    }

    const token = tokenStorage.getAccessToken();
    if (!token) {
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitializing: false,
        hasInitialized: true,
      });
      return;
    }

    set({ accessToken: token, isInitializing: true });

    try {
      const user = await getMe();
      set({
        user,
        isAuthenticated: true,
        isInitializing: false,
        hasInitialized: true,
      });
    } catch {
      tokenStorage.clearTokens();
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitializing: false,
        hasInitialized: true,
      });
    }
  },
  logout: () => {
    tokenStorage.clearTokens();
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitializing: false,
      hasInitialized: true,
    });
  },
}));
