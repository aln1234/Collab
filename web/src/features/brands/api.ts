import { api } from "@/lib/api/client";

export async function getBrandProfile() {
  const { data } = await api.get("/brand/profile/");
  return data;
}

export async function updateBrandProfile(payload: unknown) {
  const { data } = await api.put("/brand/profile/", payload);
  return data;
}
