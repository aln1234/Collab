"use client";

import { BadgeDollarSign, ClipboardList, Compass, FileCheck2, Home, Megaphone, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/lib/utils";

const publicItems = [
  { href: "/campaigns", label: "Browse", icon: Megaphone },
  { href: "/login", label: "Sign in", icon: UserRound },
  { href: "/register", label: "Start", icon: Home },
];

const creatorItems = [
  { href: "/creator/dashboard", label: "Home", icon: Home },
  { href: "/creator/campaigns", label: "Browse", icon: Compass },
  { href: "/creator/applications", label: "Applications", icon: ClipboardList },
  { href: "/creator/submissions", label: "Work", icon: FileCheck2 },
  { href: "/creator/profile", label: "Profile", icon: UserRound },
];

const brandItems = [
  { href: "/brand/dashboard", label: "Home", icon: Home },
  { href: "/brand/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/brand/applications", label: "Apps", icon: ClipboardList },
  { href: "/brand/submissions", label: "Review", icon: FileCheck2 },
  { href: "/brand/payments", label: "Pay", icon: BadgeDollarSign },
];

const adminItems = [
  { href: "/admin", label: "Admin", icon: ShieldCheck },
  { href: "/campaigns", label: "Browse", icon: Megaphone },
];

export function MobileBottomNav({ workspaceWide = false }: { workspaceWide?: boolean }) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isWorkspaceUser = Boolean(user);
  const items =
    user?.role === "BRAND"
      ? brandItems
      : user?.role === "CREATOR"
        ? creatorItems
        : user?.role === "ADMIN"
          ? adminItems
          : publicItems;

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white",
        isWorkspaceUser && "shadow-[0_-5px_14px_rgba(100,116,139,0.07)]",
        workspaceWide ? "lg:hidden" : "sm:hidden",
      )}
    >
      <div
        className={cn(
          "mx-auto grid",
          isWorkspaceUser ? "h-[68px] max-w-lg px-1" : "h-16 max-w-md",
        )}
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          if (!isWorkspaceUser) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-slate-500",
                  active && "text-teal-700",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center text-[9px] font-bold text-slate-400 transition focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-indigo-600",
                active && "font-black text-indigo-600",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-10 items-center justify-center rounded-[13px]",
                  active && "bg-indigo-50",
                )}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span className="mt-0.5 max-w-full truncate px-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
