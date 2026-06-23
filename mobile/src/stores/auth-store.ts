import { create } from "zustand";

import { getCurrentUser, login, register } from "../features/auth/api";
import type { MarketplaceUser, RegisterPayload, UserRole } from "../features/auth/types";
import { normalizeApiError, setUnauthorizedHandler } from "../lib/api-client";
import { queryClient } from "../lib/query-client";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../lib/token-storage";
import { showSuccess } from "../lib/toast";

type AuthState = {
  user: MarketplaceUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<MarketplaceUser>;
  signUp: (payload: RegisterPayload) => Promise<MarketplaceUser>;
  hydrateAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export function getDashboardPath(role: UserRole) {
  if (role === "BRAND") {
    return "/(brand)/dashboard" as const;
  }

  if (role === "ADMIN") {
    return "/(admin)" as const;
  }

  return "/(creator)/dashboard" as const;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  error: null,

  async signIn(email, password) {
    set({ isLoading: true, error: null });

    try {
      await clearTokens();
      const tokens = await login({ email, password });
      await setTokens(tokens.access, tokens.refresh);

      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isHydrated: true,
      });

      return user;
    } catch (error) {
      const normalizedError = normalizeApiError(error);
      await clearTokens();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isHydrated: true,
        error: normalizedError.message,
      });
      throw normalizedError;
    }
  },

  async signUp(payload) {
    set({ isLoading: true, error: null });

    try {
      await register(payload);
      const tokens = await login({
        email: payload.email,
        password: payload.password,
      });
      await setTokens(tokens.access, tokens.refresh);

      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isHydrated: true,
      });

      return user;
    } catch (error) {
      const normalizedError = normalizeApiError(error);
      await clearTokens();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isHydrated: true,
        error: normalizedError.message,
      });
      throw normalizedError;
    }
  },

  async hydrateAuth() {
    set({ isLoading: true, error: null });

    try {
      const [accessToken, refreshToken] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
      ]);

      if (!accessToken && !refreshToken) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isHydrated: true,
        });
        return;
      }

      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isHydrated: true,
      });
    } catch {
      await clearTokens();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isHydrated: true,
      });
    }
  },

  async logout() {
    await clearTokens();
    queryClient.clear();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: true,
      error: null,
    });
    showSuccess("Signed out");
  },
}));

setUnauthorizedHandler(() => {
  queryClient.clear();
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isHydrated: true,
    error: "Your session expired. Please sign in again.",
  });
});
