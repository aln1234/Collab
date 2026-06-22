import { api } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/marketplace";
import type { ApplyToCampaignPayload, CampaignApplication } from "@/features/applications/types";

export async function applyToCampaign(campaignId: string, payload: ApplyToCampaignPayload = {}) {
  const { data } = await api.post<CampaignApplication>(`/campaigns/${campaignId}/apply/`, payload);
  return data;
}

export async function listCreatorApplications() {
  const { data } = await api.get<PaginatedResponse<CampaignApplication> | CampaignApplication[]>("/creator/applications/");
  return Array.isArray(data) ? data : data.results;
}

export async function updateApplicationStatus(applicationId: string, status: "APPROVED" | "REJECTED") {
  const { data } = await api.patch(`/applications/${applicationId}/status/`, { status });
  return data;
}
