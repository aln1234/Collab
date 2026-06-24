"use client";

import { BadgeDollarSign, ClipboardList, FileCheck2, Megaphone, Plus } from "lucide-react";
import Link from "next/link";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import {
  WorkspaceEmptyState,
  WorkspaceErrorState,
  WorkspaceLoadingCards,
} from "@/components/workspace/workspace-state";
import { WorkspaceStatCard } from "@/components/workspace/workspace-stat-card";
import { useBrandApplications } from "@/features/applications/hooks";
import { useAuthStore } from "@/features/auth/store";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { useBrandCampaigns } from "@/features/campaigns/hooks";
import { usePayments } from "@/features/payments/hooks";
import { useBrandSubmissions } from "@/features/submissions/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function BrandDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const campaignsQuery = useBrandCampaigns();
  const applicationsQuery = useBrandApplications();
  const submissionsQuery = useBrandSubmissions();
  const paymentsQuery = usePayments();
  const campaigns = campaignsQuery.data?.results.slice(0, 3) ?? [];
  const firstName =
    user?.full_name?.split(/\s+/)[0] || user?.email?.split("@")[0] || "Brand";

  return (
    <WorkspacePageShell>
      <WorkspacePageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Manage campaigns and creator activity from one workspace"
        action={
          <Link
            href="/brand/campaigns/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-black text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New campaign
          </Link>
        }
      />

      <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceStatCard
          icon={Megaphone}
          label="Campaigns"
          value={campaignsQuery.data?.count ?? "—"}
          detail="Owned by your brand"
        />
        <WorkspaceStatCard
          icon={ClipboardList}
          label="Applications"
          value={applicationsQuery.data?.count ?? "—"}
          detail="Creator applications"
        />
        <WorkspaceStatCard
          icon={FileCheck2}
          label="Submissions"
          value={submissionsQuery.data?.count ?? "—"}
          detail="Creator content records"
        />
        <WorkspaceStatCard
          icon={BadgeDollarSign}
          label="Payment records"
          value={paymentsQuery.data?.count ?? "—"}
          detail="Manually tracked"
        />
      </section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-base font-black text-slate-950">Recent campaigns</h2>
            <Link href="/brand/campaigns" className="text-[11px] font-black text-indigo-600">
              View all
            </Link>
          </div>

          {campaignsQuery.isLoading ? (
            <WorkspaceLoadingCards label="Loading campaigns…" className="sm:grid-cols-2 xl:grid-cols-3" />
          ) : null}
          {campaignsQuery.isError ? (
            <WorkspaceErrorState
              message={getApiErrorMessage(campaignsQuery.error, "Unable to load campaigns.")}
              onRetry={() => void campaignsQuery.refetch()}
            />
          ) : null}
          {!campaignsQuery.isLoading && !campaignsQuery.isError && campaigns.length === 0 ? (
            <WorkspaceEmptyState
              icon={Megaphone}
              title="No campaigns yet"
              description="Create your first campaign brief to start receiving applications."
              actionHref="/brand/campaigns/new"
              actionLabel="Create campaign"
            />
          ) : null}
          {campaigns.length ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  href={`/brand/campaigns/${campaign.id}`}
                  editHref={`/brand/campaigns/${campaign.id}/edit`}
                />
              ))}
            </div>
          ) : null}
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-black text-slate-950">Review queue</h2>
          <div className="mt-3 divide-y divide-slate-100">
            {[
              {
                href: "/brand/applications",
                label: "Pending applications shown",
                value: applicationsQuery.data?.results.filter((item) => item.status === "PENDING").length,
              },
              {
                href: "/brand/submissions",
                label: "New submissions shown",
                value: submissionsQuery.data?.results.filter((item) => item.status === "SUBMITTED").length,
              },
              {
                href: "/brand/payments",
                label: "Unpaid records shown",
                value: paymentsQuery.data?.results.filter((item) => item.status === "UNPAID").length,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-3 py-3 text-xs font-bold text-slate-600 transition first:pt-0 last:pb-0 hover:text-indigo-600"
              >
                {item.label}
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-700">
                  {item.value ?? "—"}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </WorkspacePageShell>
  );
}
