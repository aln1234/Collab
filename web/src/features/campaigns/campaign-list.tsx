"use client";

import { Megaphone } from "lucide-react";

import {
  WorkspaceEmptyState,
  WorkspaceErrorState,
  WorkspaceLoadingCards,
} from "@/components/workspace/workspace-state";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { useCampaigns } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export function CampaignList({ brandView = false }: { brandView?: boolean }) {
  const query = useCampaigns({ mine: brandView });
  const campaigns = query.data?.results ?? [];

  if (query.isLoading) {
    return <WorkspaceLoadingCards label="Loading campaigns…" className="sm:grid-cols-2 xl:grid-cols-3" />;
  }

  if (query.isError) {
    return (
      <WorkspaceErrorState
        message={getApiErrorMessage(query.error, "Unable to load campaigns. Please try again.")}
        onRetry={() => void query.refetch()}
      />
    );
  }

  if (!campaigns.length) {
    return (
      <WorkspaceEmptyState
        icon={Megaphone}
        title={brandView ? "No brand campaigns yet" : "No open campaigns yet"}
        description={
          brandView
            ? "Create your first campaign brief to start receiving creator applications."
            : "Open campaigns will appear here once brands publish them."
        }
        actionHref={brandView ? "/brand/campaigns/new" : undefined}
        actionLabel={brandView ? "Create campaign" : undefined}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
