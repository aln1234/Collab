import { CalendarDays, ChevronRight, Megaphone, WalletCards } from "lucide-react";
import Link from "next/link";

import { CampaignStatusBadge } from "@/features/campaigns/components/campaign-status-badge";
import {
  formatCampaignBudget,
  formatCampaignDate,
} from "@/features/campaigns/formatters";
import type { Campaign } from "@/features/campaigns/types";

export function CreatorCampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link
      href={`/creator/campaigns/${campaign.id}`}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
    >
      <article className="grid h-full grid-cols-[76px_minmax(0,1fr)_20px] items-start gap-3 rounded-2xl border border-slate-200 bg-white p-[11px] shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-950/[0.06] sm:flex sm:flex-col sm:overflow-hidden sm:p-0">
        <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-indigo-800 to-indigo-500 text-white sm:h-20 sm:w-full sm:rounded-none">
          <span className="absolute -right-7 -top-8 h-24 w-24 rounded-full bg-white/10" />
          <span className="absolute -bottom-8 -left-5 h-16 w-16 rounded-full bg-indigo-200/10" />
          <Megaphone className="relative h-8 w-8 text-white/90 sm:h-8 sm:w-8" />
        </div>

        <div className="min-w-0 sm:flex sm:w-full sm:flex-1 sm:flex-col sm:p-3.5">
          <p className="truncate text-[10px] font-black uppercase tracking-[0.12em] text-indigo-600">
            {campaign.brand.company_name}
          </p>
          <h2 className="mt-1 line-clamp-1 text-sm font-black leading-5 tracking-tight text-slate-950 transition group-hover:text-indigo-700 sm:line-clamp-2 sm:text-base sm:leading-6">
            {campaign.title}
          </h2>
          <p className="mt-1.5 line-clamp-1 text-[11px] leading-4 text-slate-500 sm:mt-2 sm:line-clamp-2 sm:text-xs sm:leading-5">
            {campaign.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:mt-3 sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-black text-emerald-600">
              <WalletCards className="h-3.5 w-3.5" />
              {formatCampaignBudget(campaign)}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-500">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
              {formatCampaignDate(campaign.deadline)}
            </span>
          </div>

          <div className="mt-2 sm:hidden">
            <CampaignStatusBadge status={campaign.status} compact />
          </div>
        </div>

        <ChevronRight className="mt-1 h-5 w-5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500 sm:hidden" />

        <div className="hidden w-full items-center justify-between border-t border-slate-100 px-3.5 py-2.5 sm:flex">
          <CampaignStatusBadge status={campaign.status} compact />
          <span className="inline-flex items-center gap-1 text-xs font-black text-indigo-600">
            View details
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
