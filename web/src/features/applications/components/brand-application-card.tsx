import { CalendarDays, Check, MapPin, X } from "lucide-react";
import Link from "next/link";

import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import type { CampaignApplication } from "@/features/applications/types";
import { formatCampaignDate } from "@/features/campaigns/formatters";
import type { ApplicationStatus } from "@/types/marketplace";

export function BrandApplicationCard({
  application,
  isUpdating,
  onDecision,
}: {
  application: CampaignApplication;
  isUpdating: boolean;
  onDecision: (
    applicationId: string,
    status: Extract<ApplicationStatus, "APPROVED" | "REJECTED">,
  ) => void;
}) {
  const creatorName = application.creator.display_name || application.creator.email;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-700">
            {creatorName.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-black text-slate-950">{creatorName}</h2>
            <p className="truncate text-xs text-slate-500">{application.creator.email}</p>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} compact />
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Campaign</p>
        <Link
          href={`/brand/campaigns/${application.campaign.id}`}
          className="mt-1 block truncate text-sm font-bold text-slate-900 hover:text-indigo-600"
        >
          {application.campaign.title}
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatCampaignDate(application.created_at)}
        </span>
        {application.creator.location ? (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {application.creator.location}
          </span>
        ) : null}
        {application.creator.niche ? <span>{application.creator.niche}</span> : null}
      </div>

      {application.message ? (
        <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-600">{application.message}</p>
      ) : null}

      {application.status === "PENDING" ? (
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onDecision(application.id, "REJECTED")}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Reject
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onDecision(application.id, "APPROVED")}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 text-xs font-black text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            Approve
          </button>
        </div>
      ) : null}
    </article>
  );
}
