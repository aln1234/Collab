import { SearchX } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { AppButton } from "@/components/ui/app-button";

export function CampaignEmptyState({
  title = "No campaigns yet",
  description = "Campaigns will appear here once they are created.",
  actionHref,
  actionLabel,
}: {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="grid gap-4">
      <EmptyState icon={SearchX} title={title} description={description} />
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="justify-self-center">
          <AppButton>{actionLabel}</AppButton>
        </Link>
      ) : null}
    </div>
  );
}
