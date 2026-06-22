import type { ApplicationStatus } from "@/types/marketplace";
import { cn } from "@/lib/utils";

const statusStyles: Record<ApplicationStatus, string> = {
  PENDING: "bg-amber-50 text-amber-800 ring-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  REJECTED: "bg-rose-50 text-rose-800 ring-rose-200",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
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
