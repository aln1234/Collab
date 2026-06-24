import type { LucideIcon } from "lucide-react";

export function WorkspaceStatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-xl font-black tracking-tight text-slate-950">{value}</p>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-700">{label}</p>
      {detail ? <p className="mt-0.5 text-[10px] text-slate-400">{detail}</p> : null}
    </article>
  );
}
