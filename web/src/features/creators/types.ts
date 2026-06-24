export interface CreatorProfile {
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
}

export type CreatorProfilePayload = Pick<
  CreatorProfile,
  | "display_name"
  | "bio"
  | "niche"
  | "location"
  | "instagram_url"
  | "tiktok_url"
  | "youtube_url"
>;
