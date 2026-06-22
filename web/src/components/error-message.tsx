import { AlertCircle } from "lucide-react";

export function ErrorMessage({ message }: { message?: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="flex gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
