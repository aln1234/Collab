import { apiClient } from "../../lib/api-client";
import type { Campaign, PaginatedResponse } from "./types";

type CampaignListParams = {
  search?: string;
};

export async function listCampaigns(params: CampaignListParams = {}) {
  const response = await apiClient.get<PaginatedResponse<Campaign>>("/campaigns/", {
    params: {
      search: params.search?.trim() || undefined,
    },
  });

  return response.data;
}

export async function listBrandCampaigns() {
  const response = await apiClient.get<PaginatedResponse<Campaign>>("/campaigns/", {
    params: { mine: true },
  });

  return response.data;
}

export async function getCampaignDetail(campaignId: string) {
  const response = await apiClient.get<Campaign>(`/campaigns/${campaignId}/`);
  return response.data;
}
