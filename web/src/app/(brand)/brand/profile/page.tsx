"use client";

import { useForm } from "react-hook-form";

import { AvatarUploader } from "@/components/avatar-uploader";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { AppTextArea } from "@/components/ui/app-text-area";
import { updateBrandProfile } from "@/features/brands/api";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

interface BrandProfileForm {
  company_name: string;
  website: string;
  industry: string;
  description: string;
}

export default function BrandProfilePage() {
  const form = useForm<BrandProfileForm>({
    defaultValues: { company_name: "", website: "", industry: "", description: "" },
  });

  async function onSubmit(values: BrandProfileForm) {
    try {
      await updateBrandProfile(values);
      showSuccess("Brand profile saved");
    } catch (error) {
      showError("Unable to save brand profile", getApiErrorMessage(error, "Please try again."));
    }
  }

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Brand profile" description="Company details creators see when reviewing your campaigns." />
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <AvatarUploader label="Brand logo" />
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Company name
            <AppInput {...form.register("company_name", { required: true })} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Website
            <AppInput type="url" {...form.register("website")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Industry
            <AppInput {...form.register("industry")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Description
            <AppTextArea {...form.register("description")} />
          </label>
          <AppButton type="submit" disabled={form.formState.isSubmitting}>
            Save profile
          </AppButton>
        </form>
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
