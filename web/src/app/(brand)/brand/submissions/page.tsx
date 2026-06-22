import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

const submissions = [
  { creator: "Jon Bell", campaign: "Home office setup", status: "SUBMITTED" as const },
  { creator: "Maya Chen", campaign: "Skincare drop", status: "REVISION_REQUESTED" as const },
  { creator: "Priya Shah", campaign: "Fitness challenge", status: "APPROVED" as const },
];

export default function BrandSubmissionsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Submissions" description="Approve content or request a revision from the creator." />
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {submissions.map((item) => (
            <div key={`${item.creator}-${item.campaign}`} className="grid gap-2 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
              <p className="font-medium text-slate-950">{item.creator}</p>
              <p className="text-sm text-slate-600">{item.campaign}</p>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
