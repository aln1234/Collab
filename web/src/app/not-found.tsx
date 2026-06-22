import Link from "next/link";

import { ScreenContainer } from "@/components/layout/screen-container";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <ScreenContainer narrow className="place-content-center">
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">
        <PageHeader title="Page not found" description="This screen does not exist or may have moved." />
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          Go home
        </Link>
      </div>
    </ScreenContainer>
  );
}
