"use client";

import { BadgeDollarSign, ClipboardList, FileCheck2, Megaphone } from "lucide-react";
import Link from "next/link";

import { DashboardCard } from "@/components/dashboard-card";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { useAuthStore } from "@/features/auth/store";

export default function BrandDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.email || "brand";

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title={`Welcome back, ${displayName}`}
          description="Manage your campaigns, review creators, and track submissions."
          actions={
            <Link href="/brand/campaigns/new">
              <AppButton size="sm">New</AppButton>
            </Link>
          }
        />
        <section className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-normal text-teal-700">Signed in as Brand</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This dashboard is using your live authenticated user context. Marketplace totals below are still sample MVP placeholders.
          </p>
        </section>
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard icon={Megaphone} label="Campaigns" value="6" detail="2 open" />
          <DashboardCard icon={ClipboardList} label="Applications" value="31" detail="12 pending" />
          <DashboardCard icon={FileCheck2} label="Submissions" value="9" detail="4 need review" />
          <DashboardCard icon={BadgeDollarSign} label="Payments" value="5" detail="3 unpaid" />
        </section>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
