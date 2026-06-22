import type { ApplicationStatus } from "@/types/marketplace";
import type { Campaign } from "@/features/campaigns/types";

export interface ApplicationCreator {
  id: string;
  email?: string;
  display_name: string;
  bio?: string;
  niche?: string;
  location?: string;
}

export interface CampaignApplication {
  id: string;
  campaign: Campaign;
  creator?: ApplicationCreator;
  message: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface ApplyToCampaignPayload {
  message?: string;
}
