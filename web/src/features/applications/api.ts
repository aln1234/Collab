import { api } from "@/lib/api/client";
import { normalizePaginatedResponse } from "@/lib/api/pagination";
import type { PaginatedResponse } from "@/types/marketplace";
import type {
  ApplicationStatusUpdate,
  CampaignApplication,
} from "@/features/applications/types";
import type { ApplicationStatus } from "@/types/marketplace";

export async function applyToCampaign(campaignId: string) {
  const { data } = await api.post<CampaignApplication>(`/campaigns/${campaignId}/apply/`, {});
  return data;
}

export async function listCreatorApplications() {
  const { data } = await api.get<PaginatedResponse<CampaignApplication> | CampaignApplication[]>("/creator/applications/");
  return normalizePaginatedResponse(data);
}

export async function listBrandApplications(filters: {
  campaignId?: string;
  status?: ApplicationStatus;
} = {}) {
  const { data } = await api.get<PaginatedResponse<CampaignApplication> | CampaignApplication[]>(
    "/brand/applications/",
    {
      params: {
        campaign: filters.campaignId,
        status: filters.status,
      },
    },
  );
  return normalizePaginatedResponse(data);
}

export async function updateApplicationStatus(applicationId: string, status: "APPROVED" | "REJECTED") {
  const { data } = await api.patch<ApplicationStatusUpdate>(
    `/applications/${applicationId}/status/`,
    { status },
  );
  return data;
}
