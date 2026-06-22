"use client";

import { BadgeDollarSign, ClipboardList, FileCheck2, Home, Megaphone, ShieldCheck, UserRound } from "lucide-react";
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
  { href: "/creator/campaigns", label: "Browse", icon: Megaphone },
  { href: "/creator/dashboard", label: "Home", icon: Home },
  { href: "/creator/applications", label: "Apps", icon: ClipboardList },
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

export function MobileBottomNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const items =
    user?.role === "BRAND"
      ? brandItems
      : user?.role === "CREATOR"
        ? creatorItems
        : user?.role === "ADMIN"
          ? adminItems
          : publicItems;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white sm:hidden">
      <div className="mx-auto grid h-16 max-w-md" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
        })}
      </div>
    </nav>
  );
}
