"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { DashboardCard } from "@/components/dashboard-card";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { useAuthStore } from "@/features/auth/store";

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.email || "admin";

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title={`Welcome back, ${displayName}`}
          description="Manage marketplace activity, users, and platform records."
          actions={
            <Link href="http://localhost:8000/admin">
              <AppButton aria-label="Open Django Admin">
                <ExternalLink className="h-4 w-4" />
              </AppButton>
            </Link>
          }
        />
        <section className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-normal text-teal-700">Signed in as Admin</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Internal operations continue in Django Admin for this MVP.
          </p>
        </section>
        <section className="grid gap-3 sm:grid-cols-3">
          <DashboardCard icon={ShieldCheck} label="Users" value="Admin" detail="Roles and verification" />
          <DashboardCard icon={ShieldCheck} label="Marketplace" value="Models" detail="Campaign operations" />
          <DashboardCard icon={ShieldCheck} label="Disputes" value="Manual" detail="Handled internally" />
        </section>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
