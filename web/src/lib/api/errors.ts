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

export function getCampaignLoadErrorMessage(error: unknown) {
  const apiError = normalizeApiError(error);

  if (apiError.status === 404) {
    return "This campaign could not be found or is no longer available.";
  }

  return apiError.message || "We could not load this campaign. Please try again.";
}

export function getApplyErrorMessage(error: unknown) {
  const apiError = normalizeApiError(error);
  const message = apiError.message.trim();
  const normalizedMessage = message.toLowerCase();

  if (apiError.status === 401 || apiError.status === 403) {
    return "Please log in again to apply.";
  }

  if (apiError.status === 404) {
    return "This campaign could not be found.";
  }

  if (normalizedMessage.includes("already applied") || normalizedMessage.includes("duplicate")) {
    return "You have already applied to this campaign.";
  }

  if (
    normalizedMessage.includes("not open") ||
    normalizedMessage.includes("closed") ||
    normalizedMessage.includes("inactive") ||
    normalizedMessage.includes("no longer accepting")
  ) {
    return "This campaign is no longer accepting applications.";
  }

  if (apiError.code === "NETWORK_ERROR") {
    return "We could not reach the server. Check your connection and try again.";
  }

  return message || "Something went wrong while applying. Please try again.";
}
