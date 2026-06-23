import type { Campaign } from "../campaigns/types";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ApplicationCreator = {
  id: string;
  email: string;
  display_name: string;
  bio: string;
  niche: string;
  location: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
};

export type CampaignApplication = {
  id: string;
  campaign: Campaign;
  creator: ApplicationCreator;
  message: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
};

export type ApplicationStatusUpdate = {
  id: string;
  status: ApplicationStatus;
  updated_at: string;
};
