import { CalendarDays, CreditCard } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { formatCampaignDate } from "@/features/campaigns/formatters";
import { formatPaymentAmount } from "@/features/payments/formatters";
import type { PaymentRecord } from "@/features/payments/types";
import type { PaymentStatus } from "@/types/marketplace";

const paymentStatuses: PaymentStatus[] = ["UNPAID", "PENDING", "PAID", "DISPUTED"];

export function PaymentRecordCard({
  payment,
  isUpdating,
  onStatusChange,
}: {
  payment: PaymentRecord;
  isUpdating: boolean;
  onStatusChange: (paymentId: string, status: PaymentStatus, notes?: string) => void;
}) {
  const creatorName = payment.creator.display_name || payment.creator.email;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CreditCard className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-black text-slate-950">{creatorName}</h2>
            <Link
              href={`/brand/campaigns/${payment.campaign.id}`}
              className="block truncate text-xs font-medium text-slate-500 hover:text-indigo-600"
            >
              {payment.campaign.title}
            </Link>
          </div>
        </div>
        <StatusBadge status={payment.status} compact />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4 rounded-xl bg-slate-50 px-3 py-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Amount</p>
          <p className="mt-1 text-xl font-black tracking-tight text-slate-950">
            {formatPaymentAmount(payment.amount, payment.currency)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatCampaignDate(payment.updated_at)}
        </span>
      </div>

      {payment.notes ? <p className="mt-3 text-xs leading-5 text-slate-600">{payment.notes}</p> : null}

      <label className="mt-4 block text-[11px] font-black text-slate-600" htmlFor={`status-${payment.id}`}>
        Payment status
      </label>
      <select
        id={`status-${payment.id}`}
        value={payment.status}
        disabled={isUpdating}
        onChange={(event) =>
          onStatusChange(payment.id, event.target.value as PaymentStatus, payment.notes)
        }
        className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
      >
        {paymentStatuses.map((status) => (
          <option key={status} value={status}>
            {status.replaceAll("_", " ").toLowerCase()}
          </option>
        ))}
      </select>
    </article>
  );
}
