import { create, isAxiosError, type AxiosError } from "axios";

import { getAccessToken } from "./token-storage";

export type NormalizedApiError = {
  message: string;
  code?: string;
  details?: unknown;
  status?: number;
};

const fallbackBaseUrl = "http://localhost:8000/api";
const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || fallbackBaseUrl;

if (__DEV__ && !process.env.EXPO_PUBLIC_API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_BASE_URL is missing. Using http://localhost:8000/api. Android emulators often need http://10.0.2.2:8000/api.",
  );
}

export const apiClient = create({
  baseURL: configuredBaseUrl.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function extractMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  if (typeof record.detail === "string") {
    return record.detail;
  }

  if (typeof record.message === "string") {
    return record.message;
  }

  if (record.error && typeof record.error === "object") {
    const error = record.error as Record<string, unknown>;

    if (typeof error.message === "string") {
      return error.message;
    }
  }

  const firstValue = Object.values(record)[0];

  if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
    return firstValue[0];
  }

  if (typeof firstValue === "string") {
    return firstValue;
  }

  return fallback;
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (error && typeof error === "object" && "message" in error) {
    const maybeError = error as NormalizedApiError;

    if (typeof maybeError.message === "string") {
      return maybeError;
    }
  }

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      return {
        message: "Cannot connect to backend. Check your API base URL and that the server is running.",
        code: "network_error",
      };
    }

    const data = axiosError.response.data;
    const status = axiosError.response.status;
    const message = extractMessage(data, "Something went wrong. Please try again.");

    return {
      message,
      code: status === 401 ? "unauthorized" : undefined,
      details: data,
      status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Something went wrong. Please try again.",
  };
}
