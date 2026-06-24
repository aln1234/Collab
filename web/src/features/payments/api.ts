import { api } from "@/lib/api/client";
import { normalizePaginatedResponse } from "@/lib/api/pagination";
import type { PaymentRecord, PaymentStatusUpdate } from "@/features/payments/types";
import type { PaginatedResponse, PaymentStatus } from "@/types/marketplace";

export async function listPayments() {
  const { data } = await api.get<PaginatedResponse<PaymentRecord> | PaymentRecord[]>("/payments/");
  return normalizePaginatedResponse(data);
}

export async function updatePaymentStatus(
  paymentId: string,
  payload: { status: PaymentStatus; notes?: string },
) {
  const { data } = await api.patch<PaymentStatusUpdate>(`/payments/${paymentId}/status/`, payload);
  return data;
}
