"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import type { UserRole } from "@/types/marketplace";

export function ProtectedRoute({
  allowedRole,
  children,
}: {
  allowedRole: UserRole;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const hasInitialized = useAuthStore((state) => state.hasInitialized);

  useEffect(() => {
    if (isInitializing || !hasInitialized) {
      return;
    }

    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user.role !== allowedRole) {
      router.replace(getDashboardForRole(user.role));
    }
  }, [allowedRole, hasInitialized, isInitializing, pathname, router, user]);

  if (isInitializing || !hasInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-700" />
        Loading your workspace
      </div>
    );
  }

  if (!user || user.role !== allowedRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-700" />
        Redirecting
      </div>
    );
  }

  return children;
}
