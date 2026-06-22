import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-700" />
      {label}
    </div>
  );
}
