import type { ReactNode } from "react";

export function CreatorPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-black leading-8 tracking-[-0.025em] text-slate-950 sm:text-[26px]">
          {title}
        </h1>
        <p className="mt-0.5 text-xs font-medium leading-5 text-slate-500 sm:text-[13px]">{subtitle}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
