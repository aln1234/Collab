import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorMessage({
  message,
  onRetry,
}: {
  message?: string | null;
  onRetry?: () => void;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800 sm:flex-row sm:items-center"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-xl bg-white px-3 text-xs font-bold text-rose-800 ring-1 ring-rose-200 transition hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
      ) : null}
    </div>
  );
}
