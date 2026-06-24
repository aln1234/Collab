"use client";

import { Loader2, Megaphone, Search, X } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import {
  CreatorEmptyState,
  CreatorErrorState,
  CreatorLoadingCards,
} from "@/components/creator/creator-state-card";
import { CreatorCampaignCard } from "@/features/campaigns/components/creator-campaign-card";
import { useCampaigns } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function CreatorCampaignsPage() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const campaignsQuery = useCampaigns({ search: deferredSearch, status: "OPEN" });
  const campaigns = campaignsQuery.data?.results ?? [];
  const campaignCount = campaignsQuery.data?.count ?? campaigns.length;

  return (
    <CreatorPageShell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CreatorPageHeader
            title="Browse Campaigns"
            subtitle="Find your next brand partnership"
          />

          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 lg:w-96">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="sr-only">Search campaigns or brands</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search campaigns or brands…"
              className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />
            {search ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </label>
        </div>

        <div className="mb-3 mt-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <h2 className="text-base font-black tracking-tight text-slate-950">Open opportunities</h2>
          {campaignsQuery.data ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-black text-indigo-600">
              {campaignsQuery.isFetching && !campaignsQuery.isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : null}
              {campaignCount} {campaignCount === 1 ? "campaign" : "campaigns"}
            </span>
          ) : null}
        </div>

        {campaignsQuery.isLoading ? (
          <CreatorLoadingCards
            label="Loading campaigns…"
            className="sm:grid-cols-2 lg:grid-cols-3"
          />
        ) : null}

        {campaignsQuery.isError ? (
          <CreatorErrorState
            message={getApiErrorMessage(
              campaignsQuery.error,
              "We could not load campaigns. Please try again.",
            )}
            onRetry={() => void campaignsQuery.refetch()}
          />
        ) : null}

        {!campaignsQuery.isLoading && !campaignsQuery.isError && campaigns.length === 0 ? (
          <CreatorEmptyState
            icon={Megaphone}
            title={search ? "No campaigns found" : "No open campaigns yet"}
            description={
              search ? "Try a different search." : "Check back for new creator opportunities."
            }
          />
        ) : null}

        {campaigns.length ? (
          <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CreatorCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : null}

        {campaignsQuery.data?.next ? (
          <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
            Showing the first {campaigns.length} of {campaignCount} campaigns.
          </p>
        ) : null}
    </CreatorPageShell>
  );
}
