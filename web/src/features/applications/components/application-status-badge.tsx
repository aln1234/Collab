import { StatusBadge } from "@/components/status-badge";
import type { ApplicationStatus } from "@/types/marketplace";

export function ApplicationStatusBadge({
  status,
  compact = false,
}: {
  status: ApplicationStatus;
  compact?: boolean;
}) {
  return <StatusBadge status={status} compact={compact} />;
}
