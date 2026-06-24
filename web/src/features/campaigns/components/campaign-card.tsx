import { CalendarDays, ChevronRight, Pencil, WalletCards } from "lucide-react";
import Link from "next/link";

import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import {
  formatCampaignBudget,
  formatCampaignDate,
} from "@/features/campaigns/formatters";
import type { Campaign } from "@/features/campaigns/types";

export function CampaignCard({
  campaign,
  href,
  editHref,
}: {
  campaign: Campaign;
  href: string;
  editHref?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-black uppercase tracking-[0.11em] text-indigo-600">
            {campaign.brand.company_name}
          </p>
          <Link
            href={href}
            className="mt-1 line-clamp-2 block text-base font-black leading-6 text-slate-950 transition hover:text-indigo-700 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            {campaign.title}
          </Link>
        </div>
        <CampaignStatusBadge status={campaign.status} compact />
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{campaign.description}</p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
          <WalletCards className="h-3.5 w-3.5" />
          {formatCampaignBudget(campaign)}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
          <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
          {formatCampaignDate(campaign.deadline)}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:text-indigo-700"
        >
          View details
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
        {editHref ? (
          <Link
            href={editHref}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
        ) : null}
      </div>
    </article>
  );
}
