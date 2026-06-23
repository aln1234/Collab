import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
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
import {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Line,
  Path,
  Stop,
  Svg,
} from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrototypeTabBar } from "../../src/components/prototype/prototype-tab-bar";
import { listBrandCampaigns } from "../../src/features/campaigns/api";
import type { Campaign } from "../../src/features/campaigns/types";
import { normalizeApiError } from "../../src/lib/api-client";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

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

  return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function formatStatus(status: Campaign["status"]) {
  return status.replaceAll("_", " ");
}

function HeaderIcon({
  icon,
  showDot = false,
  onPress = () => undefined,
}: {
  icon: IoniconName;
  showDot?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={icon === "search-outline" ? "Search" : "Notifications"}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.headerIcon, pressed && styles.pressed]}
    >
      <Ionicons color="#334155" name={icon} size={21} />
      {showDot ? <View style={styles.notificationDot} /> : null}
    </Pressable>
  );
}

function StatCard({
  icon,
  label,
  value,
  change,
  pillColor,
  pillStyle,
  pillTextStyle,
}: {
  icon: IoniconName;
  label: string;
  value: string;
  change: string;
  pillColor: string;
  pillStyle: object;
  pillTextStyle: object;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statIcon}>
          <Ionicons color="#6366F1" name={icon} size={17} />
        </View>
      </View>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        <View style={[styles.changePill, pillStyle]}>
          <Ionicons color={pillColor} name="arrow-up" size={10} />
          <Text style={[styles.changeText, pillTextStyle]}>{change}</Text>
        </View>
      </View>
    </View>
  );
}

