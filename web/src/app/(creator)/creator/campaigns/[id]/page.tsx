"use client";

import { ArrowLeft, CalendarDays, DollarSign, Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { ErrorMessage } from "@/components/error-message";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { LoadingState } from "@/components/loading-state";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { AppTextArea } from "@/components/ui/app-text-area";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import { useApplyToCampaign, useCreatorApplications } from "@/features/applications/hooks";
import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import { useCampaign } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

export default function CreatorCampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;
  const [message, setMessage] = useState("");
  const campaignQuery = useCampaign(campaignId);
  const applicationsQuery = useCreatorApplications();
  const applyMutation = useApplyToCampaign(campaignId);
  const campaign = campaignQuery.data;
  const existingApplication = applicationsQuery.data?.find((application) => application.campaign.id === campaignId);
  const canApply = campaign?.status === "OPEN" && !existingApplication;

  async function handleApply() {
    try {
      await applyMutation.mutateAsync({ message });
      setMessage("");
      showSuccess("Application sent", "The brand can now review your application.");
    } catch (error) {
      showError("Unable to apply", getApiErrorMessage(error, "Please try again."));
    }
  }

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <Link href="/creator/campaigns" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Campaigns
        </Link>
        {campaignQuery.isLoading ? <LoadingState label="Loading campaign" /> : null}
        {campaignQuery.isError ? <ErrorMessage message={getApiErrorMessage(campaignQuery.error, "Unable to load this campaign.")} /> : null}
        {campaign ? (
          <>
            <PageHeader title={campaign.title} description={campaign.description} />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Brand</p>
                  <p className="mt-1 font-semibold text-slate-950">{campaign.brand?.company_name ?? "Brand"}</p>
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
              <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <div className="mt-1">
                    <CampaignStatusBadge status={campaign.status} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Platform</p>
                  <p className="mt-1 font-semibold text-slate-950">Not specified</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Content type</p>
                  <p className="mt-1 font-semibold text-slate-950">Campaign deliverables</p>
                </div>
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <h2 className="font-semibold text-slate-950">Requirements</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{campaign.deliverables}</p>
              </div>
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-slate-950">Application</h2>
              {applicationsQuery.isLoading ? <p className="mt-2 text-sm text-slate-600">Checking your application status...</p> : null}
              {applicationsQuery.isError ? (
                <ErrorMessage message={getApiErrorMessage(applicationsQuery.error, "Unable to check your application status.")} />
              ) : null}
              {existingApplication ? (
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-md bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">You already applied</p>
                    <ApplicationStatusBadge status={existingApplication.status} />
                  </div>
                  {existingApplication.message ? (
                    <p className="text-sm leading-6 text-slate-600">{existingApplication.message}</p>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Message to brand
                    <AppTextArea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Share why you are a strong fit for this campaign."
                    />
                  </label>
                  <AppButton type="button" disabled={!canApply || applyMutation.isPending || applicationsQuery.isLoading || applicationsQuery.isError} onClick={handleApply}>
                    <Send className="h-4 w-4" />
                    {applyMutation.isPending ? "Applying" : "Apply"}
                  </AppButton>
                  {campaign.status !== "OPEN" ? (
                    <p className="text-sm text-slate-500">This campaign is not currently open for applications.</p>
                  ) : null}
                </div>
              )}
            </section>
          </>
        ) : null}
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
