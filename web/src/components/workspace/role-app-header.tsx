"use client";

import {
  BadgeDollarSign,
  ClipboardList,
  Compass,
  FileCheck2,
  Home,
  LogOut,
  Megaphone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store";
import { showSuccess } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/marketplace";

const navigation = {
  CREATOR: [
    { href: "/creator/dashboard", label: "Home", icon: Home },
    { href: "/creator/campaigns", label: "Browse", icon: Compass },
    { href: "/creator/applications", label: "Applications", icon: ClipboardList },
    { href: "/creator/submissions", label: "Work", icon: FileCheck2 },
    { href: "/creator/profile", label: "Profile", icon: UserRound },
  ],
  BRAND: [
    { href: "/brand/dashboard", label: "Home", icon: Home },
    { href: "/brand/campaigns", label: "Campaigns", icon: Megaphone },
    { href: "/brand/applications", label: "Applications", icon: ClipboardList },
    { href: "/brand/submissions", label: "Review", icon: FileCheck2 },
    { href: "/brand/payments", label: "Payments", icon: BadgeDollarSign },
    { href: "/brand/profile", label: "Profile", icon: UserRound },
  ],
  ADMIN: [{ href: "/admin", label: "Operations", icon: ShieldCheck }],
} satisfies Record<UserRole, Array<{ href: string; label: string; icon: typeof Home }>>;

const roleLabels: Record<UserRole, string> = {
  CREATOR: "Creator",
  BRAND: "Brand",
  ADMIN: "Admin",
};

const homeRoutes: Record<UserRole, string> = {
  CREATOR: "/creator/dashboard",
  BRAND: "/brand/dashboard",
  ADMIN: "/admin",
};

const profileRoutes: Record<UserRole, string> = {
  CREATOR: "/creator/profile",
  BRAND: "/brand/profile",
  ADMIN: "/admin",
};

function getInitials(value: string) {
  return (
    value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "C"
  );
}

export function RoleAppHeader({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const displayName = user?.full_name || user?.email || roleLabels[role];

  function handleLogout() {
    logout();
    showSuccess("Signed out");
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-40 hidden border-b border-slate-200 bg-white/95 backdrop-blur lg:block">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-6">
        <Link
          href={homeRoutes[role]}
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-indigo-700 to-indigo-500 text-white shadow-md shadow-indigo-950/10">
            <span className="absolute -right-3 -top-4 h-10 w-10 rounded-full bg-white/15" />
            <Compass className="relative h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-black tracking-tight text-slate-950">Connect</span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
              {roleLabels[role]}
            </span>
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-0.5" aria-label={`${roleLabels[role]} navigation`}>
          {navigation[role].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="max-w-32 text-right">
            <p className="truncate text-xs font-bold text-slate-950">{displayName}</p>
            <p className="mt-0.5 text-[10px] font-semibold text-slate-500">
              {roleLabels[role]} account
            </p>
          </div>
          <Link
            href={profileRoutes[role]}
            aria-label={`Open ${roleLabels[role].toLowerCase()} profile`}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-100 to-rose-500 text-[10px] font-black text-white shadow-sm shadow-rose-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {getInitials(displayName)}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
