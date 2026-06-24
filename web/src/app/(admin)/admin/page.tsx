"use client";

import { ExternalLink, Megaphone, ShieldCheck, UserRound, WalletCards } from "lucide-react";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { siteConfig } from "@/config/site";
import { useAuthStore } from "@/features/auth/store";

const operations = [
  { icon: UserRound, title: "Accounts and roles", description: "Manage users, roles, and verification." },
  { icon: Megaphone, title: "Marketplace records", description: "Inspect campaigns, applications, and submissions." },
  { icon: WalletCards, title: "Payment records", description: "Review payment states and disputed records." },
];

function getDjangoAdminUrl() {
  try {
    return new URL("/admin/", siteConfig.apiUrl).toString();
  } catch {
    return "http://localhost:8000/admin/";
  }
}

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.email || "Admin";

  return (
    <WorkspacePageShell narrow>
      <WorkspacePageHeader
        title={`Welcome, ${displayName}`}
        subtitle="Use the operational console for internal marketplace administration."
        action={
          <span className="inline-flex h-7 items-center rounded-full bg-indigo-50 px-2.5 text-[10px] font-black uppercase tracking-wide text-indigo-700 ring-1 ring-indigo-100">
            Admin access
          </span>
        }
      />

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-indigo-600 p-5 text-white sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-xl font-black tracking-tight">Operations continue in Django Admin</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
            The web workspace provides a clear handoff without inventing dashboard metrics that the API does not expose.
          </p>
          <a
            href={getDjangoAdminUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open Django Admin
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
          {operations.map((operation) => (
            <article key={operation.title} className="bg-white p-4">
              <operation.icon className="h-5 w-5 text-indigo-600" />
              <h3 className="mt-3 text-sm font-black text-slate-950">{operation.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{operation.description}</p>
            </article>
          ))}
        </div>
      </section>
    </WorkspacePageShell>
  );
}
