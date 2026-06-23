import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { applyToCampaign } from "../../../src/features/applications/api";
import { getCampaignDetail } from "../../../src/features/campaigns/api";
import type { Campaign } from "../../../src/features/campaigns/types";
import { normalizeApiError } from "../../../src/lib/api-client";
import { showError, showSuccess } from "../../../src/lib/toast";

type InfoIcon = "wallet-outline" | "calendar-outline" | "flag-outline";

function formatBudget(campaign: Campaign) {
  const amount = Number(campaign.budget);

  if (!Number.isFinite(amount)) {
    return `${campaign.budget} ${campaign.currency}`;
  }

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
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: Campaign["status"]) {
  return status.replaceAll("_", " ");
}

function InfoCard({ icon, label, value }: { icon: InfoIcon; label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons color="#6366F1" name={icon} size={19} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text numberOfLines={2} style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
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
      <View style={styles.stateHeader}>
        <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.stateBack}>
          <Ionicons color="#334155" name="arrow-back" size={22} />
        </Pressable>
        <Text style={styles.stateHeaderTitle}>Campaign Details</Text>
        <View style={styles.stateBack} />
      </View>
      <View style={styles.stateContainer}>
        {loading ? (
          <ActivityIndicator color="#6366F1" />
        ) : (
          <Ionicons color="#DC2626" name="alert-circle-outline" size={31} />
        )}
        <Text style={[styles.stateText, !loading && styles.stateError]}>{message}</Text>
        {onRetry ? (
          <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default function CreatorCampaignDetailScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const campaignId = Array.isArray(params.id) ? params.id[0] : params.id;
  const campaignQuery = useQuery({
    enabled: Boolean(campaignId),
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaignDetail(campaignId as string),
  });
  const applicationMutation = useMutation({
    mutationFn: () => applyToCampaign(campaignId as string),
    onSuccess: (application) => {
      void queryClient.invalidateQueries({ queryKey: ["creator-applications"] });
      showSuccess("Application sent", application.campaign.title);
    },
    onError: (error) => {
      const apiError = normalizeApiError(error);
      const message =
        apiError.status === 401
          ? "Your session expired. Please sign in again."
          : apiError.message;

      showError("Could not apply", message);
    },
  });

  if (!campaignId) {
    return <RequestState message="This campaign link is invalid." onBack={() => router.back()} />;
  }

  if (campaignQuery.isLoading) {
    return (
      <RequestState
        loading
        message="Loading campaign…"
        onBack={() => router.back()}
      />
    );
  }

  if (campaignQuery.error || !campaignQuery.data) {
    const message = campaignQuery.error
      ? normalizeApiError(campaignQuery.error).message
      : "Campaign not found.";

    return (
      <RequestState
        message={message}
        onBack={() => router.back()}
        onRetry={() => void campaignQuery.refetch()}
      />
    );
  }

  const campaign = campaignQuery.data;
  const applyError = applicationMutation.error
    ? normalizeApiError(applicationMutation.error)
    : null;
  const applyErrorMessage =
    applyError?.status === 401
      ? "Your session expired. Please sign in again."
      : applyError?.message;
  const applicationSubmitted = Boolean(applicationMutation.data);
  const canApply = campaign.status === "OPEN" && !applicationSubmitted;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#0F172A", "#4338CA", "#6366F1"]} style={styles.hero}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.back}
          >
            <Ionicons color="#FFFFFF" name="arrow-back" size={22} />
          </Pressable>
          <View style={styles.heroOrb} />
          <Ionicons color="rgba(255,255,255,0.2)" name="megaphone-outline" size={94} />
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{formatStatus(campaign.status)}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.brand}>{campaign.brand.company_name}</Text>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.subtitle}>{campaign.description}</Text>

          <View style={styles.infoRow}>
            <InfoCard icon="wallet-outline" label="Budget" value={formatBudget(campaign)} />
            <InfoCard icon="calendar-outline" label="Deadline" value={formatDate(campaign.deadline)} />
            <InfoCard icon="flag-outline" label="Status" value={formatStatus(campaign.status)} />
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Deliverables</Text>
            <Text style={styles.sectionText}>{campaign.deliverables}</Text>
          </View>

          {campaign.brand.description ? (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>About the Brand</Text>
              <Text style={styles.sectionText}>{campaign.brand.description}</Text>
            </View>
          ) : null}

          {applicationSubmitted ? (
            <View style={styles.applicationSuccess}>
              <Ionicons color="#059669" name="checkmark-circle" size={20} />
              <Text style={styles.applicationSuccessText}>
                Your application was sent successfully.
              </Text>
            </View>
          ) : null}

          {applyErrorMessage ? (
            <View style={styles.applicationError}>
              <Ionicons color="#B91C1C" name="alert-circle-outline" size={20} />
              <Text style={styles.applicationErrorText}>{applyErrorMessage}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.bottomCopy}>
          <Text style={styles.bottomLabel}>Campaign budget</Text>
          <Text style={styles.bottomValue}>{formatBudget(campaign)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canApply || applicationMutation.isPending }}
          disabled={!canApply || applicationMutation.isPending}
          onPress={() => applicationMutation.mutate()}
          style={({ pressed }) => [
            styles.applyButton,
            pressed && styles.applyButtonPressed,
            (!canApply || applicationMutation.isPending) && styles.applyDisabled,
          ]}
        >
          {applicationMutation.isPending ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.applyButtonText}>
              {applicationSubmitted
                ? "Application sent"
                : campaign.status === "OPEN"
                  ? "Apply to Campaign"
                  : "Campaign closed"}
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  scrollContent: { paddingBottom: 25 },
  hero: { alignItems: "center", height: 235, justifyContent: "center", overflow: "hidden" },
  back: { alignItems: "center", backgroundColor: "rgba(15,23,42,0.35)", borderRadius: 19, height: 42, justifyContent: "center", left: 18, position: "absolute", top: 16, width: 42 },
  heroOrb: { backgroundColor: "rgba(255,255,255,0.09)", borderRadius: 100, height: 200, position: "absolute", right: -50, top: -55, width: 200 },
  statusPill: { alignItems: "center", backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 13, bottom: 18, flexDirection: "row", gap: 6, paddingHorizontal: 10, paddingVertical: 7, position: "absolute", right: 18 },
  statusDot: { backgroundColor: "#86EFAC", borderRadius: 4, height: 7, width: 7 },
  statusText: { color: "#FFFFFF", fontSize: 8, fontWeight: "900", textTransform: "capitalize" },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, width: "100%" },
  brand: { color: "#6366F1", fontSize: 9, fontWeight: "900", letterSpacing: 1, textTransform: "uppercase" },
  title: { color: "#0F172A", fontSize: 27, fontWeight: "900", letterSpacing: -0.7, marginTop: 5 },
  subtitle: { color: "#64748B", fontSize: 12, lineHeight: 19, marginTop: 8 },
  infoRow: { flexDirection: "row", gap: 9, marginTop: 20 },
  infoCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, flex: 1, minWidth: 0, padding: 11 },
  infoIcon: { alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 12, height: 32, justifyContent: "center", width: 32 },
  infoLabel: { color: "#94A3B8", fontSize: 7, fontWeight: "700", marginTop: 7 },
  infoValue: { color: "#0F172A", fontSize: 9, fontWeight: "900", marginTop: 2, textAlign: "center", textTransform: "capitalize" },
  sectionCard: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 23, borderWidth: 1, marginTop: 17, padding: 16 },
  sectionTitle: { color: "#0F172A", fontSize: 16, fontWeight: "900", marginBottom: 10 },
  sectionText: { color: "#475569", fontSize: 11, lineHeight: 18 },
  applicationSuccess: { alignItems: "center", backgroundColor: "#ECFDF5", borderColor: "#A7F3D0", borderRadius: 16, borderWidth: 1, flexDirection: "row", gap: 9, marginTop: 17, padding: 13 },
  applicationSuccessText: { color: "#047857", flex: 1, fontSize: 11, fontWeight: "700", lineHeight: 17 },
  applicationError: { alignItems: "center", backgroundColor: "#FEF2F2", borderColor: "#FECACA", borderRadius: 16, borderWidth: 1, flexDirection: "row", gap: 9, marginTop: 17, padding: 13 },
  applicationErrorText: { color: "#B91C1C", flex: 1, fontSize: 11, lineHeight: 17 },
  bottom: { alignItems: "center", backgroundColor: "#FFFFFF", borderTopColor: "#E2E8F0", borderTopWidth: 1, flexDirection: "row", gap: 12, justifyContent: "space-between", minHeight: 80, paddingHorizontal: 20 },
  bottomCopy: { flex: 1 },
  bottomLabel: { color: "#64748B", fontSize: 8 },
  bottomValue: { color: "#0F172A", fontSize: 14, fontWeight: "900", marginTop: 2 },
  applyButton: { alignItems: "center", backgroundColor: "#6366F1", borderRadius: 16, justifyContent: "center", minHeight: 50, minWidth: 148, paddingHorizontal: 16 },
  applyButtonPressed: { backgroundColor: "#4F46E5" },
  applyDisabled: { backgroundColor: "#CBD5E1" },
  applyButtonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900" },
  stateHeader: { alignItems: "center", backgroundColor: "#FFFFFF", borderBottomColor: "#E2E8F0", borderBottomWidth: 1, flexDirection: "row", minHeight: 62, paddingHorizontal: 15 },
  stateBack: { alignItems: "center", height: 40, justifyContent: "center", width: 40 },
  stateHeaderTitle: { color: "#0F172A", flex: 1, fontSize: 16, fontWeight: "900", textAlign: "center" },
  stateContainer: { alignItems: "center", flex: 1, gap: 10, justifyContent: "center", padding: 24 },
  stateText: { color: "#64748B", fontSize: 12, textAlign: "center" },
  stateError: { color: "#B91C1C" },
  retryButton: { backgroundColor: "#EEF2FF", borderRadius: 13, marginTop: 3, paddingHorizontal: 14, paddingVertical: 9 },
  retryText: { color: "#4F46E5", fontSize: 10, fontWeight: "900" },
});
