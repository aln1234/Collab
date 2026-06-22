import * as React from "react";

import { cn } from "@/lib/utils";

export const AppTextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 sm:text-sm",
        className,
      )}
      {...props}
    />
  ),
);

AppTextArea.displayName = "AppTextArea";