function CampaignCard({
  campaign,
  onManage,
}: {
  campaign: Campaign;
  onManage: () => void;
}) {
  return (
    <View style={styles.campaignCard}>
      <ExpoLinearGradient
        colors={["#A78BFA", "#6366F1", "#4338CA"]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.campaignArtwork}
      >
        <View style={styles.artCircleLarge} />
        <View style={styles.artCircleSmall} />
        <Ionicons color="rgba(255,255,255,0.9)" name="megaphone-outline" size={58} />

        <View style={[styles.imageBadge, styles.activeBadge]}>
          <Text style={styles.activeText}>{formatStatus(campaign.status)}</Text>
        </View>
        <View style={[styles.imageBadge, styles.platformBadge]}>
          <Ionicons color="#FFFFFF" name="calendar-outline" size={13} />
          <Text style={styles.platformText}>{formatDate(campaign.deadline)}</Text>
        </View>
      </ExpoLinearGradient>

      <View style={styles.campaignBody}>
        <Text numberOfLines={1} style={styles.campaignTitle}>
          {campaign.title}
        </Text>
        <View style={styles.campaignMetaRow}>
          <View style={styles.creatorCount}>
            <Ionicons color="#64748B" name="flag-outline" size={15} />
            <Text style={styles.creatorCountText}>{formatStatus(campaign.status)}</Text>
          </View>
          <Text style={styles.campaignBudget}>{formatBudget(campaign)}</Text>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.campaignFooter}>
          <Text style={styles.deadlineText}>Deadline {formatDate(campaign.deadline)}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onManage}
            style={({ pressed }) => [styles.manageButton, pressed && styles.pressed]}
          >
            <Text style={styles.manageText}>Manage</Text>
            <Ionicons color="#6366F1" name="arrow-forward" size={14} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function EngagementChart() {
  return (
    <View style={styles.chartWrap}>
      <Svg height={150} viewBox="0 0 320 150" width="100%">
        <Defs>
          <SvgLinearGradient id="engagementArea" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0" stopColor="#6366F1" stopOpacity="0.32" />
            <Stop offset="1" stopColor="#6366F1" stopOpacity="0.02" />
          </SvgLinearGradient>
        </Defs>
        {[28, 62, 96, 130].map((y) => (
          <Line
            key={y}
            stroke="#E2E8F0"
            strokeDasharray="4 6"
            strokeWidth="1"
            x1="5"
            x2="315"
            y1={y}
            y2={y}
          />
        ))}
        <Path
          d="M 7 115 C 27 111, 38 88, 55 92 C 75 96, 84 69, 105 72 C 124 76, 136 48, 155 56 C 176 64, 185 88, 205 78 C 225 68, 235 38, 255 45 C 275 52, 287 24, 313 28 L 313 132 L 7 132 Z"
          fill="url(#engagementArea)"
        />
        <Path
          d="M 7 115 C 27 111, 38 88, 55 92 C 75 96, 84 69, 105 72 C 124 76, 136 48, 155 56 C 176 64, 185 88, 205 78 C 225 68, 235 38, 255 45 C 275 52, 287 24, 313 28"
          fill="none"
          stroke="#6366F1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
        <Circle cx="313" cy="28" fill="#FFFFFF" r="5" stroke="#6366F1" strokeWidth="3" />
      </Svg>
      <View style={styles.dayRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <Text key={day} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function BrandDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const campaignsQuery = useQuery({
    queryKey: ["brand-campaigns"],
    queryFn: listBrandCampaigns,
  });
  const campaigns = campaignsQuery.data?.results ?? [];
  const campaignError = campaignsQuery.error
    ? normalizeApiError(campaignsQuery.error).message
    : null;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={[styles.topHeader, { paddingTop: insets.top + 9 }]}>
        <View style={styles.brandAvatar}>
          <Text style={styles.brandAvatarText}>UB</Text>
        </View>
        <View style={styles.headerCopy}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Connect Brand
          </Text>
          <View style={styles.planRow}>
            <Ionicons color="#6366F1" name="diamond" size={11} />
            <Text style={styles.planText}>Premium Plan</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <HeaderIcon
            icon="search-outline"
            onPress={() => router.push("/(brand)/find-creators")}
          />
          <HeaderIcon
            icon="notifications-outline"
            onPress={() => router.push("/(brand)/notifications")}
            showDot
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 30 }]}
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
        <View style={styles.statsRow}>
          <StatCard
            change="12%"
            icon="people-outline"
            label="Total Reach"
            pillColor="#059669"
            pillStyle={styles.greenPill}
            pillTextStyle={styles.greenText}
            value="1.2M"
          />
          <StatCard
            change="5%"
            icon="wallet-outline"
            label="Total Spend"
            pillColor="#2563EB"
            pillStyle={styles.bluePill}
            pillTextStyle={styles.blueText}
            value="$8.4k"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Campaigns</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(brand)/new-campaign")}
            style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
          >
            <Ionicons color="#6366F1" name="add" size={18} />
            <Text style={styles.createButtonText}>Create New</Text>
          </Pressable>
        </View>

        {campaignsQuery.isLoading ? (
          <View style={styles.campaignState}>
            <ActivityIndicator color="#6366F1" />
            <Text style={styles.stateText}>Loading campaigns…</Text>
          </View>
        ) : null}

        {campaignError ? (
          <View style={styles.campaignState}>
            <Ionicons color="#DC2626" name="alert-circle-outline" size={27} />
            <Text style={styles.errorText}>{campaignError}</Text>
            <Pressable onPress={() => void campaignsQuery.refetch()} style={styles.retryButton}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : null}

        {!campaignsQuery.isLoading && !campaignError && campaigns.length === 0 ? (
          <View style={styles.campaignState}>
            <Ionicons color="#94A3B8" name="megaphone-outline" size={29} />
            <Text style={styles.emptyTitle}>No campaigns yet</Text>
            <Text style={styles.stateText}>Create a campaign to start receiving applications.</Text>
          </View>
        ) : null}

        {campaigns.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.campaignList}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {campaigns.map((campaign) => (
              <CampaignCard
                campaign={campaign}
                key={campaign.id}
                onManage={() =>
                  router.push({
                    pathname: "/(brand)/campaigns/[id]",
                    params: { id: campaign.id },
                  })
                }
              />
            ))}
          </ScrollView>
        ) : null}

        <View style={styles.engagementCard}>
          <Text style={styles.cardTitle}>Engagement Overview</Text>
          <EngagementChart />
          <View style={styles.engagementStats}>
            <View style={styles.engagementStat}>
              <Text style={styles.engagementValue}>8.4%</Text>
              <Text style={styles.engagementLabel}>Avg. ER</Text>
            </View>
            <View style={styles.engagementDivider} />
            <View style={styles.engagementStat}>
              <Text style={styles.engagementValue}>12.5k</Text>
              <Text style={styles.engagementLabel}>Clicks</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <PrototypeTabBar activeTab="Dashboard" role="brand" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  topHeader: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#EEF2F7",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 114,
    paddingBottom: 15,
    paddingHorizontal: 22,
  },
  brandAvatar: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    width: 48,
    elevation: 4,
  },
  brandAvatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  headerCopy: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.3,
  },
  planRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 4,
  },
  planText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 10,
  },
  headerIcon: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  notificationDot: {
    backgroundColor: "#EF4444",
    borderColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1.5,
    height: 9,
    position: "absolute",
    right: 7,
    top: 6,
    width: 9,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 24,
    borderWidth: 1,
    flex: 1,
    minHeight: 126,
    padding: 16,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 2,
  },
  statHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
  },
  statIcon: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 13,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  statValueRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 13,
  },
  statValue: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  changePill: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  greenPill: {
    backgroundColor: "#D1FAE5",
  },
  bluePill: {
    backgroundColor: "#DBEAFE",
  },
  changeText: {
    fontSize: 10,
    fontWeight: "900",
  },
  greenText: {
    color: "#059669",
  },
  blueText: {
    color: "#2563EB",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 30,
  },
  sectionTitle: {
    color: "#0F172A",
    flexShrink: 1,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#C7D2FE",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  createButtonText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "800",
  },
  campaignList: {
    gap: 14,
    paddingBottom: 6,
    paddingRight: 22,
  },
  campaignState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 22,
    borderWidth: 1,
    gap: 9,
    justifyContent: "center",
    minHeight: 150,
    padding: 20,
  },
  stateText: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
  },
  emptyTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "900",
  },
  retryButton: {
    backgroundColor: "#EEF2FF",
    borderRadius: 13,
    marginTop: 3,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  retryText: {
    color: "#4F46E5",
    fontSize: 10,
    fontWeight: "900",
  },
  campaignCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 27,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 17,
    width: 276,
    elevation: 4,
  },
  campaignArtwork: {
    alignItems: "center",
    height: 146,
    justifyContent: "center",
    overflow: "hidden",
  },
  artCircleLarge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 80,
    height: 160,
    position: "absolute",
    right: -40,
    top: -55,
    width: 160,
  },
  artCircleSmall: {
    backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 45,
    bottom: -38,
    height: 90,
    left: -18,
    position: "absolute",
    width: 90,
  },
  imageBadge: {
    alignItems: "center",
    borderRadius: 13,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    position: "absolute",
    top: 12,
  },
  activeBadge: {
    backgroundColor: "#FFFFFF",
    left: 12,
  },
  activeDot: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  activeText: {
    color: "#0F172A",
    fontSize: 10,
    fontWeight: "800",
  },
  platformBadge: {
    backgroundColor: "rgba(15,23,42,0.5)",
    right: 12,
  },
  platformText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  campaignBody: {
    padding: 17,
  },
  campaignTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: -0.3,
  },
  campaignMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  creatorCount: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  creatorCountText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  campaignBudget: {
    color: "#6366F1",
    fontSize: 15,
    fontWeight: "900",
  },
  cardDivider: {
    backgroundColor: "#E2E8F0",
    height: 1,
    marginVertical: 15,
  },
  campaignFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarStack: {
    alignItems: "center",
    flexDirection: "row",
  },
  smallAvatar: {
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    height: 31,
    justifyContent: "center",
    width: 31,
  },
  overlapAvatar: {
    marginLeft: -8,
  },
  smallAvatarText: {
    color: "#334155",
    fontSize: 8,
    fontWeight: "900",
  },
  moreAvatar: {
    backgroundColor: "#F1F5F9",
  },
  moreAvatarText: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "900",
  },
  manageButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
    paddingVertical: 5,
  },
  manageText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "900",
  },
  deadlineText: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
  },
  pendingCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 28,
    borderWidth: 1,
    gap: 11,
    marginTop: 28,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,
  },
  pendingHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
    marginBottom: 3,
  },
  cardTitle: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: -0.35,
  },
  pendingBadge: {
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 11,
    height: 23,
    justifyContent: "center",
    minWidth: 23,
    paddingHorizontal: 6,
  },
  pendingBadgeText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "900",
  },
  applicantRow: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 19,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 82,
    padding: 12,
  },
  applicantAvatar: {
    alignItems: "center",
    borderRadius: 23,
    height: 46,
    justifyContent: "center",
    marginRight: 11,
    width: 46,
  },
  applicantAvatarText: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "900",
  },
  applicantInfo: {
    flex: 1,
    minWidth: 0,
  },
  applicantName: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },
  applicantNiche: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
    marginTop: 3,
  },
  ratingText: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "800",
  },
  reviewButton: {
    backgroundColor: "#6366F1",
    borderRadius: 13,
    marginLeft: 8,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  reviewButtonPressed: {
    backgroundColor: "#4F46E5",
  },
  reviewButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  engagementCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 28,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,
  },
  chartWrap: {
    marginTop: 12,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
    paddingHorizontal: 2,
  },
  dayLabel: {
    color: "#94A3B8",
    fontSize: 9,
    fontWeight: "700",
    textAlign: "center",
    width: 30,
  },
  engagementStats: {
    alignItems: "center",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    flexDirection: "row",
    marginTop: 18,
    paddingTop: 17,
  },
  engagementStat: {
    alignItems: "center",
    flex: 1,
  },
  engagementValue: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "900",
  },
  engagementLabel: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  engagementDivider: {
    backgroundColor: "#E2E8F0",
    height: 37,
    width: 1,
  },
  pressed: {
    opacity: 0.65,
  },
});
