import { CreditCard } from "lucide-react";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import { CreatorEmptyState } from "@/components/creator/creator-state-card";

export default function CreatorPaymentsPage() {
  return (
    <CreatorPageShell narrow>
      <CreatorPageHeader
        title="Payments"
        subtitle="Track manually recorded payout status for approved work"
      />
      <div className="mt-5">
        <CreatorEmptyState
          icon={CreditCard}
          title="Payment history is not available yet"
          description="Verified payout records will appear here when the web payment view is connected."
        />
      </div>
    </CreatorPageShell>
  );
}
