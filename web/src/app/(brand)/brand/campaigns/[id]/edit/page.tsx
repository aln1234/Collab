"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import { ErrorMessage } from "@/components/error-message";
import { LoadingState } from "@/components/loading-state";
import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { CampaignForm } from "@/features/campaigns/components/campaign-form";
import { useCampaign, useUpdateCampaign } from "@/features/campaigns/hooks";
import type { CampaignPayload } from "@/features/campaigns/types";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

export default function EditBrandCampaignPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const campaignId = params.id;
  const { data: campaign, isError, isLoading, error } = useCampaign(campaignId);
  const updateCampaign = useUpdateCampaign(campaignId);
  const initialValues = useMemo(
    () =>
      campaign
        ? {
            title: campaign.title,
            description: campaign.description,
            budget: String(campaign.budget),
            currency: campaign.currency,
            status: campaign.status,
            deliverables: campaign.deliverables,
            deadline: campaign.deadline,
          }
        : undefined,
    [campaign],
  );

  async function onSubmit(values: CampaignPayload) {
    try {
      const updatedCampaign = await updateCampaign.mutateAsync(values);
      showSuccess("Campaign updated", "Your campaign changes have been saved.");
      router.push(`/brand/campaigns/${updatedCampaign.id}`);
    } catch (submitError) {
      showError("Unable to update campaign", getApiErrorMessage(submitError, "Please try again."));
    }
  }

  return (
    <WorkspacePageShell narrow>
      <Link
        href={`/brand/campaigns/${campaignId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Campaign detail
      </Link>
      <div className="mt-4">
        <WorkspacePageHeader
          title="Edit campaign"
          subtitle="Update the brief, budget, deadline, and publishing status"
        />
      </div>
      {isLoading ? <LoadingState label="Loading campaign" /> : null}
      {isError ? (
        <ErrorMessage message={getApiErrorMessage(error, "Unable to load this campaign.")} />
      ) : null}
      {campaign ? (
        <div className="mt-5">
          <CampaignForm
            initialValues={initialValues}
            submitLabel="Update campaign"
            isSubmitting={updateCampaign.isPending}
            onSubmit={onSubmit}
          />
        </div>
      ) : null}
    </WorkspacePageShell>
  );
}
