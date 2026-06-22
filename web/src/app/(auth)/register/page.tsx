"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import { ErrorMessage } from "@/components/error-message";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";

const registerSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["BRAND", "CREATOR"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "", role: "CREATOR" },
  });

  async function onSubmit(values: RegisterForm) {
    setApiError(null);

    try {
      const user = await signUp(values);
      showSuccess("Account created", `Welcome to Connect, ${user.full_name || user.email}.`);
      router.replace(getDashboardForRole(user.role));
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to create account.");
      setApiError(message);
      showError("Registration failed", message);
    }
  }

  return (
    <>
      <Navbar />
      <ScreenContainer narrow className="place-content-center">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <PageHeader title="Create account" description="Start as a creator or brand. You can refine your profile next." />
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Full name
            <AppInput autoComplete="name" {...form.register("full_name")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <AppInput type="email" autoComplete="email" {...form.register("email")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <AppInput type="password" autoComplete="new-password" {...form.register("password")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Role
            <select
              className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base shadow-sm focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 sm:text-sm"
              {...form.register("role")}
            >
              <option value="CREATOR">Creator</option>
              <option value="BRAND">Brand</option>
            </select>
          </label>
          <ErrorMessage message={apiError} />
          <AppButton type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account" : "Create account"}
          </AppButton>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-teal-700">
              Sign in
            </Link>
          </p>
        </form>
      </ScreenContainer>
    </>
  );
}
