import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  listBrandApplications,
  updateApplicationStatus,
} from "../../../src/features/applications/api";
import type {
  ApplicationStatus,
  CampaignApplication,
} from "../../../src/features/applications/types";
import { getCampaignDetail } from "../../../src/features/campaigns/api";
import type { Campaign } from "../../../src/features/campaigns/types";
import { normalizeApiError } from "../../../src/lib/api-client";
import { showError, showSuccess } from "../../../src/lib/toast";

type ApplicantFilter = "ALL" | "PENDING" | "REVIEWED";
type DecisionStatus = Extract<ApplicationStatus, "APPROVED" | "REJECTED">;

const statusColors: Record<ApplicationStatus, { background: string; color: string }> = {
  PENDING: { background: "#FEF3C7", color: "#D97706" },
  APPROVED: { background: "#D1FAE5", color: "#059669" },
  REJECTED: { background: "#FEE2E2", color: "#DC2626" },
};

function formatBudget(campaign: Campaign) {
  const amount = Number(campaign.budget);

  if (!Number.isFinite(amount)) return `${campaign.budget} ${campaign.currency}`;

  try {
    return new Intl.NumberFormat(undefined, {
      currency: campaign.currency,
      maximumFractionDigits: 2,
      style: "currency",
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${campaign.currency}`;
  }
}

function formatDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CR";
}

function normalizedDecisionError(error: unknown) {
  const apiError = normalizeApiError(error);

  if (apiError.status === 401) return "Your session expired. Please sign in again.";
  if (apiError.status === 403) return "You do not have permission to review this application.";
  if (apiError.status === 404) return "This campaign or application could not be found.";
  if (apiError.status && apiError.status >= 500) return "The server could not update the application. Try again.";
  return apiError.message;
}

function RequestState({
  message,
  loading = false,
  onBack,
  onRetry,
}: {
  message: string;
  loading?: boolean;
  onBack: () => void;
  onRetry?: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.topBar}>
        <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.topBarButton}>
          <Ionicons color="#334155" name="arrow-back" size={22} />
        </Pressable>
        <Text style={styles.topBarTitle}>Campaign Review</Text>
        <View style={styles.topBarButton} />
      </View>
      <View style={styles.requestState}>
        {loading ? (
          <ActivityIndicator color="#6366F1" />
        ) : (
          <Ionicons color="#DC2626" name="alert-circle-outline" size={31} />
        )}
        <Text style={[styles.requestText, !loading && styles.requestError]}>{message}</Text>
        {onRetry ? (
          <Pressable onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function ApplicantCard({
  application,
  decisionStatus,
  onApprove,
  onReject,
}: {
  application: CampaignApplication;
  decisionStatus?: DecisionStatus;
  onApprove: () => void;
  onReject: () => void;
}) {
  const statusStyle = statusColors[application.status];
  const creatorName = application.creator.display_name || application.creator.email;
  const decisionLoading = Boolean(decisionStatus);

  return (
    <View style={styles.applicantCard}>
      <View style={styles.applicantHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(creatorName)}</Text>
        </View>
        <View style={styles.applicantCopy}>
          <Text numberOfLines={1} style={styles.applicantName}>
            {creatorName}
          </Text>
          <Text numberOfLines={1} style={styles.applicantEmail}>
            {application.creator.email}
          </Text>
          <View style={styles.creatorMeta}>
            {application.creator.niche ? (
              <Text style={styles.metaText}>{application.creator.niche}</Text>
            ) : null}
            {application.creator.location ? (
              <Text style={styles.metaText}>• {application.creator.location}</Text>
            ) : null}
          </View>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusStyle.background }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {formatStatus(application.status)}
          </Text>
        </View>
      </View>

      <Text style={styles.appliedDate}>Applied {formatDate(application.created_at)}</Text>

      {application.message ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageLabel}>Creator message</Text>
          <Text style={styles.messageText}>{application.message}</Text>
        </View>
      ) : null}

      {application.status === "PENDING" ? (
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            disabled={decisionLoading}
            onPress={onReject}
            style={({ pressed }) => [
              styles.rejectButton,
              pressed && styles.rejectPressed,
              decisionLoading && styles.disabledButton,
            ]}
          >
            {decisionStatus === "REJECTED" ? (
              <ActivityIndicator color="#DC2626" size="small" />
            ) : (
              <>
                <Ionicons color="#DC2626" name="close" size={17} />
                <Text style={styles.rejectText}>Reject</Text>
              </>
            )}
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={decisionLoading}
            onPress={onApprove}
            style={({ pressed }) => [
              styles.approveButton,
              pressed && styles.approvePressed,
              decisionLoading && styles.disabledButton,
            ]}
          >
            {decisionStatus === "APPROVED" ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Ionicons color="#FFFFFF" name="checkmark" size={17} />
                <Text style={styles.approveText}>Approve</Text>
              </>
            )}
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default function BrandCampaignReviewScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [activeFilter, setActiveFilter] = useState<ApplicantFilter>("ALL");

  const campaignQuery = useQuery({
    enabled: Boolean(campaignId),
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaignDetail(campaignId as string),
  });
  const applicationsQuery = useQuery({
    enabled: Boolean(campaignId),
    queryKey: ["brand-applications", campaignId],
    queryFn: () => listBrandApplications(campaignId as string),
  });
  const decisionMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: DecisionStatus;
      creatorName: string;
    }) => updateApplicationStatus(applicationId, status),
    onSuccess: async (result, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["brand-applications", campaignId] }),
        queryClient.invalidateQueries({ queryKey: ["creator-applications"] }),
      ]);
      showSuccess(
        result.status === "APPROVED" ? "Application approved" : "Application rejected",
        variables.creatorName,
      );
    },
    onError: (error) => showError("Could not update application", normalizedDecisionError(error)),
  });

  if (!campaignId) {
    return <RequestState message="This campaign link is invalid." onBack={() => router.back()} />;
  }

  if (campaignQuery.isLoading) {
    return <RequestState loading message="Loading campaign…" onBack={() => router.back()} />;
  }

  if (campaignQuery.error || !campaignQuery.data) {
    return (
      <RequestState
        message={
          campaignQuery.error
            ? normalizedDecisionError(campaignQuery.error)
            : "Campaign not found."
        }
        onBack={() => router.back()}
        onRetry={() => void campaignQuery.refetch()}
      />
    );
  }

  const campaign = campaignQuery.data;
  const applications = applicationsQuery.data?.results ?? [];
  const filteredApplications = applications.filter((application) => {
    if (activeFilter === "PENDING") return application.status === "PENDING";
    if (activeFilter === "REVIEWED") return application.status !== "PENDING";
    return true;
  });
  const pendingShown = applications.filter((application) => application.status === "PENDING").length;
  const applicationsError = applicationsQuery.error
    ? normalizedDecisionError(applicationsQuery.error)
    : null;
  const decisionError = decisionMutation.error
    ? normalizedDecisionError(decisionMutation.error)
    : null;

  function confirmDecision(application: CampaignApplication, status: DecisionStatus) {
    const creatorName = application.creator.display_name || application.creator.email;
    const approving = status === "APPROVED";

    Alert.alert(
      approving ? "Approve application?" : "Reject application?",
      `${approving ? "Approve" : "Reject"} ${creatorName} for ${campaign.title}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: approving ? "Approve" : "Reject",
          style: approving ? "default" : "destructive",
          onPress: () =>
            decisionMutation.mutate({ applicationId: application.id, creatorName, status }),
        },
      ],
    );
  }

  const refreshing =
    (campaignQuery.isRefetching || applicationsQuery.isRefetching) &&
    !campaignQuery.isLoading &&
    !applicationsQuery.isLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.topBar}>
        <Pressable accessibilityLabel="Go back" onPress={() => router.back()} style={styles.topBarButton}>
          <Ionicons color="#334155" name="arrow-back" size={22} />
        </Pressable>
        <Text style={styles.topBarTitle}>Campaign Review</Text>
        <View style={styles.topBarButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            colors={["#6366F1"]}
            onRefresh={() => {
              void campaignQuery.refetch();
              void applicationsQuery.refetch();
            }}
            refreshing={refreshing}
            tintColor="#6366F1"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={["#FFFFFF", "#EEF2FF"]} style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.campaignStatusPill}>
              <Text style={styles.campaignStatusText}>{formatStatus(campaign.status)}</Text>
            </View>
            <Text style={styles.deadline}>Deadline {formatDate(campaign.deadline)}</Text>
          </View>
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          <Text style={styles.campaignDescription}>{campaign.description}</Text>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryLabel}>Budget</Text>
              <Text style={styles.summaryValue}>{formatBudget(campaign)}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryLabel}>Applicants</Text>
              <Text style={styles.summaryValue}>{applicationsQuery.data?.count ?? "—"}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.tabs}>
          {([
            ["ALL", `All (${applications.length})`],
            ["PENDING", `Pending (${pendingShown})`],
            ["REVIEWED", `Reviewed (${applications.length - pendingShown})`],
          ] as const).map(([value, label]) => (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeFilter === value }}
              key={value}
              onPress={() => setActiveFilter(value)}
              style={[styles.tab, activeFilter === value && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeFilter === value && styles.activeTabText]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {decisionError ? (
          <View style={styles.inlineError}>
            <Ionicons color="#B91C1C" name="alert-circle-outline" size={19} />
            <Text style={styles.inlineErrorText}>{decisionError}</Text>
          </View>
        ) : null}

        {applicationsQuery.isLoading ? (
          <View style={styles.applicationsState}>
            <ActivityIndicator color="#6366F1" />
            <Text style={styles.requestText}>Loading applicants…</Text>
          </View>
        ) : null}

        {applicationsError ? (
          <View style={styles.applicationsState}>
            <Ionicons color="#DC2626" name="alert-circle-outline" size={29} />
            <Text style={styles.requestError}>{applicationsError}</Text>
            <Pressable onPress={() => void applicationsQuery.refetch()} style={styles.retryButton}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : null}

        {!applicationsQuery.isLoading && !applicationsError && filteredApplications.length === 0 ? (
          <View style={styles.applicationsState}>
            <Ionicons color="#94A3B8" name="people-outline" size={30} />
            <Text style={styles.emptyTitle}>
              {applications.length === 0 ? "No applicants yet" : "No applications in this view"}
            </Text>
          </View>
        ) : null}

        <View style={styles.applicantList}>
          {filteredApplications.map((application) => (
            <ApplicantCard
              application={application}
              decisionStatus={
                decisionMutation.isPending &&
                decisionMutation.variables?.applicationId === application.id
                  ? decisionMutation.variables.status
                  : undefined
              }
              key={application.id}
              onApprove={() => confirmDecision(application, "APPROVED")}
              onReject={() => confirmDecision(application, "REJECTED")}
            />
          ))}
        </View>

        {applicationsQuery.data?.next ? (
          <Text style={styles.pageNote}>
            Showing the first {applications.length} of {applicationsQuery.data.count} applications.
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  topBar: { alignItems: "center", backgroundColor: "#FFFFFF", borderBottomColor: "#E2E8F0", borderBottomWidth: 1, flexDirection: "row", minHeight: 62, paddingHorizontal: 15 },
  topBarButton: { alignItems: "center", height: 40, justifyContent: "center", width: 40 },
  topBarTitle: { color: "#0F172A", flex: 1, fontSize: 16, fontWeight: "900", textAlign: "center" },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 34, width: "100%" },
  summaryCard: { borderColor: "#DDE3FF", borderRadius: 27, borderWidth: 1, padding: 19 },
  summaryTop: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  campaignStatusPill: { backgroundColor: "#E0E7FF", borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 },
  campaignStatusText: { color: "#4F46E5", fontSize: 9, fontWeight: "900", textTransform: "capitalize" },
  deadline: { color: "#64748B", fontSize: 9, fontWeight: "700" },
  campaignTitle: { color: "#0F172A", fontSize: 23, fontWeight: "900", letterSpacing: -0.5, marginTop: 14 },
  campaignDescription: { color: "#64748B", fontSize: 11, lineHeight: 17, marginTop: 7 },
  summaryDivider: { backgroundColor: "#DDE3FF", height: 1, marginVertical: 16 },
  summaryStats: { alignItems: "center", flexDirection: "row" },
  summaryStat: { flex: 1 },
  summaryLabel: { color: "#94A3B8", fontSize: 8, fontWeight: "700" },
  summaryValue: { color: "#0F172A", fontSize: 14, fontWeight: "900", marginTop: 3 },
  verticalDivider: { backgroundColor: "#DDE3FF", height: 35, marginHorizontal: 16, width: 1 },
  tabs: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 5, marginTop: 19, padding: 5 },
  tab: { alignItems: "center", borderRadius: 12, flex: 1, paddingHorizontal: 4, paddingVertical: 9 },
  activeTab: { backgroundColor: "#6366F1" },
  tabText: { color: "#64748B", fontSize: 8, fontWeight: "800", textAlign: "center" },
  activeTabText: { color: "#FFFFFF" },
  inlineError: { alignItems: "center", backgroundColor: "#FEF2F2", borderColor: "#FECACA", borderRadius: 14, borderWidth: 1, flexDirection: "row", gap: 8, marginTop: 14, padding: 11 },
  inlineErrorText: { color: "#B91C1C", flex: 1, fontSize: 10, lineHeight: 16 },
  applicantList: { gap: 12, marginTop: 15 },
  applicantCard: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 22, borderWidth: 1, padding: 14 },
  applicantHeader: { alignItems: "center", flexDirection: "row" },
  avatar: { alignItems: "center", backgroundColor: "#E0E7FF", borderRadius: 17, height: 50, justifyContent: "center", marginRight: 11, width: 50 },
  avatarText: { color: "#4F46E5", fontSize: 13, fontWeight: "900" },
  applicantCopy: { flex: 1, minWidth: 0 },
  applicantName: { color: "#0F172A", fontSize: 13, fontWeight: "900" },
  applicantEmail: { color: "#64748B", fontSize: 8, marginTop: 3 },
  creatorMeta: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 5 },
  metaText: { color: "#6366F1", fontSize: 8, fontWeight: "700" },
  statusPill: { borderRadius: 10, marginLeft: 8, paddingHorizontal: 8, paddingVertical: 5 },
  statusText: { fontSize: 7, fontWeight: "900", textTransform: "capitalize" },
  appliedDate: { color: "#94A3B8", fontSize: 8, marginTop: 11 },
  messageBox: { backgroundColor: "#F8FAFC", borderRadius: 13, marginTop: 11, padding: 11 },
  messageLabel: { color: "#64748B", fontSize: 8, fontWeight: "900", marginBottom: 4 },
  messageText: { color: "#334155", fontSize: 10, lineHeight: 16 },
  actionRow: { flexDirection: "row", gap: 9, marginTop: 13 },
  rejectButton: { alignItems: "center", backgroundColor: "#FFF1F2", borderColor: "#FECACA", borderRadius: 14, borderWidth: 1, flex: 1, flexDirection: "row", gap: 5, justifyContent: "center", minHeight: 43 },
  rejectPressed: { backgroundColor: "#FFE4E6" },
  rejectText: { color: "#DC2626", fontSize: 10, fontWeight: "900" },
  approveButton: { alignItems: "center", backgroundColor: "#10B981", borderRadius: 14, flex: 1, flexDirection: "row", gap: 5, justifyContent: "center", minHeight: 43 },
  approvePressed: { backgroundColor: "#059669" },
  approveText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900" },
  disabledButton: { opacity: 0.6 },
  applicationsState: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 20, borderWidth: 1, gap: 9, justifyContent: "center", marginTop: 15, minHeight: 150, padding: 20 },
  emptyTitle: { color: "#0F172A", fontSize: 14, fontWeight: "900", textAlign: "center" },
  requestState: { alignItems: "center", flex: 1, gap: 10, justifyContent: "center", padding: 24 },
  requestText: { color: "#64748B", fontSize: 11, textAlign: "center" },
  requestError: { color: "#B91C1C", fontSize: 11, lineHeight: 17, textAlign: "center" },
  retryButton: { backgroundColor: "#EEF2FF", borderRadius: 13, marginTop: 3, paddingHorizontal: 14, paddingVertical: 9 },
  retryText: { color: "#4F46E5", fontSize: 10, fontWeight: "900" },
  pageNote: { color: "#64748B", fontSize: 9, marginTop: 14, textAlign: "center" },
});
