import type { ApplicationCreator } from "@/features/applications/types";
import type { Campaign } from "@/features/campaigns/types";
import type { SubmissionStatus } from "@/types/marketplace";

export interface ContentSubmission {
  id: string;
  campaign: Campaign;
  creator: ApplicationCreator;
  file: string;
  caption: string;
  status: SubmissionStatus;
  brand_feedback: string;
  created_at: string;
  updated_at: string;
}

export interface SubmissionStatusUpdate {
  id: string;
  status: SubmissionStatus;
  brand_feedback: string;
  updated_at: string;
}
