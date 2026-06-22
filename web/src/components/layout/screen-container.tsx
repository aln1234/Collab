import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ScreenContainer({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <main
      className={cn(
        "mx-auto grid min-h-[calc(100vh-4rem)] w-full gap-5 px-4 pb-24 pt-4 sm:px-6 sm:pb-8",
        narrow ? "max-w-md" : "max-w-md sm:max-w-3xl lg:max-w-5xl",
        className,
      )}
    >
      {children}
    </main>
  );
}
