"use client";

import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CreatorPageHeader } from "@/components/creator/creator-page-header";
import { CreatorPageShell } from "@/components/creator/creator-page-shell";
import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { AppTextArea } from "@/components/ui/app-text-area";
import { CreatorLoadingState } from "@/components/creator/creator-state-card";
import { getCreatorProfile, updateCreatorProfile } from "@/features/creators/api";
import type { CreatorProfilePayload } from "@/features/creators/types";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

export default function CreatorProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<CreatorProfilePayload>({
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

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const profile = await getCreatorProfile();
        if (active) {
          form.reset({
            display_name: profile.display_name,
            niche: profile.niche,
            location: profile.location,
            instagram_url: profile.instagram_url,
            tiktok_url: profile.tiktok_url,
            youtube_url: profile.youtube_url,
            bio: profile.bio,
          });
        }
      } catch (error) {
        if (active) {
          showError("Unable to load profile", getApiErrorMessage(error, "Please try again."));
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

  async function onSubmit(values: CreatorProfilePayload) {
    try {
      const profile = await updateCreatorProfile(values);
      form.reset({
        display_name: profile.display_name,
        niche: profile.niche,
        location: profile.location,
        instagram_url: profile.instagram_url,
        tiktok_url: profile.tiktok_url,
        youtube_url: profile.youtube_url,
        bio: profile.bio,
      });
      showSuccess("Profile saved");
    } catch (error) {
      showError("Unable to save profile", getApiErrorMessage(error, "Please try again."));
    }
  }

  if (isLoading) {
    return (
      <CreatorPageShell narrow>
        <CreatorLoadingState label="Loading creator profile…" />
      </CreatorPageShell>
    );
  }

  return (
    <CreatorPageShell narrow>
      <CreatorPageHeader
        title="Creator profile"
        subtitle="Keep your niche, location, and social links ready for brand review"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid items-start gap-4 lg:grid-cols-[220px_minmax(0,1fr)]"
      >
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <UserRound className="h-6 w-6" />
          </span>
          <h2 className="mt-3 text-sm font-black text-slate-950">Public creator profile</h2>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            Brands use these details to understand your niche and audience fit.
          </p>
          <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-5 text-slate-400">
            Profile image upload is not available in this web view yet.
          </p>
        </aside>

        <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Display name
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("display_name")} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              Niche
              <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("niche")} />
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              Location
              <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("location")} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              Instagram
              <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" placeholder="Profile URL" {...form.register("instagram_url")} />
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              TikTok
              <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" placeholder="Profile URL" {...form.register("tiktok_url")} />
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              YouTube
              <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" placeholder="Channel URL" {...form.register("youtube_url")} />
            </label>
          </div>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Bio
            <AppTextArea className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" {...form.register("bio")} />
          </label>
          <AppButton
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-fit rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            {form.formState.isSubmitting ? "Saving…" : "Save profile"}
          </AppButton>
        </section>
      </form>
    </CreatorPageShell>
  );
}
