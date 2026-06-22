import { api } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/marketplace";
import type { Campaign, CampaignPayload } from "@/features/campaigns/types";

interface ListCampaignsParams {
  mine?: boolean;
}

export async function listCampaigns(params: ListCampaignsParams = {}) {
  const { data } = await api.get<PaginatedResponse<Campaign> | Campaign[]>("/campaigns/", {
    params: {
      mine: params.mine ? "true" : undefined,
    },
  });
  return Array.isArray(data) ? data : data.results;
}

export async function getCampaign(id: string) {
  const { data } = await api.get<Campaign>(`/campaigns/${id}/`);
  return data;
}

export async function createCampaign(payload: CampaignPayload) {
  const { data } = await api.post<Campaign>("/campaigns/", payload);
  return data;
}

export async function updateCampaign(id: string, payload: Partial<CampaignPayload>) {
  const { data } = await api.patch<Campaign>(`/campaigns/${id}/`, payload);
  return data;
}
