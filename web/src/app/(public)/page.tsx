import { ArrowRight, BadgeDollarSign, ClipboardCheck, Megaphone } from "lucide-react";
import Link from "next/link";

import { DashboardCard } from "@/components/dashboard-card";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { CampaignList } from "@/features/campaigns/campaign-list";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title="Connect"
          description="A mobile-first marketplace workflow for creators and brands, from campaign application to content approval and manual payment tracking."
          actions={
            <Link href="/campaigns">
              <AppButton aria-label="Browse campaigns">
                <ArrowRight className="h-4 w-4" />
              </AppButton>
            </Link>
          }
        />
        <section className="grid gap-3 sm:grid-cols-3">
          <DashboardCard icon={Megaphone} label="Campaigns" value="24" detail="Open for creators" />
          <DashboardCard icon={ClipboardCheck} label="Submissions" value="138" detail="Moving through review" />
          <DashboardCard icon={BadgeDollarSign} label="Payments" value="$18.4k" detail="Tracked manually" />
        </section>
        <section className="grid gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-950">Featured campaigns</h2>
            <Link href="/campaigns" className="text-sm font-medium text-teal-700">
              View all
            </Link>
          </div>
          <CampaignList />
        </section>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
