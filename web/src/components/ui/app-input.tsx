import * as React from "react";

import { cn } from "@/lib/utils";

export const AppInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 sm:text-sm",
        className,
      )}
      {...props}
    />
  ),
);

AppInput.displayName = "AppInput";
