"use client";

import { useRouter } from "next/navigation";

import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
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
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="New campaign" description="Start as a draft and open it when the brief is ready." />
        <CampaignForm submitLabel="Save campaign" isSubmitting={createCampaign.isPending} onSubmit={onSubmit} />
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
