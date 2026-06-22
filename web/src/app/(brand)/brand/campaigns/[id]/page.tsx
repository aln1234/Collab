"use client";

import { ArrowLeft, CalendarDays, DollarSign, Pencil } from "lucide-react";
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

export default function BrandCampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;
  const { data: campaign, isError, isLoading, error } = useCampaign(campaignId);

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <Link href="/brand/campaigns" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Brand campaigns
        </Link>
        {isLoading ? <LoadingState label="Loading campaign" /> : null}
        {isError ? <ErrorMessage message={getApiErrorMessage(error, "Unable to load this campaign.")} /> : null}
        {campaign ? (
          <>
            <PageHeader
              title={campaign.title}
              description={campaign.description}
              actions={
                <Link href={`/brand/campaigns/${campaign.id}/edit`}>
                  <AppButton size="sm">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </AppButton>
                </Link>
              }
            />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <div className="mt-1">
                    <CampaignStatusBadge status={campaign.status} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Budget</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-950">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    {campaign.currency} {Number(campaign.budget).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Deadline</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-950">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                    {campaign.deadline}
                  </p>
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
