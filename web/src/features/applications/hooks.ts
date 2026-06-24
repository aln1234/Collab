import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  applyToCampaign,
  listBrandApplications,
  listCreatorApplications,
  updateApplicationStatus,
} from "@/features/applications/api";
import type { ApplicationStatus } from "@/types/marketplace";
import { campaignKeys } from "@/features/campaigns/hooks";

export const applicationKeys = {
  all: ["applications"] as const,
  creator: () => [...applicationKeys.all, "creator"] as const,
  brand: (filters: { campaignId?: string; status?: ApplicationStatus } = {}) =>
    [...applicationKeys.all, "brand", filters] as const,
};

export function useCreatorApplications() {
  return useQuery({
    queryKey: applicationKeys.creator(),
    queryFn: listCreatorApplications,
  });
}

export function useBrandApplications(
  filters: { campaignId?: string; status?: ApplicationStatus } = {},
) {
  return useQuery({
    queryKey: applicationKeys.brand(filters),
    queryFn: () => listBrandApplications(filters),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: Extract<ApplicationStatus, "APPROVED" | "REJECTED">;
    }) => updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all });
    },
  });
}

export function useApplyToCampaign(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => applyToCampaign(campaignId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.creator() });
      queryClient.invalidateQueries({ queryKey: campaignKeys.detail(campaignId) });
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
    },
  });
}
