import { api } from "@/lib/api/client";
import type { BrandProfilePayload } from "@/features/brands/types";
import type { BrandProfile } from "@/types/marketplace";

export async function getBrandProfile() {
  const { data } = await api.get<BrandProfile>("/brand/profile/");
  return data;
}

export async function updateBrandProfile(payload: BrandProfilePayload) {
  const { data } = await api.put<BrandProfile>("/brand/profile/", payload);
  return data;
}
