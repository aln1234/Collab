import axios from "axios";

import { siteConfig } from "@/config/site";
import { normalizeApiError } from "@/lib/api/errors";
import { tokenStorage } from "@/lib/storage/tokens";

export const api = axios.create({
  baseURL: siteConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = normalizeApiError(error);

    if (apiError.status === 401) {
      tokenStorage.clearTokens();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("connect:auth-expired"));
      }
    }
    return Promise.reject(apiError);
  },
);
