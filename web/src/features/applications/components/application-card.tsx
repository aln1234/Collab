import { CalendarDays } from "lucide-react";
import Link from "next/link";

import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import type { CampaignApplication } from "@/features/applications/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function ApplicationCard({ application }: { application: CampaignApplication }) {
  const campaign = application.campaign;
  const brandName = campaign.brand?.company_name ?? "Brand";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-teal-700">{brandName}</p>
          <Link href={`/creator/campaigns/${campaign.id}`} className="mt-1 block text-base font-semibold leading-6 text-slate-950 hover:text-teal-800">
            {campaign.title}
          </Link>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>
      {application.message ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{application.message}</p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-500">No application message added.</p>
      )}
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500">
        <CalendarDays className="h-4 w-4 text-slate-400" />
        Applied {formatDate(application.created_at)}
      </p>
    </article>
  );
}
