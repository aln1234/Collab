import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
        ghost: "text-slate-700 hover:bg-slate-100",
        danger: "bg-rose-700 text-white hover:bg-rose-800",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface AppButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function AppButton({ className, variant, size, ...props }: AppButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
