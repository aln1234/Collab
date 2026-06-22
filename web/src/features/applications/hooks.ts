import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { applyToCampaign, listCreatorApplications } from "@/features/applications/api";
import type { ApplyToCampaignPayload } from "@/features/applications/types";
import { campaignKeys } from "@/features/campaigns/hooks";

export const applicationKeys = {
  all: ["applications"] as const,
  creator: () => [...applicationKeys.all, "creator"] as const,
};

export function useCreatorApplications() {
  return useQuery({
    queryKey: applicationKeys.creator(),
    queryFn: listCreatorApplications,
  });
}

export function useApplyToCampaign(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApplyToCampaignPayload) => applyToCampaign(campaignId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.creator() });
      queryClient.invalidateQueries({ queryKey: campaignKeys.detail(campaignId) });
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
    },
  });
}
