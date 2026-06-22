import { isAxiosError } from "axios";

type ErrorDetail = string | string[] | Record<string, unknown>;

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
  status?: number;
}

function isApiError(error: unknown): error is ApiError {
  return Boolean(
    error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string",
  );
}

function flattenError(value: ErrorDetail): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(" ");
  }

  return Object.entries(value)
    .map(([field, detail]) => {
      if (Array.isArray(detail)) {
        return `${field}: ${detail.join(" ")}`;
      }
      if (typeof detail === "string") {
        return `${field}: ${detail}`;
      }
      return `${field}: Invalid value`;
    })
    .join(" ");
}

export function normalizeApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (!isAxiosError(error)) {
    return { message: "Something went wrong. Please try again." };
  }

  if (!error.response) {
    return {
      message: "Cannot connect to backend. Please check if the API server is running.",
      code: "NETWORK_ERROR",
    };
  }

  const status = error.response.status;
  const data = error.response.data;

  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    typeof (data as { error?: unknown }).error === "object"
  ) {
    const apiError = (data as { error: { code?: string; message?: string; details?: unknown } }).error;
    return {
      message: apiError.message || "An API error occurred.",
      code: apiError.code,
      details: apiError.details,
      status,
    };
  }

  if (typeof data === "string") {
    return { message: data, status };
  }

  if (data && typeof data === "object") {
    const detail = (data as { detail?: ErrorDetail }).detail;
    return {
      message: detail ? flattenError(detail) : flattenError(data as Record<string, unknown>),
      details: data,
      status,
    };
  }

  return { message: "An API error occurred.", status };
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = normalizeApiError(error);
  return apiError.message || fallback;
}
