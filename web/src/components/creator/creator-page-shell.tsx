import type { ReactNode } from "react";

import { ScreenContainer } from "@/components/layout/screen-container";
import { cn } from "@/lib/utils";

export function CreatorPageShell({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <ScreenContainer
      className={cn(
        "gap-0 px-4 pb-24 pt-5 sm:px-6 sm:pb-24 lg:pb-10 lg:pt-6",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </ScreenContainer>
  );
}
