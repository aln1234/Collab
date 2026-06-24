"use client";

import { ClipboardList, Loader2, RefreshCw } from "lucide-react";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import {
  CreatorEmptyState,
  CreatorErrorState,
  CreatorLoadingCards,
} from "@/components/creator/creator-state-card";
import { ApplicationCard } from "@/features/applications/components/application-card";
import { useCreatorApplications } from "@/features/applications/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

function SummaryItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 px-2 text-center">
      <p className="text-lg font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-0.5 text-[10px] font-medium text-slate-500 sm:text-[11px]">{label}</p>
    </div>
  );
}

export default function CreatorApplicationsPage() {
  const applicationsQuery = useCreatorApplications();
  const applications = applicationsQuery.data?.results ?? [];
  const pendingShown = applications.filter((application) => application.status === "PENDING").length;
  const approvedShown = applications.filter((application) => application.status === "APPROVED").length;

  return (
    <CreatorPageShell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CreatorPageHeader
            title="My Applications"
            subtitle="Track your campaign applications"
            action={
              <button
                type="button"
                disabled={applicationsQuery.isFetching}
                onClick={() => void applicationsQuery.refetch()}
                aria-label="Refresh applications"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {applicationsQuery.isFetching && !applicationsQuery.isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </button>
            }
          />

          {applicationsQuery.data ? (
            <section className="flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm lg:w-[460px]">
              <SummaryItem value={applicationsQuery.data.count} label="Total" />
              <span className="h-8 w-px bg-slate-200" />
              <SummaryItem value={pendingShown} label="Pending shown" />
              <span className="h-8 w-px bg-slate-200" />
              <SummaryItem value={approvedShown} label="Approved shown" />
            </section>
          ) : null}
        </div>

        <h2 className="mb-3 mt-5 border-b border-slate-200 pb-3 text-base font-black tracking-tight text-slate-950">
          Latest applications
        </h2>

        {applicationsQuery.isLoading ? (
          <CreatorLoadingCards
            label="Loading applications…"
            count={2}
            className="lg:grid-cols-2"
          />
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
            description="Browse campaigns to find your next opportunity."
            actionHref="/creator/campaigns"
            actionLabel="Browse Campaigns"
          />
        ) : null}

        {applications.length ? (
          <div className="grid items-stretch gap-3 lg:grid-cols-2">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : null}

        {applicationsQuery.data?.next ? (
          <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
            Showing the first {applications.length} of {applicationsQuery.data.count} applications.
          </p>
        ) : null}
    </CreatorPageShell>
  );
}
