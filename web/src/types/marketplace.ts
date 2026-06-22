export type UserRole = "BRAND" | "CREATOR" | "ADMIN";

export type CampaignStatus = "DRAFT" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubmissionStatus = "SUBMITTED" | "REVISION_REQUESTED" | "APPROVED";
export type PaymentStatus = "UNPAID" | "PENDING" | "PAID" | "DISPUTED";

export type MarketplaceStatus = CampaignStatus | ApplicationStatus | SubmissionStatus | PaymentStatus;

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_verified: boolean;
}

export interface BrandProfile {
  id: string;
  company_name: string;
  website: string;
  industry: string;
  description: string;
  logo?: string | null;
}

export type { Campaign, CampaignPayload } from "@/features/campaigns/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  full_name: string;
  role: Exclude<UserRole, "ADMIN">;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
