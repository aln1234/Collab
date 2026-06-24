import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  WalletCards,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import type { CampaignApplication } from "@/features/applications/types";
import {
  formatCampaignBudget,
  formatCampaignDate,
  formatCampaignStatus,
} from "@/features/campaigns/formatters";
import type { ApplicationStatus } from "@/types/marketplace";

const statusDetails: Record<
  ApplicationStatus,
  { icon: LucideIcon; iconClassName: string; iconSurface: string }
> = {
  PENDING: {
    icon: Clock3,
    iconClassName: "text-amber-600",
    iconSurface: "bg-amber-100",
  },
  APPROVED: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-600",
    iconSurface: "bg-emerald-100",
  },
  REJECTED: {
    icon: XCircle,
    iconClassName: "text-red-600",
    iconSurface: "bg-red-100",
  },
};

export function ApplicationCard({ application }: { application: CampaignApplication }) {
  const campaign = application.campaign;
  const status = statusDetails[application.status];
  const StatusIcon = status.icon;

  return (
    <Link
      href={`/creator/campaigns/${campaign.id}`}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
    >
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-950/[0.05] sm:p-3.5">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[17px] ${status.iconSurface}`}
          >
            <StatusIcon className={`h-[22px] w-[22px] ${status.iconClassName}`} />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-black text-slate-950 transition group-hover:text-indigo-700">
              {campaign.title}
            </h2>
            <p className="mt-1 truncate text-[11px] font-medium text-slate-500">
              {campaign.brand.company_name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <ApplicationStatusBadge status={application.status} compact />
              <span className="text-[10px] font-bold capitalize text-slate-400">
                Campaign: {formatCampaignStatus(campaign.status)}
              </span>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-500 sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5 font-black text-emerald-600">
            <WalletCards className="h-3.5 w-3.5" />
            {formatCampaignBudget(campaign)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
            Due {formatCampaignDate(campaign.deadline)}
          </span>
          <span className="ml-auto text-slate-400">
            Applied {formatCampaignDate(application.created_at)}
          </span>
        </div>
      </article>
    </Link>
  );
}
