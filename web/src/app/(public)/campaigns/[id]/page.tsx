"use client";

import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ErrorMessage } from "@/components/error-message";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { LoadingState } from "@/components/loading-state";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import { useCampaign } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;
  const { data: campaign, isError, isLoading, error } = useCampaign(campaignId);

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Campaigns
        </Link>
        {isLoading ? <LoadingState label="Loading campaign" /> : null}
        {isError ? <ErrorMessage message={getApiErrorMessage(error, "Unable to load this campaign.")} /> : null}
        {campaign ? (
          <>
            <PageHeader
              title={campaign.title}
              description={campaign.description}
              actions={
                <Link href="/login">
                  <AppButton aria-label="Apply">
                    <Send className="h-4 w-4" />
                  </AppButton>
                </Link>
              }
            />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Brand</p>
                  <p className="mt-1 font-semibold text-slate-950">{campaign.brand?.company_name ?? "Brand"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Budget</p>
                  <p className="mt-1 font-semibold text-slate-950">
                    {campaign.currency} {Number(campaign.budget).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <div className="mt-1">
                    <CampaignStatusBadge status={campaign.status} />
                  </div>
                </div>
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <h2 className="font-semibold text-slate-950">Deliverables</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{campaign.deliverables}</p>
              </div>
            </section>
          </>
        ) : null}
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
