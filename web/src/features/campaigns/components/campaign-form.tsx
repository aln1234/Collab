"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { AppTextArea } from "@/components/ui/app-text-area";
import type { CampaignPayload } from "@/features/campaigns/types";

const campaignStatuses: Array<{ value: CampaignPayload["status"]; label: string }> = [
  { value: "DRAFT", label: "Draft" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const defaultValues: CampaignPayload = {
  title: "",
  budget: "",
  currency: "USD",
  status: "DRAFT",
  deadline: "",
  description: "",
  deliverables: "",
};

export function CampaignForm({
  initialValues,
  submitLabel = "Save campaign",
  isSubmitting = false,
  onSubmit,
}: {
  initialValues?: Partial<CampaignPayload>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: CampaignPayload) => Promise<void> | void;
}) {
  const form = useForm<CampaignPayload>({
    defaultValues: { ...defaultValues, ...initialValues },
  });

  useEffect(() => {
    form.reset({ ...defaultValues, ...initialValues });
  }, [form, initialValues]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
        Title
        <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("title", { required: true })} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
          Budget
          <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="number" min="0" step="0.01" {...form.register("budget", { required: true })} />
        </label>
        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
          Currency
          <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" maxLength={3} {...form.register("currency", { required: true })} />
        </label>
        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
          Status
          <select
            className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-base shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 sm:text-sm"
            {...form.register("status", { required: true })}
          >
            {campaignStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
        Deadline
        <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="date" {...form.register("deadline", { required: true })} />
      </label>
      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
        Description
        <AppTextArea className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("description", { required: true })} />
      </label>
      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
        Deliverables
        <AppTextArea className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("deliverables", { required: true })} />
      </label>
      <AppButton type="submit" disabled={isSubmitting || form.formState.isSubmitting} className="w-fit rounded-lg bg-indigo-600 hover:bg-indigo-700">
        {isSubmitting || form.formState.isSubmitting ? "Saving" : submitLabel}
      </AppButton>
    </form>
  );
}
