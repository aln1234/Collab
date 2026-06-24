"use client";

import { ClipboardList } from "lucide-react";

import {
  WorkspaceEmptyState,
  WorkspaceErrorState,
  WorkspaceLoadingCards,
} from "@/components/workspace/workspace-state";
import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { WorkspacePageShell } from "@/components/workspace/workspace-page-shell";
import { BrandApplicationCard } from "@/features/applications/components/brand-application-card";
import { useBrandApplications, useUpdateApplicationStatus } from "@/features/applications/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";
import { showError, showSuccess } from "@/lib/toast";
import type { ApplicationStatus } from "@/types/marketplace";

export default function BrandApplicationsPage() {
  const applicationsQuery = useBrandApplications();
  const decisionMutation = useUpdateApplicationStatus();

  function handleDecision(
    applicationId: string,
    status: Extract<ApplicationStatus, "APPROVED" | "REJECTED">,
  ) {
    decisionMutation.mutate(
      { applicationId, status },
      {
        onSuccess: () => showSuccess(status === "APPROVED" ? "Application approved" : "Application rejected"),
        onError: (error) =>
          showError("Unable to update application", getApiErrorMessage(error, "Please try again.")),
      },
    );
  }

  return (
    <WorkspacePageShell>
      <WorkspacePageHeader
        title="Applications"
        subtitle="Review the creators who want to work on your campaigns."
      />

      <div className="mt-6">
        {applicationsQuery.isLoading ? (
          <WorkspaceLoadingCards count={4} className="sm:grid-cols-2" label="Loading applications…" />
        ) : applicationsQuery.isError ? (
          <WorkspaceErrorState
            message={getApiErrorMessage(applicationsQuery.error, "We could not load applications.")}
            onRetry={() => void applicationsQuery.refetch()}
          />
        ) : applicationsQuery.data?.results.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {applicationsQuery.data.results.map((application) => (
              <BrandApplicationCard
                key={application.id}
                application={application}
                isUpdating={
                  decisionMutation.isPending &&
                  decisionMutation.variables?.applicationId === application.id
                }
                onDecision={handleDecision}
              />
            ))}
          </div>
        ) : (
          <WorkspaceEmptyState
            icon={ClipboardList}
            title="No applications yet"
            description="Applications will appear here when creators apply to your open campaigns."
            actionHref="/brand/campaigns"
            actionLabel="View campaigns"
          />
        )}
      </div>
    </WorkspacePageShell>
  );
}
