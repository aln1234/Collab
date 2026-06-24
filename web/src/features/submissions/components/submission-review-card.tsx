"use client";

import { Check, ExternalLink, MessageSquareText, RotateCcw } from "lucide-react";
import { useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import { formatCampaignDate } from "@/features/campaigns/formatters";
import type { ContentSubmission } from "@/features/submissions/types";
import type { SubmissionStatus } from "@/types/marketplace";

export function SubmissionReviewCard({
  submission,
  isUpdating,
  onDecision,
}: {
  submission: ContentSubmission;
  isUpdating: boolean;
  onDecision: (
    submissionId: string,
    status: Extract<SubmissionStatus, "APPROVED" | "REVISION_REQUESTED">,
    feedback?: string,
  ) => void;
}) {
  const [feedback, setFeedback] = useState(submission.brand_feedback || "");
  const creatorName = submission.creator.display_name || submission.creator.email;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            {submission.campaign.title}
          </p>
          <h2 className="mt-1 truncate text-sm font-black text-slate-950">{creatorName}</h2>
          <p className="mt-0.5 text-xs text-slate-500">Submitted {formatCampaignDate(submission.created_at)}</p>
        </div>
        <StatusBadge status={submission.status} compact />
      </div>

      {submission.caption ? (
        <p className="mt-4 line-clamp-3 text-xs leading-5 text-slate-600">{submission.caption}</p>
      ) : null}

      {submission.file ? (
        <a
          href={submission.file}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 text-xs font-black text-slate-700 transition hover:bg-slate-200"
        >
          Open submitted file
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-800">
          No file URL was included with this submission.
        </p>
      )}

      {submission.status === "SUBMITTED" || submission.status === "REVISION_REQUESTED" ? (
        <div className="mt-auto pt-4">
          <label className="block text-[11px] font-black text-slate-600" htmlFor={`feedback-${submission.id}`}>
            Feedback for the creator
          </label>
          <div className="relative mt-1.5">
            <MessageSquareText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              id={`feedback-${submission.id}`}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              rows={2}
              placeholder="Add context if a revision is needed"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onDecision(submission.id, "REVISION_REQUESTED", feedback.trim())}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-800 disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Request revision
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onDecision(submission.id, "APPROVED", feedback.trim())}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 text-xs font-black text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              Approve
            </button>
          </div>
        </div>
      ) : submission.brand_feedback ? (
        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Feedback</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">{submission.brand_feedback}</p>
        </div>
      ) : null}
    </article>
  );
}
