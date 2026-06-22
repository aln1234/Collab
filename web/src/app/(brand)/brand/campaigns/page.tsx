import Link from "next/link";

import { CampaignList } from "@/features/campaigns/campaign-list";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";

export default function BrandCampaignsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title="Brand campaigns"
          description="Draft, publish, and manage the campaigns creators apply to."
          actions={
            <Link href="/brand/campaigns/new">
              <AppButton size="sm">New</AppButton>
            </Link>
          }
        />
        <CampaignList brandView />
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
