import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { listPayments, updatePaymentStatus } from "@/features/payments/api";
import type { PaymentStatus } from "@/types/marketplace";

export const paymentKeys = {
  all: ["payments"] as const,
  list: () => [...paymentKeys.all, "list"] as const,
};

export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.list(),
    queryFn: listPayments,
  });
}

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      status,
      notes,
    }: {
      paymentId: string;
      status: PaymentStatus;
      notes?: string;
    }) => updatePaymentStatus(paymentId, { status, notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}
