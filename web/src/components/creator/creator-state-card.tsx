import { AlertCircle, Loader2, RefreshCw, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const stateCardClassName =
  "flex min-h-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm";

export function CreatorLoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className={stateCardClassName} aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export function CreatorLoadingCards({
  label = "Loading…",
  count = 3,
  className,
}: {
  label?: string;
  count?: number;
  className?: string;
}) {
  return (
    <div aria-live="polite">
      <p className="sr-only">{label}</p>
      <div className={cn("grid gap-3", className)}>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100" />
              <div className="min-w-0 flex-1">
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="mt-2 h-2.5 w-1/3 rounded bg-slate-100" />
              </div>
            </div>
            <div className="mt-3 h-2.5 w-full rounded bg-slate-100" />
            <div className="mt-2 h-2.5 w-4/5 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreatorErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className={stateCardClassName} role="alert">
      <AlertCircle className="h-7 w-7 text-red-600" />
      <p className="mt-3 max-w-md text-xs leading-5 text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 text-xs font-black text-indigo-600 transition hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Try Again
      </button>
    </div>
  );
}

export function CreatorEmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className={stateCardClassName}>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="mt-3 text-base font-black text-slate-950">{title}</h2>
      <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-black text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
