import { FileUp } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

const submissions = [
  { campaign: "Home office setup", status: "SUBMITTED" as const },
  { campaign: "Skincare drop", status: "REVISION_REQUESTED" as const },
];

export default function CreatorSubmissionsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Submissions" description="Upload content once a brand approves your application." />
        {submissions.length ? (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {submissions.map((item) => (
              <div key={item.campaign} className="flex items-center justify-between gap-3 border-b border-slate-200 p-4 last:border-b-0">
                <p className="font-medium text-slate-950">{item.campaign}</p>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={FileUp} title="No submissions" description="Approved campaigns will accept content uploads here." />
        )}
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
