import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

const payments = [
  { creator: "Priya Shah", campaign: "Fitness challenge", amount: "$1,600", status: "UNPAID" as const },
  { creator: "Jon Bell", campaign: "Home office setup", amount: "$850", status: "PENDING" as const },
  { creator: "Maya Chen", campaign: "Skincare drop", amount: "$1,200", status: "PAID" as const },
];

export default function BrandPaymentsPage() {
  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Payments" description="Manual payment status for approved creator content." />
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {payments.map((item) => (
            <div key={`${item.creator}-${item.campaign}`} className="grid gap-2 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center">
              <p className="font-medium text-slate-950">{item.creator}</p>
              <p className="text-sm text-slate-600">{item.campaign}</p>
              <p className="font-medium text-slate-950">{item.amount}</p>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
