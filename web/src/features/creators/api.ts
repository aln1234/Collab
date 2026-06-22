import { api } from "@/lib/api/client";

export async function getCreatorProfile() {
  const { data } = await api.get("/creator/profile/");
  return data;
}

export async function updateCreatorProfile(payload: unknown) {
  const { data } = await api.put("/creator/profile/", payload);
  return data;
}
