import {
  create,
  isAxiosError,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./token-storage";

export type NormalizedApiError = {
  message: string;
  code?: string;
  details?: unknown;
  status?: number;
};

const fallbackBaseUrl = "http://localhost:8000/api";
const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || fallbackBaseUrl;
const baseURL = configuredBaseUrl.replace(/\/$/, "");

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  access: string;
  refresh?: string;
};

let refreshPromise: Promise<string> | null = null;
let unauthorizedHandler: (() => void) | null = null;

if (__DEV__ && !process.env.EXPO_PUBLIC_API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_BASE_URL is missing. Using http://localhost:8000/api. Android emulators often need http://10.0.2.2:8000/api.",
  );
}

export const apiClient = create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

const refreshClient = create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refresh = await getRefreshToken();

      if (!refresh) {
        throw new Error("No refresh token is available.");
      }

      const response = await refreshClient.post<RefreshResponse>("/auth/token/refresh/", {
        refresh,
      });
      const nextRefresh = response.data.refresh ?? refresh;

      await setTokens(response.data.access, nextRefresh);
      return response.data.access;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401 || !error.config) {
      return Promise.reject(error);
    }

    const requestConfig = error.config as RetryableRequestConfig;
    const isLoginRequest = requestConfig.url?.includes("/auth/token/");

    if (requestConfig._retry || isLoginRequest) {
      return Promise.reject(error);
    }

    requestConfig._retry = true;

    try {
      const access = await refreshAccessToken();
      requestConfig.headers.Authorization = `Bearer ${access}`;
      return apiClient(requestConfig);
    } catch (refreshError) {
      await clearTokens();
      unauthorizedHandler?.();
      return Promise.reject(refreshError);
    }
  },
);

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

  if (error && typeof error === "object" && "message" in error) {
    const maybeError = error as NormalizedApiError;

    if (typeof maybeError.message === "string") {
      return maybeError;
    }
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
