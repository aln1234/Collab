"use client";

import { BadgeDollarSign, ClipboardList, FileCheck2, Search } from "lucide-react";
import Link from "next/link";

import { DashboardCard } from "@/components/dashboard-card";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { useAuthStore } from "@/features/auth/store";

export default function CreatorDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.email || "creator";

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title={`Welcome back, ${displayName}`}
          description="Find campaigns, manage applications, and submit content."
          actions={
            <Link href="/creator/campaigns">
              <AppButton size="sm">Browse</AppButton>
            </Link>
          }
        />
        <section className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-normal text-teal-700">Signed in as Creator</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This dashboard is using your live authenticated user context. Marketplace totals below are still sample MVP placeholders.
          </p>
        </section>
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard icon={Search} label="Open matches" value="18" detail="Campaigns accepting applications" />
          <DashboardCard icon={ClipboardList} label="Applications" value="7" detail="3 pending" />
          <DashboardCard icon={FileCheck2} label="Submissions" value="4" detail="1 revision requested" />
          <DashboardCard icon={BadgeDollarSign} label="Payments" value="2" detail="1 unpaid" />
        </section>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
