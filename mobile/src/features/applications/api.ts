import { apiClient } from "../../lib/api-client";
import type { PaginatedResponse } from "../campaigns/types";
import type {
  ApplicationStatus,
  ApplicationStatusUpdate,
  CampaignApplication,
} from "./types";

export async function applyToCampaign(campaignId: string) {
  const response = await apiClient.post<CampaignApplication>(
    `/campaigns/${campaignId}/apply/`,
    {},
  );

  return response.data;
}

export async function listMyCreatorApplications() {
  const response = await apiClient.get<PaginatedResponse<CampaignApplication>>(
    "/creator/applications/",
  );

  return response.data;
}

export async function listBrandApplications(campaignId: string) {
  const response = await apiClient.get<PaginatedResponse<CampaignApplication>>(
    "/brand/applications/",
    { params: { campaign: campaignId } },
  );

  return response.data;
}

export async function updateApplicationStatus(
  applicationId: string,
  status: Extract<ApplicationStatus, "APPROVED" | "REJECTED">,
) {
  const response = await apiClient.patch<ApplicationStatusUpdate>(
    `/applications/${applicationId}/status/`,
    { status },
  );

  return response.data;
}
