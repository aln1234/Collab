"use client";

import { Building2, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function RoleSelectionPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const hasInitialized = useAuthStore((state) => state.hasInitialized);

  useEffect(() => {
    if (!isInitializing && hasInitialized && user) {
      router.replace(getDashboardForRole(user.role));
    }
  }, [hasInitialized, isInitializing, router, user]);

  return (
    <AuthPageShell>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.05] sm:p-6">
        <header>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">Choose your workspace</h1>
          <p className="mt-1 text-sm text-slate-500">Select the side of Connect you want to open.</p>
        </header>
        <div className="grid gap-3">
          <Link href="/creator/dashboard" className="mt-5 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40">
            <UserRound className="h-5 w-5 text-indigo-600" />
            <h2 className="mt-3 font-semibold text-slate-950">Creator</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Browse campaigns, apply, submit content, and track payment status.</p>
          </Link>
          <Link href="/brand/dashboard" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-slate-50">
            <Building2 className="h-5 w-5 text-indigo-600" />
            <h2 className="mt-3 font-semibold text-slate-950">Brand</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Create campaigns, review creators and submissions, and manage payment status.</p>
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
