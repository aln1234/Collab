import type { ApplicationStatus } from "@/types/marketplace";
import type { Campaign } from "@/features/campaigns/types";
import type { CreatorProfile } from "@/features/creators/types";

export type ApplicationCreator = CreatorProfile;

export interface CampaignApplication {
  id: string;
  campaign: Campaign;
  creator: ApplicationCreator;
  message: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface ApplicationStatusUpdate {
  id: string;
  status: ApplicationStatus;
  updated_at: string;
}
