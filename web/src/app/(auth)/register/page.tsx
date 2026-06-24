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
    <AuthPageShell>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.05] sm:p-6">
          <header>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">Create your account</h1>
            <p className="mt-1 text-sm text-slate-500">Join Connect as a creator or brand.</p>
          </header>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Full name
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" autoComplete="name" {...form.register("full_name")} />
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Email
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="email" autoComplete="email" {...form.register("email")} />
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Password
            <AppInput className="rounded-lg focus:border-indigo-600 focus:ring-indigo-600/15" type="password" autoComplete="new-password" {...form.register("password")} />
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">
            Role
            <select
              className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-base shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 sm:text-sm"
              {...form.register("role")}
            >
              <option value="CREATOR">Creator</option>
              <option value="BRAND">Brand</option>
            </select>
          </label>
          <ErrorMessage message={apiError} />
          <AppButton type="submit" disabled={form.formState.isSubmitting} className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            {form.formState.isSubmitting ? "Creating account" : "Create account"}
          </AppButton>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </form>
    </AuthPageShell>
  );
}
