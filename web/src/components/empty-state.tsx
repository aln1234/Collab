import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
        <Icon className="h-7 w-7" />
      </span>
      <h2 className="mt-3 text-base font-semibold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
