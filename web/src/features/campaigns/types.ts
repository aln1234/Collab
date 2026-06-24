import type { BrandProfile, CampaignStatus } from "@/types/marketplace";

export interface Campaign {
  id: string;
  brand: BrandProfile;
  title: string;
  description: string;
  budget: string;
  currency: string;
  status: CampaignStatus;
  deliverables: string;
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignPayload {
  title: string;
  description: string;
  budget: string;
  currency: string;
  status: CampaignStatus;
  deliverables: string;
  deadline: string;
}
