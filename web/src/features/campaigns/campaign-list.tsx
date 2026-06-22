"use client";

import { ErrorMessage } from "@/components/error-message";
import { LoadingState } from "@/components/loading-state";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { CampaignEmptyState } from "@/features/campaigns/components/campaign-empty-state";
import { useCampaigns } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export function CampaignList({ brandView = false }: { brandView?: boolean }) {
  const query = useCampaigns({ mine: brandView });
  const campaigns = query.data ?? [];

  if (query.isLoading) {
    return <LoadingState label="Loading campaigns" />;
  }

  if (query.isError) {
    return <ErrorMessage message={getApiErrorMessage(query.error, "Unable to load campaigns. Please try again.")} />;
  }

  if (!campaigns.length) {
    return (
      <CampaignEmptyState
        title={brandView ? "No brand campaigns yet" : "No open campaigns yet"}
        description={brandView ? "Create your first campaign draft to start building your creator brief." : "Open campaigns will appear here once brands publish them."}
        actionHref={brandView ? "/brand/campaigns/new" : undefined}
        actionLabel={brandView ? "Create campaign" : undefined}
      />
    );
  }

  return (
    <div className="grid gap-3">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          href={brandView ? `/brand/campaigns/${campaign.id}` : `/campaigns/${campaign.id}`}
          editHref={brandView ? `/brand/campaigns/${campaign.id}/edit` : undefined}
        />
      ))}
    </div>
  );
}
