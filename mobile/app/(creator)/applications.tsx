import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrototypeTabBar } from "../../src/components/prototype/prototype-tab-bar";
import { listMyCreatorApplications } from "../../src/features/applications/api";
import type {
  ApplicationStatus,
  CampaignApplication,
} from "../../src/features/applications/types";
import { normalizeApiError } from "../../src/lib/api-client";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const statusConfig: Record<
  ApplicationStatus,
  { background: string; color: string; icon: IoniconName; label: string }
> = {
  PENDING: {
    background: "#FEF3C7",
    color: "#D97706",
    icon: "time-outline",
    label: "Pending",
  },
  APPROVED: {
    background: "#D1FAE5",
    color: "#059669",
    icon: "checkmark-circle-outline",
    label: "Approved",
  },
  REJECTED: {
    background: "#FEE2E2",
    color: "#DC2626",
    icon: "close-circle-outline",
    label: "Rejected",
  },
};

function formatCampaignStatus(status: CampaignApplication["campaign"]["status"]) {
  return status.replaceAll("_", " ");
}

function ApplicationCard({ application }: { application: CampaignApplication }) {
  const status = statusConfig[application.status];

  return (
    <View style={styles.card}>
      <View style={[styles.statusIcon, { backgroundColor: status.background }]}>
        <Ionicons color={status.color} name={status.icon} size={22} />
      </View>
      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {application.campaign.title}
        </Text>
        <Text style={styles.brand}>{application.campaign.brand.company_name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusPill, { backgroundColor: status.background }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
          <Text style={styles.campaignStatus}>
            Campaign: {formatCampaignStatus(application.campaign.status)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function MyApplicationsScreen() {
  const router = useRouter();
  const applicationsQuery = useQuery({
    queryKey: ["creator-applications"],
    queryFn: listMyCreatorApplications,
  });
  const applications = applicationsQuery.data?.results ?? [];
  const pendingShown = applications.filter((application) => application.status === "PENDING").length;
  const approvedShown = applications.filter((application) => application.status === "APPROVED").length;
  const queryError = applicationsQuery.error
    ? normalizeApiError(applicationsQuery.error).message
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            colors={["#6366F1"]}
            onRefresh={() => void applicationsQuery.refetch()}
            refreshing={applicationsQuery.isRefetching && !applicationsQuery.isLoading}
            tintColor="#6366F1"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Applications</Text>
            <Text style={styles.subtitle}>Track your campaign applications</Text>
          </View>
          <Pressable
            accessibilityLabel="Notifications"
            onPress={() => router.push("/(creator)/notifications")}
            style={styles.bell}
          >
            <Ionicons color="#334155" name="notifications-outline" size={21} />
          </Pressable>
        </View>

        {applicationsQuery.data ? (
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{applicationsQuery.data.count}</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{pendingShown}</Text>
              <Text style={styles.summaryLabel}>Pending shown</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{approvedShown}</Text>
              <Text style={styles.summaryLabel}>Approved shown</Text>
            </View>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Latest applications</Text>

        {applicationsQuery.isLoading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color="#6366F1" />
            <Text style={styles.stateText}>Loading applications…</Text>
          </View>
        ) : null}

        {queryError ? (
          <View style={styles.stateCard}>
            <Ionicons color="#DC2626" name="alert-circle-outline" size={29} />
            <Text style={styles.errorText}>{queryError}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void applicationsQuery.refetch()}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : null}

        {!applicationsQuery.isLoading && !queryError && applications.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons color="#94A3B8" name="documents-outline" size={30} />
            <Text style={styles.emptyTitle}>No applications yet</Text>
            <Text style={styles.stateText}>Browse campaigns to find your next opportunity.</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(creator)/browse-campaigns")}
              style={styles.browseButton}
            >
              <Text style={styles.browseText}>Browse Campaigns</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.list}>
          {applications.map((application) => (
            <ApplicationCard application={application} key={application.id} />
          ))}
        </View>

        {applicationsQuery.data?.next ? (
          <Text style={styles.pageNote}>
            Showing the first {applications.length} of {applicationsQuery.data.count} applications.
          </Text>
        ) : null}
      </ScrollView>
      <PrototypeTabBar activeTab="Applications" role="creator" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 28, width: "100%" },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: "#0F172A", fontSize: 27, fontWeight: "900", letterSpacing: -0.7 },
  subtitle: { color: "#64748B", fontSize: 11, marginTop: 4 },
  bell: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, height: 42, justifyContent: "center", width: 42 },
  summary: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 22, borderWidth: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 20, padding: 15 },
  summaryItem: { alignItems: "center", flex: 1 },
  summaryValue: { color: "#0F172A", fontSize: 18, fontWeight: "900", textAlign: "center" },
  summaryLabel: { color: "#64748B", fontSize: 8, marginTop: 3, textAlign: "center" },
  divider: { backgroundColor: "#E2E8F0", height: 34, width: 1 },
  sectionTitle: { color: "#0F172A", fontSize: 16, fontWeight: "900", marginBottom: 12, marginTop: 19 },
  list: { gap: 11 },
  card: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, flexDirection: "row", minHeight: 91, padding: 12 },
  statusIcon: { alignItems: "center", borderRadius: 17, height: 50, justifyContent: "center", marginRight: 11, width: 50 },
  copy: { flex: 1, minWidth: 0 },
  cardTitle: { color: "#0F172A", fontSize: 12, fontWeight: "900" },
  brand: { color: "#64748B", fontSize: 8, marginTop: 3 },
  statusRow: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 7 },
  statusPill: { borderRadius: 10, paddingHorizontal: 7, paddingVertical: 4 },
  statusText: { fontSize: 7, fontWeight: "900" },
  campaignStatus: { color: "#94A3B8", fontSize: 7, fontWeight: "700", textTransform: "capitalize" },
  stateCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, gap: 9, justifyContent: "center", minHeight: 165, padding: 22 },
  stateText: { color: "#64748B", fontSize: 11, lineHeight: 17, textAlign: "center" },
  errorText: { color: "#B91C1C", fontSize: 11, lineHeight: 17, textAlign: "center" },
  emptyTitle: { color: "#0F172A", fontSize: 15, fontWeight: "900" },
  retryButton: { backgroundColor: "#EEF2FF", borderRadius: 13, marginTop: 3, paddingHorizontal: 14, paddingVertical: 9 },
  retryText: { color: "#4F46E5", fontSize: 10, fontWeight: "900" },
  browseButton: { backgroundColor: "#6366F1", borderRadius: 13, marginTop: 4, paddingHorizontal: 15, paddingVertical: 10 },
  browseText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900" },
  pageNote: { color: "#64748B", fontSize: 9, marginTop: 14, textAlign: "center" },
});
