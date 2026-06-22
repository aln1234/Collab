"use client";

import { Building2, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";

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
    <>
      <Navbar />
      <ScreenContainer narrow className="place-content-center">
        <PageHeader title="Choose your workspace" description="Go to the side of the marketplace you want to work in now." />
        <div className="grid gap-3">
          <Link href="/creator/dashboard" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-teal-300">
            <UserRound className="h-6 w-6 text-teal-700" />
            <h2 className="mt-3 font-semibold text-slate-950">Creator</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Browse campaigns, apply, submit content, and track payment status.</p>
          </Link>
          <Link href="/brand/dashboard" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-teal-300">
            <Building2 className="h-6 w-6 text-teal-700" />
            <h2 className="mt-3 font-semibold text-slate-950">Brand</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Create campaigns, review creators and submissions, and manage payment status.</p>
          </Link>
        </div>
      </ScreenContainer>
    </>
  );
}
