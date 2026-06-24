"use client";

import { WalletCards } from "lucide-react";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import {
  WorkspaceEmptyState,
  WorkspaceErrorState,
  WorkspaceLoadingCards,
} from "@/components/workspace/workspace-state";
import { PaymentRecordCard } from "@/features/payments/components/payment-record-card";
import { usePayments, useUpdatePaymentStatus } from "@/features/payments/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";
import type { PaymentStatus } from "@/types/marketplace";

export default function BrandPaymentsPage() {
  const paymentsQuery = usePayments();
  const statusMutation = useUpdatePaymentStatus();

  function handleStatusChange(paymentId: string, status: PaymentStatus, notes?: string) {
    statusMutation.mutate(
      { paymentId, status, notes },
      {
        onSuccess: () => showSuccess("Payment status updated"),
        onError: (error) =>
          showError("Unable to update payment", getApiErrorMessage(error, "Please try again.")),
      },
    );
  }

  return (
    <WorkspacePageShell>
      <WorkspacePageHeader
        title="Payments"
        subtitle="Track the manual payment status for approved creator work."
      />

      <div className="mt-6">
        {paymentsQuery.isLoading ? (
          <WorkspaceLoadingCards count={4} className="sm:grid-cols-2" label="Loading payments…" />
        ) : paymentsQuery.isError ? (
          <WorkspaceErrorState
            message={getApiErrorMessage(paymentsQuery.error, "We could not load payments.")}
            onRetry={() => void paymentsQuery.refetch()}
          />
        ) : paymentsQuery.data?.results.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentsQuery.data.results.map((payment) => (
              <PaymentRecordCard
                key={payment.id}
                payment={payment}
                isUpdating={
                  statusMutation.isPending && statusMutation.variables?.paymentId === payment.id
                }
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <WorkspaceEmptyState
            icon={WalletCards}
            title="No payment records yet"
            description="Payment records will appear here after creator work reaches the payment stage."
          />
        )}
      </div>
    </WorkspacePageShell>
  );
}
