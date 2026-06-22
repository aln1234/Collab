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
import { updateCreatorProfile } from "@/features/creators/api";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

interface CreatorProfileForm {
  display_name: string;
  niche: string;
  location: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  bio: string;
}

export default function CreatorProfilePage() {
  const form = useForm<CreatorProfileForm>({
    defaultValues: {
      display_name: "",
      niche: "",
      location: "",
      instagram_url: "",
      tiktok_url: "",
      youtube_url: "",
      bio: "",
    },
  });

  async function onSubmit(values: CreatorProfileForm) {
    try {
      await updateCreatorProfile(values);
      showSuccess("Profile saved");
    } catch (error) {
      showError("Unable to save profile", getApiErrorMessage(error, "Please try again."));
    }
  }

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Creator profile" description="Keep your niche, location, and social links ready for brand review." />
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <AvatarUploader />
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Display name
            <AppInput {...form.register("display_name")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Niche
              <AppInput {...form.register("niche")} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Location
              <AppInput {...form.register("location")} />
            </label>
          </div>
          <AppInput placeholder="Instagram URL" {...form.register("instagram_url")} />
          <AppInput placeholder="TikTok URL" {...form.register("tiktok_url")} />
          <AppInput placeholder="YouTube URL" {...form.register("youtube_url")} />
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Bio
            <AppTextArea {...form.register("bio")} />
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
