"use client";

import { FileCheck2 } from "lucide-react";

import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import {
  WorkspaceEmptyState,
  WorkspaceErrorState,
  WorkspaceLoadingCards,
} from "@/components/workspace/workspace-state";
import { SubmissionReviewCard } from "@/features/submissions/components/submission-review-card";
import { useBrandSubmissions, useUpdateSubmissionStatus } from "@/features/submissions/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";
import type { SubmissionStatus } from "@/types/marketplace";

export default function BrandSubmissionsPage() {
  const submissionsQuery = useBrandSubmissions();
  const decisionMutation = useUpdateSubmissionStatus();

  function handleDecision(
    submissionId: string,
    status: Extract<SubmissionStatus, "APPROVED" | "REVISION_REQUESTED">,
    brandFeedback?: string,
  ) {
    decisionMutation.mutate(
      { submissionId, status, brandFeedback },
      {
        onSuccess: () =>
          showSuccess(status === "APPROVED" ? "Submission approved" : "Revision requested"),
        onError: (error) =>
          showError("Unable to update submission", getApiErrorMessage(error, "Please try again.")),
      },
    );
  }

  return (
    <WorkspacePageShell>
      <WorkspacePageHeader
        title="Content review"
        subtitle="Open submitted work, share feedback, and move approved content forward."
      />

      <div className="mt-6">
        {submissionsQuery.isLoading ? (
          <WorkspaceLoadingCards count={4} className="sm:grid-cols-2" label="Loading submissions…" />
        ) : submissionsQuery.isError ? (
          <WorkspaceErrorState
            message={getApiErrorMessage(submissionsQuery.error, "We could not load submissions.")}
            onRetry={() => void submissionsQuery.refetch()}
          />
        ) : submissionsQuery.data?.results.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {submissionsQuery.data.results.map((submission) => (
              <SubmissionReviewCard
                key={submission.id}
                submission={submission}
                isUpdating={
                  decisionMutation.isPending &&
                  decisionMutation.variables?.submissionId === submission.id
                }
                onDecision={handleDecision}
              />
            ))}
          </div>
        ) : (
          <WorkspaceEmptyState
            icon={FileCheck2}
            title="Nothing to review"
            description="Creator submissions will appear here when work is ready for your review."
          />
        )}
      </div>
    </WorkspacePageShell>
  );
}
