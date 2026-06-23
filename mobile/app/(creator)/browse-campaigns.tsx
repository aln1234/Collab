import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrototypeTabBar } from "../../src/components/prototype/prototype-tab-bar";
import { listCampaigns } from "../../src/features/campaigns/api";
import type { Campaign } from "../../src/features/campaigns/types";
import { normalizeApiError } from "../../src/lib/api-client";

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

function formatDeadline(deadline: string) {
  const date = new Date(`${deadline}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return deadline;
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

function CampaignRow({ item, onPress }: { item: Campaign; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <LinearGradient colors={["#0F172A", "#6366F1"]} style={styles.art}>
        <View style={styles.artOrb} />
        <Ionicons color="#FFFFFF" name="megaphone-outline" size={31} />
      </LinearGradient>
      <View style={styles.cardCopy}>
        <Text style={styles.brand}>{item.brand.company_name}</Text>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.budget}>{formatBudget(item)}</Text>
          <Text style={styles.meta}>• {formatStatus(item.status)}</Text>
        </View>
        <View style={styles.deadlineRow}>
          <Ionicons color="#64748B" name="calendar-outline" size={13} />
          <Text style={styles.deadline}>Deadline {formatDeadline(item.deadline)}</Text>
        </View>
      </View>
      <Ionicons color="#94A3B8" name="chevron-forward" size={20} />
    </Pressable>
  );
}

export default function BrowseCampaignsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const campaignsQuery = useQuery({
    queryKey: ["campaigns", { search }],
    queryFn: () => listCampaigns({ search }),
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Browse Campaigns</Text>
            <Text style={styles.subtitle}>Find your next brand partnership</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons color="#94A3B8" name="search-outline" size={20} />
          <TextInput
            autoCapitalize="none"
            onChangeText={setSearch}
            placeholder="Search campaigns or brands…"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={search}
          />
          {search ? (
            <Pressable accessibilityLabel="Clear search" hitSlop={10} onPress={() => setSearch("")}>
              <Ionicons color="#94A3B8" name="close-circle" size={20} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Open opportunities</Text>
          {campaignsQuery.data ? (
            <Text style={styles.resultsCount}>
              {campaignsQuery.data.count} {campaignsQuery.data.count === 1 ? "campaign" : "campaigns"}
            </Text>
          ) : null}
        </View>

        {campaignsQuery.isLoading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color="#6366F1" />
            <Text style={styles.stateText}>Loading campaigns…</Text>
          </View>
        ) : null}

        {queryError ? (
          <View style={styles.stateCard}>
            <Ionicons color="#DC2626" name="alert-circle-outline" size={28} />
            <Text style={styles.errorText}>{queryError}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void campaignsQuery.refetch()}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : null}

        {!campaignsQuery.isLoading && !queryError && campaigns.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons color="#94A3B8" name="megaphone-outline" size={30} />
            <Text style={styles.emptyTitle}>No campaigns found</Text>
            <Text style={styles.stateText}>
              {search ? "Try a different search." : "Check back for new opportunities."}
            </Text>
          </View>
        ) : null}

        <View style={styles.list}>
          {campaigns.map((item) => (
            <CampaignRow
              item={item}
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/(creator)/campaigns/[id]",
                  params: { id: item.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <PrototypeTabBar activeTab="Browse" role="creator" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 28, width: "100%" },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: "#0F172A", fontSize: 27, fontWeight: "900", letterSpacing: -0.7 },
  subtitle: { color: "#64748B", fontSize: 11, marginTop: 4 },
  searchBox: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, flexDirection: "row", marginTop: 20, minHeight: 54, paddingHorizontal: 14 },
  searchInput: { color: "#0F172A", flex: 1, fontSize: 12, minHeight: 52, paddingHorizontal: 9 },
  resultsHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 12, marginTop: 20 },
  resultsTitle: { color: "#0F172A", fontSize: 16, fontWeight: "900" },
  resultsCount: { color: "#6366F1", fontSize: 9, fontWeight: "800" },
  list: { gap: 11 },
  card: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, flexDirection: "row", minHeight: 103, padding: 11 },
  cardPressed: { backgroundColor: "#F8FAFC" },
  art: { alignItems: "center", borderRadius: 17, height: 76, justifyContent: "center", overflow: "hidden", width: 76 },
  artOrb: { backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 45, height: 90, position: "absolute", right: -30, top: -25, width: 90 },
  cardCopy: { flex: 1, marginLeft: 12, minWidth: 0 },
  brand: { color: "#6366F1", fontSize: 8, fontWeight: "900", textTransform: "uppercase" },
  cardTitle: { color: "#0F172A", fontSize: 13, fontWeight: "900", marginTop: 3 },
  metaRow: { alignItems: "center", flexDirection: "row", marginTop: 5 },
  budget: { color: "#10B981", fontSize: 10, fontWeight: "900" },
  meta: { color: "#64748B", fontSize: 8, marginLeft: 4, textTransform: "capitalize" },
  deadlineRow: { alignItems: "center", flexDirection: "row", gap: 4, marginTop: 5 },
  deadline: { color: "#64748B", fontSize: 8, fontWeight: "600" },
  stateCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, gap: 9, justifyContent: "center", minHeight: 160, padding: 22 },
  stateText: { color: "#64748B", fontSize: 11, textAlign: "center" },
  emptyTitle: { color: "#0F172A", fontSize: 15, fontWeight: "900" },
  errorText: { color: "#B91C1C", fontSize: 11, lineHeight: 17, textAlign: "center" },
  retryButton: { backgroundColor: "#EEF2FF", borderRadius: 13, marginTop: 3, paddingHorizontal: 14, paddingVertical: 9 },
  retryText: { color: "#4F46E5", fontSize: 10, fontWeight: "900" },
});
