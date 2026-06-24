"use client";

import { useRouter } from "next/navigation";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { CampaignForm } from "@/features/campaigns/components/campaign-form";
import { useCreateCampaign } from "@/features/campaigns/hooks";
import type { CampaignPayload } from "@/features/campaigns/types";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

export default function NewCampaignPage() {
  const router = useRouter();
  const createCampaign = useCreateCampaign();

  async function onSubmit(values: CampaignPayload) {
    try {
      const campaign = await createCampaign.mutateAsync(values);
      showSuccess("Campaign created", "Your campaign draft has been saved.");
      router.push(`/brand/campaigns/${campaign.id}`);
    } catch (error) {
      showError("Unable to save campaign", getApiErrorMessage(error, "Please try again."));
    }
  }

  return (
    <WorkspacePageShell narrow>
      <WorkspacePageHeader
        title="New campaign"
        subtitle="Start as a draft and open it when the brief is ready"
      />
      <div className="mt-5">
        <CampaignForm submitLabel="Save campaign" isSubmitting={createCampaign.isPending} onSubmit={onSubmit} />
      </div>
    </WorkspacePageShell>
  );
}
