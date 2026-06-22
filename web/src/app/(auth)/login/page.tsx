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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    setApiError(null);

    try {
      const user = await signIn(values);
      showSuccess("Welcome back", `Signed in as ${user.full_name || user.email}.`);
      router.replace(getDashboardForRole(user.role));
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to sign in. Check your email and password.");
      setApiError(message);
      showError("Sign in failed", message);
    }
  }

  return (
    <>
      <Navbar />
      <ScreenContainer narrow className="place-content-center">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <PageHeader title="Sign in" description="Use your creator or brand account." />
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <AppInput type="email" autoComplete="email" {...form.register("email")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <AppInput type="password" autoComplete="current-password" {...form.register("password")} />
          </label>
          <ErrorMessage message={apiError} />
          <AppButton type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Signing in" : "Sign in"}
          </AppButton>
          <p className="text-center text-sm text-slate-600">
            New to Connect?{" "}
            <Link href="/register" className="font-medium text-teal-700">
              Create an account
            </Link>
          </p>
        </form>
      </ScreenContainer>
    </>
  );
}
