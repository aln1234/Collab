import type { MarketplaceStatus } from "@/types/marketplace";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-700 ring-slate-200",
  OPEN: "bg-teal-50 text-teal-800 ring-teal-200",
  IN_PROGRESS: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  COMPLETED: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-800 ring-rose-200",
  PENDING: "bg-amber-50 text-amber-800 ring-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  REJECTED: "bg-rose-50 text-rose-800 ring-rose-200",
  SUBMITTED: "bg-sky-50 text-sky-800 ring-sky-200",
  REVISION_REQUESTED: "bg-orange-50 text-orange-800 ring-orange-200",
  UNPAID: "bg-slate-100 text-slate-700 ring-slate-200",
  PAID: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  DISPUTED: "bg-rose-50 text-rose-800 ring-rose-200",
};

export function StatusBadge({ status }: { status: MarketplaceStatus }) {
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
