import { api } from "@/lib/api/client";
import type { CreatorProfile, CreatorProfilePayload } from "@/features/creators/types";

export async function getCreatorProfile() {
  const { data } = await api.get<CreatorProfile>("/creator/profile/");
  return data;
}

export async function updateCreatorProfile(payload: CreatorProfilePayload) {
  const { data } = await api.put<CreatorProfile>("/creator/profile/", payload);
  return data;
}
