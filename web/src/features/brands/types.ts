import type { BrandProfile } from "@/types/marketplace";

export type BrandProfilePayload = Pick<
  BrandProfile,
  "company_name" | "website" | "industry" | "description"
>;
