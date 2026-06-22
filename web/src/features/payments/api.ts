import { api } from "@/lib/api/client";

export async function listPayments() {
  const { data } = await api.get("/payments/");
  return data;
}

export async function updatePaymentStatus(paymentId: string, payload: { status: string; notes?: string }) {
  const { data } = await api.patch(`/payments/${paymentId}/status/`, payload);
  return data;
}
