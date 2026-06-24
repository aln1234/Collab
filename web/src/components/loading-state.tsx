import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-indigo-600" />
      {label}
    </div>
  );
}
