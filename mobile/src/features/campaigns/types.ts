export type CampaignStatus =
  | "DRAFT"
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type CampaignBrand = {
  id: string;
  email: string;
  company_name: string;
  website: string;
  industry: string;
  description: string;
  logo: string | null;
  created_at: string;
  updated_at: string;
};

export type Campaign = {
  id: string;
  brand: CampaignBrand;
  title: string;
  description: string;
  budget: string;
  currency: string;
  status: CampaignStatus;
  deliverables: string;
  deadline: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
