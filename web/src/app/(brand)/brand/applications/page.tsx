import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

const applications = [
  { creator: "Maya Chen", campaign: "Skincare drop", status: "PENDING" as const },
  { creator: "Jon Bell", campaign: "Home office setup", status: "APPROVED" as const },
  { creator: "Priya Shah", campaign: "Fitness challenge", status: "REJECTED" as const },
];

export default function BrandApplicationsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Applications" description="Approve or reject creators who applied to your campaigns." />
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {applications.map((item) => (
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
