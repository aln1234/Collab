"use client";

import { useAuthStore } from "@/features/auth/store";

export function useAuth() {
  return useAuthStore();
}
