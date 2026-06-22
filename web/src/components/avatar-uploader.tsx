"use client";

import { ImagePlus } from "lucide-react";
import { useState } from "react";

import { AppInput } from "@/components/ui/app-input";

export function AvatarUploader({ label = "Profile image" }: { label?: string }) {
  const [fileName, setFileName] = useState("");

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <ImagePlus className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800">{fileName || "Upload an image"}</p>
          <p className="text-xs text-slate-500">Local media now, cloud storage later.</p>
        </div>
      </div>
      <AppInput
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
      />
    </label>
  );
}
