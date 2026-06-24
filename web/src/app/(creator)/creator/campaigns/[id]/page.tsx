"use client";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Flag,
  Loader2,
  Megaphone,
  Send,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import {
  CreatorErrorState,
  CreatorLoadingState,
} from "@/components/creator/creator-state-card";
import { ErrorMessage } from "@/components/error-message";
import { AppButton } from "@/components/ui/app-button";
import { useApplyToCampaign } from "@/features/applications/hooks";
import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import {
  formatCampaignBudget,
  formatCampaignDate,
  formatCampaignStatus,
} from "@/features/campaigns/formatters";
import { useCampaign } from "@/features/campaigns/hooks";
import { getApplyErrorMessage, getCampaignLoadErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-xs font-black capitalize text-slate-950">{value}</p>
      </div>
    </div>
  );
}

export default function CreatorCampaignDetailPage() {
  const params = useParams<{ id: string | string[] }>();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const campaignQuery = useCampaign(campaignId ?? "");
  const applyMutation = useApplyToCampaign(campaignId ?? "");
  const campaign = campaignQuery.data;
  const applicationSubmitted = applyMutation.isSuccess;
  const canApply = campaign?.status === "OPEN" && !applicationSubmitted;

  async function handleApply() {
    try {
      const application = await applyMutation.mutateAsync();
      showSuccess("Application sent", application.campaign.title);
    } catch (error) {
      showError("Could not apply", getApplyErrorMessage(error));
    }
  }

  return (
    <CreatorPageShell>
        <Link
          href="/creator/campaigns"
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg text-xs font-bold text-slate-500 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Campaigns
        </Link>

        {campaignQuery.isLoading ? <CreatorLoadingState label="Loading campaign…" /> : null}

        {campaignQuery.isError ? (
          <CreatorErrorState
            message={getCampaignLoadErrorMessage(campaignQuery.error)}
            onRetry={() => void campaignQuery.refetch()}
          />
        ) : null}

        {campaign ? (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
            <div className="grid gap-4">
              <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-indigo-800 to-indigo-500 text-white">
                    <span className="absolute -right-4 -top-5 h-12 w-12 rounded-full bg-white/10" />
                    <Megaphone className="relative h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-indigo-600">
                        {campaign.brand.company_name}
                      </p>
                      <CampaignStatusBadge status={campaign.status} compact />
                    </div>
                    <h1 className="mt-1.5 text-2xl font-black leading-8 tracking-[-0.025em] text-slate-950 sm:text-[30px] sm:leading-9">
                      {campaign.title}
                    </h1>
                  </div>
                </div>
              </header>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-base font-black text-slate-950">Campaign brief</h2>
                <p className="mt-2.5 whitespace-pre-line text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
                  {campaign.description}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-base font-black text-slate-950">Deliverables</h2>
                <p className="mt-2.5 whitespace-pre-line text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
                  {campaign.deliverables}
                </p>
              </section>

              {campaign.brand.description ? (
                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Building2 className="h-[18px] w-[18px]" />
                    </span>
                    <h2 className="text-base font-black text-slate-950">About the Brand</h2>
                  </div>
                  <p className="mt-2.5 whitespace-pre-line text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
                    {campaign.brand.description}
                  </p>
                </section>
              ) : null}
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Building2 className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-950">
                    {campaign.brand.company_name}
                  </p>
                  {campaign.brand.industry ? (
                    <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500">
                      {campaign.brand.industry}
                    </p>
                  ) : null}
                </div>
              </div>
              <h2 className="mt-3 text-sm font-black text-slate-950">Campaign details</h2>
              <div className="mt-3 grid gap-2.5">
                <SummaryRow
                  icon={WalletCards}
                  label="Campaign budget"
                  value={formatCampaignBudget(campaign)}
                />
                <SummaryRow
                  icon={CalendarDays}
                  label="Deadline"
                  value={formatCampaignDate(campaign.deadline)}
                />
                <SummaryRow
                  icon={Flag}
                  label="Status"
                  value={formatCampaignStatus(campaign.status)}
                />
              </div>

              {applicationSubmitted ? (
                <div className="mt-4 flex gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-700">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                  Your application was sent successfully.
                </div>
              ) : null}

              {applyMutation.isError ? (
                <div className="mt-4">
                  <ErrorMessage message={getApplyErrorMessage(applyMutation.error)} />
                </div>
              ) : null}

              <AppButton
                type="button"
                size="lg"
                disabled={!canApply || applyMutation.isPending}
                onClick={() => void handleApply()}
                className="mt-4 min-h-11 w-full rounded-xl bg-indigo-600 text-xs font-black hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {applyMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : applicationSubmitted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {applyMutation.isPending
                  ? "Applying…"
                  : applicationSubmitted
                    ? "Application sent"
                    : campaign.status === "OPEN"
                      ? "Apply to Campaign"
                      : "Campaign closed"}
              </AppButton>

              {campaign.status !== "OPEN" ? (
                <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                  This campaign is no longer accepting applications.
                </p>
              ) : null}
            </aside>
          </div>
        ) : null}
    </CreatorPageShell>
  );
}
