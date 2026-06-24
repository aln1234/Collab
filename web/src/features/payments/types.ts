import type { ApplicationCreator } from "@/features/applications/types";
import type { Campaign } from "@/features/campaigns/types";
import type { PaymentStatus } from "@/types/marketplace";

export interface PaymentRecord {
  id: string;
  campaign: Campaign;
  creator: ApplicationCreator;
  amount: string;
  currency: string;
  status: PaymentStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentStatusUpdate {
  id: string;
  status: PaymentStatus;
  notes: string;
  updated_at: string;
}
