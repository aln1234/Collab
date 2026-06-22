export type UserRole = "BRAND" | "CREATOR" | "ADMIN";

export type MarketplaceUser = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_verified: boolean;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  full_name: string;
  role: Exclude<UserRole, "ADMIN">;
};
