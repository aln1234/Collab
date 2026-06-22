import { CalendarDays, DollarSign, Pencil } from "lucide-react";
import Link from "next/link";

import { AppButton } from "@/components/ui/app-button";
import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
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
  const brandName = campaign.brand?.company_name ?? campaign.brandName ?? "Brand";
  const budget = Number(campaign.budget);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-teal-700">{brandName}</p>
          <Link href={href} className="mt-1 block text-base font-semibold leading-6 text-slate-950 hover:text-teal-800">
            {campaign.title}
          </Link>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{campaign.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-slate-400" />
          {campaign.currency} {Number.isFinite(budget) ? budget.toLocaleString() : campaign.budget}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {campaign.deadline}
        </span>
      </div>
      {editHref ? (
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
          <Link href={editHref}>
            <AppButton variant="secondary" size="sm">
              <Pencil className="h-4 w-4" />
              Edit
            </AppButton>
          </Link>
        </div>
      ) : null}
    </article>
  );
}
