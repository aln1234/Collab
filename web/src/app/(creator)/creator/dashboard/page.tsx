"use client";

import { ArrowRight, ClipboardList, Compass, Megaphone, Sparkles } from "lucide-react";
import Link from "next/link";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import {
  CreatorEmptyState,
  CreatorErrorState,
  CreatorLoadingCards,
} from "@/components/creator/creator-state-card";
import { ApplicationCard } from "@/features/applications/components/application-card";
import { useCreatorApplications } from "@/features/applications/hooks";
import { useAuthStore } from "@/features/auth/store";
import { CreatorCampaignCard } from "@/features/campaigns/components/creator-campaign-card";
import { useCampaigns } from "@/features/campaigns/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

function getInitials(value: string) {
  return (
    value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "C"
  );
}

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h2 className="text-base font-black tracking-[-0.015em] text-slate-950">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-600 transition hover:text-indigo-700 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        {linkLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function CreatorDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.email || "Creator";
  const firstName =
    user?.full_name?.split(/\s+/)[0] || user?.email?.split("@")[0] || "Creator";
  const campaignsQuery = useCampaigns({ status: "OPEN" });
  const applicationsQuery = useCreatorApplications();
  const campaigns = campaignsQuery.data?.results.slice(0, 3) ?? [];
  const applications = applicationsQuery.data?.results.slice(0, 2) ?? [];

  return (
    <CreatorPageShell>
        <CreatorPageHeader
          title={`Welcome back, ${firstName}`}
          subtitle="Your creator marketplace, all in one place"
          action={
            <Link
              href="/creator/profile"
              aria-label="Open creator profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-100 to-rose-500 text-sm font-black text-white shadow-lg shadow-rose-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:hidden"
            >
              {getInitials(displayName)}
            </Link>
          }
        />

        <section className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 p-4 text-white shadow-lg shadow-indigo-950/10 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-5 sm:px-5">
          <span className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/[0.08]" />
          <div className="relative min-w-0">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Opportunity hub
            </p>
            <h2 className="mt-1.5 text-lg font-black tracking-tight sm:text-xl">
              Find your next paid partnership.
            </h2>
            <p className="mt-1 text-xs text-white/70">
              Browse live briefs and track every application from one workspace.
            </p>
          </div>

          <div className="relative mt-4 flex gap-5 border-t border-white/20 pt-3 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
            <div>
              <p className="text-[9px] font-bold text-white/60">Open</p>
              <p className="mt-0.5 text-base font-black">
                {campaignsQuery.data ? campaignsQuery.data.count : "—"}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-white/60">Applications</p>
              <p className="mt-0.5 text-base font-black">
                {applicationsQuery.data ? applicationsQuery.data.count : "—"}
              </p>
            </div>
          </div>

          <Link
            href="/creator/campaigns"
            className="relative mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white px-3 text-[11px] font-black text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-0"
          >
            <Compass className="h-3.5 w-3.5" />
            Browse
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.75fr)]">
          <section>
            <SectionHeader title="Open opportunities" href="/creator/campaigns" linkLabel="View All" />

          {campaignsQuery.isLoading ? (
            <CreatorLoadingCards
              label="Loading campaigns…"
              className="sm:grid-cols-2 xl:grid-cols-3"
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
              title="No open campaigns yet"
              description="Check back for new creator opportunities."
              actionHref="/creator/campaigns"
              actionLabel="Browse Campaigns"
            />
          ) : null}
          {campaigns.length ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {campaigns.map((campaign) => (
                <CreatorCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : null}
          </section>

          <section>
            <SectionHeader
              title="Latest applications"
              href="/creator/applications"
              linkLabel="View All"
            />

          {applicationsQuery.isLoading ? (
            <CreatorLoadingCards label="Loading applications…" count={2} />
          ) : null}
          {applicationsQuery.isError ? (
            <CreatorErrorState
              message={getApiErrorMessage(
                applicationsQuery.error,
                "We could not load your applications. Please try again.",
              )}
              onRetry={() => void applicationsQuery.refetch()}
            />
          ) : null}
          {!applicationsQuery.isLoading && !applicationsQuery.isError && applications.length === 0 ? (
            <CreatorEmptyState
              icon={ClipboardList}
              title="No applications yet"
              description="Apply to a campaign and its status will appear here."
              actionHref="/creator/campaigns"
              actionLabel="Browse Campaigns"
            />
          ) : null}
          {applications.length ? (
            <div className="grid gap-3">
              {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : null}
          </section>
        </div>
    </CreatorPageShell>
  );
}
