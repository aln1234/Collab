import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCampaign, getCampaign, listCampaigns, updateCampaign } from "@/features/campaigns/api";
import type { ListCampaignsParams } from "@/features/campaigns/api";
import type { CampaignPayload } from "@/features/campaigns/types";

export const campaignKeys = {
  all: ["campaigns"] as const,
  lists: () => [...campaignKeys.all, "list"] as const,
  list: (filters: ListCampaignsParams = {}) => [...campaignKeys.lists(), filters] as const,
  detail: (id: string) => [...campaignKeys.all, "detail", id] as const,
};

export function useCampaigns(filters: ListCampaignsParams = {}) {
  return useQuery({
    queryKey: campaignKeys.list(filters),
    queryFn: () => listCampaigns(filters),
  });
}

export function useBrandCampaigns() {
  return useCampaigns({ mine: true });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: () => getCampaign(id),
    enabled: Boolean(id),
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CampaignPayload) => createCampaign(payload),
    onSuccess: (campaign) => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    },
  });
}

export function useUpdateCampaign(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CampaignPayload>) => updateCampaign(id, payload),
    onSuccess: (campaign) => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
    },
  });
}
