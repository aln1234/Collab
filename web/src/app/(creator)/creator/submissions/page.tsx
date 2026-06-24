import { FileUp } from "lucide-react";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import { CreatorEmptyState } from "@/components/creator/creator-state-card";

export default function CreatorSubmissionsPage() {
  return (
    <CreatorPageShell narrow>
      <CreatorPageHeader
        title="Work"
        subtitle="Manage campaign content after your application is approved"
      />
      <div className="mt-5">
        <CreatorEmptyState
          icon={FileUp}
          title="Submissions are coming soon"
          description="Content submission and revision tracking are not available in this web view yet."
          actionHref="/creator/applications"
          actionLabel="View Applications"
        />
      </div>
    </CreatorPageShell>
  );
}
