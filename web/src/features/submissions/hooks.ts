import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  listBrandSubmissions,
  listCreatorSubmissions,
  updateSubmissionStatus,
} from "@/features/submissions/api";
import type { SubmissionStatus } from "@/types/marketplace";

export const submissionKeys = {
  all: ["submissions"] as const,
  brand: () => [...submissionKeys.all, "brand"] as const,
  creator: () => [...submissionKeys.all, "creator"] as const,
};

export function useBrandSubmissions() {
  return useQuery({
    queryKey: submissionKeys.brand(),
    queryFn: listBrandSubmissions,
  });
}

export function useCreatorSubmissions() {
  return useQuery({
    queryKey: submissionKeys.creator(),
    queryFn: listCreatorSubmissions,
  });
}

export function useUpdateSubmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      status,
      brandFeedback,
    }: {
      submissionId: string;
      status: Extract<SubmissionStatus, "APPROVED" | "REVISION_REQUESTED">;
      brandFeedback?: string;
    }) =>
      updateSubmissionStatus(submissionId, {
        status,
        brand_feedback: brandFeedback,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.all });
    },
  });
}
