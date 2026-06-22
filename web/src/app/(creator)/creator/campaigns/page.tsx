"use client";

import { SlidersHorizontal } from "lucide-react";

import { ErrorMessage } from "@/components/error-message";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { LoadingState } from "@/components/loading-state";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { CampaignEmptyState } from "@/features/campaigns/components/campaign-empty-state";
import { useCampaigns } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function CreatorCampaignsPage() {
  const { data, isError, isLoading, error } = useCampaigns();
  const campaigns = (data ?? []).filter((campaign) => campaign.status === "OPEN");

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader
          title="Find campaigns"
          description="Browse open campaign briefs and apply when your niche, schedule, and deliverables line up."
          actions={
            <AppButton variant="secondary" aria-label="Filter campaigns">
              <SlidersHorizontal className="h-4 w-4" />
            </AppButton>
          }
        />
        {isLoading ? <LoadingState label="Loading campaigns" /> : null}
        {isError ? <ErrorMessage message={getApiErrorMessage(error, "Unable to load campaigns. Please try again.")} /> : null}
        {!isLoading && !isError && !campaigns.length ? (
          <CampaignEmptyState
            title="No open campaigns yet"
            description="Open campaigns will appear here once brands publish briefs for creators."
          />
        ) : null}
        {campaigns.length ? (
          <div className="grid gap-3">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} href={`/creator/campaigns/${campaign.id}`} />
            ))}
          </div>
        ) : null}
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
