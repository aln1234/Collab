import { SlidersHorizontal } from "lucide-react";

import { CampaignList } from "@/features/campaigns/campaign-list";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";

export default function CampaignsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title="Campaigns"
          description="Browse campaigns and apply when your niche, deliverables, and schedule line up."
          actions={
            <AppButton variant="secondary" aria-label="Filter campaigns">
              <SlidersHorizontal className="h-4 w-4" />
            </AppButton>
          }
        />
        <CampaignList />
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
