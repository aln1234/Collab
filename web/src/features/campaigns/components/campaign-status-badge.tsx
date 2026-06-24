import { StatusBadge } from "@/components/status-badge";
import type { CampaignStatus } from "@/types/marketplace";

export function CampaignStatusBadge({
  status,
  compact = false,
}: {
  status: CampaignStatus;
  compact?: boolean;
}) {
  return <StatusBadge status={status} compact={compact} />;
}
