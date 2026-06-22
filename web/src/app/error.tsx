"use client";

import { RotateCcw } from "lucide-react";

import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";
import { AppButton } from "@/components/ui/app-button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ScreenContainer narrow className="place-content-center">
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <PageHeader title="Something went wrong" description="Refresh this screen and try again." />
        <AppButton type="button" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Try again
        </AppButton>
      </div>
    </ScreenContainer>
  );
}
