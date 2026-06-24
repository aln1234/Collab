import { CheckCircle2, Compass } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const productPoints = [
  "Discover and apply to live campaign briefs",
  "Track brand decisions in one workspace",
  "Keep creator profile details ready for review",
];

export function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[minmax(360px,0.8fr)_minmax(520px,1.2fr)]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/[0.06]" />
        <Link href="/login" className="relative flex w-fit items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-base font-black">Connect</span>
        </Link>

        <div className="relative max-w-md py-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-200">
            Creator marketplace
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em]">
            Partnerships, applications, and campaign work in one place.
          </h1>
          <div className="mt-7 grid gap-3">
            {productPoints.map((point) => (
              <p key={point} className="flex items-center gap-2.5 text-sm text-white/75">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                {point}
              </p>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/45">Connect creator marketplace</p>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:py-12">
        <div className="w-full max-w-md">
          <Link href="/login" className="mb-6 flex w-fit items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Compass className="h-4 w-4" />
            </span>
            <span className="text-sm font-black text-slate-950">Connect</span>
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
