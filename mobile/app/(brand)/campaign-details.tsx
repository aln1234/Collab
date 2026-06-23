import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import { listBrandCampaigns } from "../../src/features/campaigns/api";
import type { Campaign } from "../../src/features/campaigns/types";
import { normalizeApiError } from "../../src/lib/api-client";

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
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: Campaign["status"]) {
  return status.replaceAll("_", " ");
}

function CampaignRow({ campaign, onPress }: { campaign: Campaign; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <LinearGradient colors={["#6366F1", "#8B5CF6"]} style={styles.artwork}>
        <Ionicons color="#FFFFFF" name="megaphone-outline" size={28} />
      </LinearGradient>
      <View style={styles.cardCopy}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {campaign.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.budget}>{formatBudget(campaign)}</Text>
          <Text style={styles.status}>{formatStatus(campaign.status)}</Text>
        </View>
        <View style={styles.deadlineRow}>
          <Ionicons color="#64748B" name="calendar-outline" size={13} />
          <Text style={styles.deadline}>Deadline {formatDate(campaign.deadline)}</Text>
        </View>
      </View>
      <Ionicons color="#94A3B8" name="chevron-forward" size={20} />
    </Pressable>
  );
}

export default function BrandCampaignListScreen() {
  const router = useRouter();
  const campaignsQuery = useQuery({
    queryKey: ["brand-campaigns"],
    queryFn: listBrandCampaigns,
  });
  const campaigns = campaignsQuery.data?.results ?? [];
  const queryError = campaignsQuery.error
    ? normalizeApiError(campaignsQuery.error).message
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            colors={["#6366F1"]}
            onRefresh={() => void campaignsQuery.refetch()}
            refreshing={campaignsQuery.isRefetching && !campaignsQuery.isLoading}
            tintColor="#6366F1"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Campaigns</Text>
            <Text style={styles.subtitle}>Manage campaigns and review applicants</Text>
          </View>
          <Pressable
            accessibilityLabel="Create campaign"
            onPress={() => router.push("/(brand)/new-campaign")}
            style={styles.createButton}
          >
            <Ionicons color="#FFFFFF" name="add" size={22} />
          </Pressable>
        </View>

        {campaignsQuery.data ? (
          <Text style={styles.countText}>
            {campaignsQuery.data.count} {campaignsQuery.data.count === 1 ? "campaign" : "campaigns"}
          </Text>
        ) : null}

        {campaignsQuery.isLoading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color="#6366F1" />
            <Text style={styles.stateText}>Loading campaigns…</Text>
          </View>
        ) : null}

        {queryError ? (
          <View style={styles.stateCard}>
            <Ionicons color="#DC2626" name="alert-circle-outline" size={29} />
            <Text style={styles.errorText}>{queryError}</Text>
            <Pressable onPress={() => void campaignsQuery.refetch()} style={styles.retryButton}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : null}

        {!campaignsQuery.isLoading && !queryError && campaigns.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons color="#94A3B8" name="megaphone-outline" size={30} />
            <Text style={styles.emptyTitle}>No campaigns yet</Text>
            <Text style={styles.stateText}>Create a campaign to start receiving applications.</Text>
          </View>
        ) : null}

        <View style={styles.list}>
          {campaigns.map((campaign) => (
            <CampaignRow
              campaign={campaign}
              key={campaign.id}
              onPress={() =>
                router.push({
                  pathname: "/(brand)/campaigns/[id]",
                  params: { id: campaign.id },
                })
              }
            />
          ))}
        </View>

        {campaignsQuery.data?.next ? (
          <Text style={styles.pageNote}>
            Showing the first {campaigns.length} of {campaignsQuery.data.count} campaigns.
          </Text>
        ) : null}
      </ScrollView>
      <PrototypeTabBar activeTab="Campaigns" role="brand" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 30, width: "100%" },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: "#0F172A", fontSize: 28, fontWeight: "900", letterSpacing: -0.7 },
  subtitle: { color: "#64748B", fontSize: 11, marginTop: 4 },
  createButton: { alignItems: "center", backgroundColor: "#6366F1", borderRadius: 17, height: 42, justifyContent: "center", width: 42 },
  countText: { color: "#6366F1", fontSize: 10, fontWeight: "800", marginBottom: 13, marginTop: 20 },
  list: { gap: 11 },
  card: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, flexDirection: "row", minHeight: 102, padding: 11 },
  cardPressed: { backgroundColor: "#F8FAFC" },
  artwork: { alignItems: "center", borderRadius: 17, height: 76, justifyContent: "center", width: 76 },
  cardCopy: { flex: 1, marginLeft: 12, minWidth: 0 },
  cardTitle: { color: "#0F172A", fontSize: 13, fontWeight: "900" },
  metaRow: { alignItems: "center", flexDirection: "row", gap: 7, marginTop: 6 },
  budget: { color: "#10B981", fontSize: 10, fontWeight: "900" },
  status: { color: "#6366F1", fontSize: 8, fontWeight: "800", textTransform: "capitalize" },
  deadlineRow: { alignItems: "center", flexDirection: "row", gap: 4, marginTop: 7 },
  deadline: { color: "#64748B", fontSize: 8, fontWeight: "600" },
  stateCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, gap: 9, justifyContent: "center", minHeight: 165, padding: 22 },
  stateText: { color: "#64748B", fontSize: 11, lineHeight: 17, textAlign: "center" },
  errorText: { color: "#B91C1C", fontSize: 11, lineHeight: 17, textAlign: "center" },
  emptyTitle: { color: "#0F172A", fontSize: 15, fontWeight: "900" },
  retryButton: { backgroundColor: "#EEF2FF", borderRadius: 13, marginTop: 3, paddingHorizontal: 14, paddingVertical: 9 },
  retryText: { color: "#4F46E5", fontSize: 10, fontWeight: "900" },
  pageNote: { color: "#64748B", fontSize: 9, marginTop: 14, textAlign: "center" },
});
