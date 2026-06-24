"use client";

import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { AppTextArea } from "@/components/ui/app-text-area";
import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { WorkspaceLoadingState } from "@/components/workspace/workspace-state";
import { getBrandProfile, updateBrandProfile } from "@/features/brands/api";
import type { BrandProfilePayload } from "@/features/brands/types";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

const inputClassName = "rounded-xl focus:border-indigo-600 focus:ring-indigo-600/15";

export default function BrandProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<BrandProfilePayload>({
    defaultValues: { company_name: "", website: "", industry: "", description: "" },
  });

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const profile = await getBrandProfile();
        if (active) {
          form.reset({
            company_name: profile.company_name,
            website: profile.website,
            industry: profile.industry,
            description: profile.description,
          });
        }
      } catch (error) {
        if (active) {
          showError("Unable to load brand profile", getApiErrorMessage(error, "Please try again."));
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, [form]);

  async function onSubmit(values: BrandProfilePayload) {
    try {
      const profile = await updateBrandProfile(values);
      form.reset({
        company_name: profile.company_name,
        website: profile.website,
        industry: profile.industry,
        description: profile.description,
      });
      showSuccess("Brand profile saved");
    } catch (error) {
      showError("Unable to save brand profile", getApiErrorMessage(error, "Please try again."));
    }
  }

  if (isLoading) {
    return (
      <WorkspacePageShell narrow>
        <WorkspaceLoadingState label="Loading brand profile…" />
      </WorkspacePageShell>
    );
  }

  return (
    <WorkspacePageShell narrow>
      <WorkspacePageHeader
        title="Brand profile"
        subtitle="Keep the company details creators see alongside your campaigns up to date."
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid items-start gap-4 lg:grid-cols-[220px_minmax(0,1fr)]"
      >
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Building2 className="h-6 w-6" />
          </span>
          <h2 className="mt-3 text-sm font-black text-slate-950">Public brand identity</h2>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            Creators use these details to understand who they would be partnering with.
          </p>
          <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-5 text-slate-400">
            Logo upload is not available in this web view yet.
          </p>
        </aside>

        <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Company name
            <AppInput
              className={inputClassName}
              {...form.register("company_name", { required: "Company name is required" })}
            />
            {form.formState.errors.company_name ? (
              <span className="text-[11px] text-rose-600">{form.formState.errors.company_name.message}</span>
            ) : null}
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              Website
              <AppInput className={inputClassName} type="url" {...form.register("website")} />
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              Industry
              <AppInput className={inputClassName} {...form.register("industry")} />
            </label>
          </div>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Description
            <AppTextArea className={inputClassName} rows={5} {...form.register("description")} />
          </label>
          <AppButton type="submit" disabled={form.formState.isSubmitting} className="w-fit">
            {form.formState.isSubmitting ? "Saving…" : "Save profile"}
          </AppButton>
        </section>
      </form>
    </WorkspacePageShell>
  );
}
