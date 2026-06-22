"use client";

import { Compass, LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import { showSuccess } from "@/lib/toast";

const roleLabels = {
  BRAND: "Brand",
  CREATOR: "Creator",
  ADMIN: "Admin",
};

export function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasInitialized = useAuthStore((state) => state.hasInitialized);
  const logout = useAuthStore((state) => state.logout);

  const authenticatedUser = hasInitialized && isAuthenticated ? user : null;
  const dashboardHref = authenticatedUser ? getDashboardForRole(authenticatedUser.role) : "/login";
  const displayName = authenticatedUser?.full_name || authenticatedUser?.email;

  function handleLogout() {
    logout();
    showSuccess("Signed out");
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-700 text-white">
            <Compass className="h-5 w-5" />
          </span>
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/campaigns" className="hover:text-teal-800">
            Campaigns
          </Link>
          {authenticatedUser ? (
            <Link href={dashboardHref} className="hover:text-teal-800">
              Dashboard
            </Link>
          ) : null}
        </nav>
        {!hasInitialized ? (
          <div className="h-10 w-28 animate-pulse rounded-md bg-slate-100" />
        ) : authenticatedUser ? (
          <div className="flex items-center gap-2">
            <div className="hidden max-w-44 text-right sm:block">
              <p className="truncate text-sm font-medium text-slate-950">{displayName}</p>
              <p className="text-xs font-medium text-teal-700">{roleLabels[authenticatedUser.role]}</p>
            </div>
            <Link
              href={dashboardHref}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-teal-700 px-3 text-sm font-medium text-white hover:bg-teal-800"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Get started</span>
              <span className="sm:hidden">Start</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
