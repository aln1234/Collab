import { api } from "@/lib/api/client";

export async function submitContent(campaignId: string, formData: FormData) {
  const { data } = await api.post(`/campaigns/${campaignId}/submissions/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateSubmissionStatus(
  submissionId: string,
  payload: { status: "APPROVED" | "REVISION_REQUESTED"; brand_feedback?: string },
) {
  const { data } = await api.patch(`/submissions/${submissionId}/status/`, payload);
  return data;
}
