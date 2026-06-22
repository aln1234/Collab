"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/features/auth/store";

export function AuthProvider({ children }: { children: ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    window.addEventListener("connect:auth-expired", logout);
    return () => window.removeEventListener("connect:auth-expired", logout);
  }, [logout]);

  return children;
}
