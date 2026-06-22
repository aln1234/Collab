import type { CampaignStatus } from "@/types/marketplace";
import { cn } from "@/lib/utils";

const statusStyles: Record<CampaignStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-700 ring-slate-200",
  OPEN: "bg-teal-50 text-teal-800 ring-teal-200",
  IN_PROGRESS: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  COMPLETED: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-800 ring-rose-200",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium ring-1",
        statusStyles[status],
      )}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
