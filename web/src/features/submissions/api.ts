import { api } from "@/lib/api/client";
import { normalizePaginatedResponse } from "@/lib/api/pagination";
import type { ContentSubmission, SubmissionStatusUpdate } from "@/features/submissions/types";
import type { PaginatedResponse, SubmissionStatus } from "@/types/marketplace";

export async function listBrandSubmissions() {
  const { data } = await api.get<PaginatedResponse<ContentSubmission> | ContentSubmission[]>(
    "/brand/submissions/",
  );
  return normalizePaginatedResponse(data);
}

export async function listCreatorSubmissions() {
  const { data } = await api.get<PaginatedResponse<ContentSubmission> | ContentSubmission[]>(
    "/creator/submissions/",
  );
  return normalizePaginatedResponse(data);
}

export async function submitContent(campaignId: string, formData: FormData) {
  const { data } = await api.post(`/campaigns/${campaignId}/submissions/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateSubmissionStatus(
  submissionId: string,
  payload: {
    status: Extract<SubmissionStatus, "APPROVED" | "REVISION_REQUESTED">;
    brand_feedback?: string;
  },
) {
  const { data } = await api.patch<SubmissionStatusUpdate>(
    `/submissions/${submissionId}/status/`,
    payload,
  );
  return data;
}
