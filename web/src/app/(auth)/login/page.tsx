"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getDashboardForRole, useAuthStore } from "@/features/auth/store";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { ErrorMessage } from "@/components/error-message";
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
    <AuthPageShell>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.05] sm:p-6">
          <header>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to your Connect workspace.</p>
          </header>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Email
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="email" autoComplete="email" {...form.register("email")} />
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Password
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="password" autoComplete="current-password" {...form.register("password")} />
          </label>
          <ErrorMessage message={apiError} />
          <AppButton type="submit" disabled={form.formState.isSubmitting} className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            {form.formState.isSubmitting ? "Signing in" : "Sign in"}
          </AppButton>
          <p className="text-center text-sm text-slate-600">
            New to Connect?{" "}
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
              Create an account
            </Link>
          </p>
        </form>
    </AuthPageShell>
  );
}
