"use client";

import { ClipboardList } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { ErrorMessage } from "@/components/error-message";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { ScreenContainer } from "@/components/layout/screen-container";
import { LoadingState } from "@/components/loading-state";
import { PageHeader } from "@/components/page-header";
import { ApplicationCard } from "@/features/applications/components/application-card";
import { useCreatorApplications } from "@/features/applications/hooks";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function CreatorApplicationsPage() {
  const { data, isError, isLoading, error } = useCreatorApplications();
  const applications = data ?? [];

  return (
    <>
      <Navbar />
      <ScreenContainer>
        <PageHeader title="Applications" description="Track campaign applications and brand decisions." />
        {isLoading ? <LoadingState label="Loading applications" /> : null}
        {isError ? <ErrorMessage message={getApiErrorMessage(error, "Unable to load applications. Please try again.")} /> : null}
        {!isLoading && !isError && !applications.length ? (
          <EmptyState
            icon={ClipboardList}
            title="No applications yet"
            description="Apply to an open campaign and your application status will appear here."
          />
        ) : null}
        {applications.length ? (
          <div className="grid gap-3">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : null}
      </ScreenContainer>
      <MobileBottomNav />
    </>
  );
}
