"use client";

import { ArrowLeft, CalendarDays, Megaphone, Pencil, WalletCards } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import {
  formatCampaignBudget,
  formatCampaignDate,
} from "@/features/campaigns/formatters";
import { useCampaign } from "@/features/campaigns/hooks";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import {
  WorkspaceErrorState,
  WorkspaceLoadingState,
} from "@/components/workspace/workspace-state";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function BrandCampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;
  const campaignQuery = useCampaign(campaignId);
  const campaign = campaignQuery.data;

  return (
    <WorkspacePageShell>
      <Link
        href="/brand/campaigns"
        className="mb-4 inline-flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Campaigns
      </Link>

      {campaignQuery.isLoading ? <WorkspaceLoadingState label="Loading campaign…" /> : null}
      {campaignQuery.isError ? (
        <WorkspaceErrorState
          message={getApiErrorMessage(campaignQuery.error, "Unable to load this campaign.")}
          onRetry={() => void campaignQuery.refetch()}
        />
      ) : null}

      {campaign ? (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4">
            <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Megaphone className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-indigo-600">
                      Campaign management
                    </p>
                    <CampaignStatusBadge status={campaign.status} compact />
                  </div>
                  <h1 className="mt-1.5 text-2xl font-black leading-8 tracking-tight text-slate-950 sm:text-[30px]">
                    {campaign.title}
                  </h1>
                </div>
              </div>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-black text-slate-950">Campaign brief</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                {campaign.description}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-black text-slate-950">Deliverables</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                {campaign.deliverables}
              </p>
            </section>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
            <h2 className="text-sm font-black text-slate-950">Campaign summary</h2>
            <div className="mt-3 grid gap-2.5">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <WalletCards className="h-4 w-4 text-indigo-600" />
                <div>
                  <p className="text-[10px] text-slate-400">Budget</p>
                  <p className="text-xs font-black text-slate-950">{formatCampaignBudget(campaign)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <CalendarDays className="h-4 w-4 text-indigo-600" />
                <div>
                  <p className="text-[10px] text-slate-400">Deadline</p>
                  <p className="text-xs font-black text-slate-950">{formatCampaignDate(campaign.deadline)}</p>
                </div>
              </div>
            </div>

            <Link
              href={`/brand/campaigns/${campaign.id}/edit`}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 text-xs font-black text-white transition hover:bg-indigo-700"
            >
              <Pencil className="h-4 w-4" />
              Edit campaign
            </Link>
          </aside>
        </div>
      ) : null}
    </WorkspacePageShell>
  );
}
