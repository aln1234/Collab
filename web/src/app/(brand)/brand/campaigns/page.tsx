import { Plus } from "lucide-react";
import Link from "next/link";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { CampaignList } from "@/features/campaigns/campaign-list";

export default function BrandCampaignsPage() {
  return (
    <WorkspacePageShell>
      <WorkspacePageHeader
        title="Campaigns"
        subtitle="Draft, publish, and manage creator campaign briefs"
        action={
          <Link
            href="/brand/campaigns/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-black text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New campaign
          </Link>
        }
      />
      <div className="mt-5">
        <CampaignList brandView />
      </div>
    </WorkspacePageShell>
  );
}
