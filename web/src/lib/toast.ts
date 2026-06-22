"use client";

import { toast } from "sonner";

function toastOptions(description?: string) {
  return description ? { description } : undefined;
}

export function showSuccess(message: string, description?: string) {
  toast.success(message, toastOptions(description));
}

export function showError(message: string, description?: string) {
  toast.error(message, toastOptions(description));
}

export function showInfo(message: string, description?: string) {
  toast.info(message, toastOptions(description));
}

export function showWarning(message: string, description?: string) {
  toast.warning(message, toastOptions(description));
}
