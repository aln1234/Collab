import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Line,
  Path,
  Stop,
  Svg,
} from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrototypeTabBar } from "../../src/components/prototype/prototype-tab-bar";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const activeCampaigns = [
  {
    title: "Oceanic Timepiece Launch",
    status: "Draft Due in 2h",
    color: "#F59E0B",
    background: "#FEF3C7",
    icon: "time-outline" as IoniconName,
    artIcon: "watch-outline" as IoniconName,
    colors: ["#0EA5E9", "#2563EB"] as const,
  },
  {
    title: "Summer Glow Series",
    status: "Content Approved",
    color: "#10B981",
    background: "#D1FAE5",
    icon: "checkmark-circle-outline" as IoniconName,
    artIcon: "sunny-outline" as IoniconName,
    colors: ["#F43F5E", "#FB923C"] as const,
  },
  {
    title: "30-Day Challenge",
    status: "Revision Requested",
    color: "#EF4444",
    background: "#FEE2E2",
    icon: "alert-circle-outline" as IoniconName,
    artIcon: "barbell-outline" as IoniconName,
    colors: ["#8B5CF6", "#EC4899"] as const,
  },
];

const recommendations = [
  {
    title: "Cyber-Tech Unboxing",
    budget: "$500 - $800",
    rating: "4.9",
    category: "Technology",
    icon: "hardware-chip-outline" as IoniconName,
    colors: ["#0F172A", "#6366F1"] as const,
  },
  {
    title: "Fresh Eats Promo",
    budget: "$200 + Product",
    rating: "4.7",
    category: "Food & Lifestyle",
    icon: "restaurant-outline" as IoniconName,
    colors: ["#10B981", "#0EA5E9"] as const,
  },
  {
    title: "Home Decor Refresh",
    budget: "$1,200",
    rating: "4.8",
    category: "Home Decor",
    icon: "home-outline" as IoniconName,
    colors: ["#F59E0B", "#F43F5E"] as const,
  },
];

function ActiveCampaignRow({
  campaign,
  onPress,
}: {
  campaign: (typeof activeCampaigns)[number];
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.campaignRow, pressed && styles.rowPressed]}
    >
      <LinearGradient colors={campaign.colors} style={styles.campaignThumb}>
        <View style={styles.thumbOrb} />
        <Ionicons color="#FFFFFF" name={campaign.artIcon} size={27} />
      </LinearGradient>
      <View style={styles.campaignCopy}>
        <Text numberOfLines={1} style={styles.campaignTitle}>
          {campaign.title}
        </Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusIcon, { backgroundColor: campaign.background }]}>
            <Ionicons color={campaign.color} name={campaign.icon} size={12} />
          </View>
          <Text numberOfLines={1} style={[styles.statusText, { color: campaign.color }]}>
            {campaign.status}
          </Text>
        </View>
      </View>
      <View style={styles.chevronButton}>
        <Ionicons color="#94A3B8" name="chevron-forward" size={20} />
      </View>
    </Pressable>
  );
}

function EngagementChart() {
  return (
    <View style={styles.chartWrap}>
      <Svg height={146} viewBox="0 0 320 146" width="100%">
        <Defs>
          <SvgLinearGradient id="creatorEngagement" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0" stopColor="#6366F1" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#6366F1" stopOpacity="0.02" />
          </SvgLinearGradient>
        </Defs>
        {[28, 60, 92, 124].map((y) => (
          <Line
            key={y}
            stroke="#E2E8F0"
            strokeDasharray="4 6"
            strokeWidth="1"
            x1="6"
            x2="314"
            y1={y}
            y2={y}
          />
        ))}
        <Path
          d="M 7 115 C 29 110, 39 84, 59 91 C 80 98, 91 70, 110 72 C 131 74, 141 45, 161 52 C 182 59, 193 85, 213 72 C 233 59, 244 35, 264 42 C 284 49, 294 23, 313 27 L 313 130 L 7 130 Z"
          fill="url(#creatorEngagement)"
        />
        <Path
          d="M 7 115 C 29 110, 39 84, 59 91 C 80 98, 91 70, 110 72 C 131 74, 141 45, 161 52 C 182 59, 193 85, 213 72 C 233 59, 244 35, 264 42 C 284 49, 294 23, 313 27"
          fill="none"
          stroke="#6366F1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
        <Circle cx="313" cy="27" fill="#FFFFFF" r="5" stroke="#6366F1" strokeWidth="3" />
      </Svg>
      <View style={styles.dayRow}>
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <Text key={`${day}-${index}`} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}

function RecommendationCard({
  item,
  onPress,
}: {
  item: (typeof recommendations)[number];
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.recommendationCard, pressed && styles.recommendationPressed]}
    >
      <LinearGradient colors={item.colors} style={styles.recommendationArt}>
        <View style={styles.recommendationOrbLarge} />
        <View style={styles.recommendationOrbSmall} />
        <Ionicons color="rgba(255,255,255,0.88)" name={item.icon} size={46} />
        <View style={styles.ratingPill}>
          <Ionicons color="#F59E0B" name="star" size={12} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </LinearGradient>
      <View style={styles.recommendationBody}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text numberOfLines={1} style={styles.recommendationTitle}>
          {item.title}
        </Text>
        <View style={styles.recommendationFooter}>
          <Text style={styles.budgetText}>{item.budget}</Text>
          <View style={styles.miniArrow}>
            <Ionicons color="#6366F1" name="arrow-forward" size={16} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function CreatorDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.welcome}>Welcome back, Sarah</Text>
            <Text style={styles.subtitle}>You have 3 tasks for today</Text>
          </View>
          <Pressable
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            onPress={() => router.push("/(creator)/notifications")}
            style={styles.bellButton}
          >
            <Ionicons color="#334155" name="notifications-outline" size={21} />
            <View style={styles.notificationDot} />
          </Pressable>
          <LinearGradient colors={["#FCE7F3", "#F43F5E"]} style={styles.avatar}>
            <Text style={styles.avatarText}>SS</Text>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={["#6366F1", "#4F46E5", "#0EA5E9"]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.earningsCard}
        >
          <View style={styles.earningsOrbLarge} />
          <View style={styles.earningsOrbSmall} />
          <View style={styles.earningsTopRow}>
            <View>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <Text style={styles.earningsValue}>$12,450.80</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [styles.withdrawButton, pressed && styles.withdrawPressed]}
            >
              <Ionicons color="#FFFFFF" name="wallet-outline" size={15} />
              <Text style={styles.withdrawText}>Withdraw</Text>
            </Pressable>
          </View>
          <View style={styles.earningsDivider} />
          <View style={styles.earningStatsRow}>
            <View style={styles.earningStat}>
              <Text style={styles.earningStatLabel}>Pending</Text>
              <Text style={styles.earningStatValue}>$1,200</Text>
            </View>
            <View style={styles.earningVerticalDivider} />
            <View style={styles.earningStat}>
              <Text style={styles.earningStatLabel}>This Month</Text>
              <Text style={styles.earningStatValue}>+$3,420</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Campaigns</Text>
          <Pressable accessibilityRole="button" onPress={() => undefined}>
            <Text style={styles.linkText}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.campaignList}>
          {activeCampaigns.map((campaign) => (
            <ActiveCampaignRow
              campaign={campaign}
              key={campaign.title}
              onPress={() => router.push("/(creator)/content-approval-chat")}
            />
          ))}
        </View>

        <View style={styles.engagementCard}>
          <View style={styles.engagementHeader}>
            <Text style={styles.cardTitle}>Engagement Growth</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [styles.rangePill, pressed && styles.pressed]}
            >
              <Text style={styles.rangeText}>Last 7 Days</Text>
              <Ionicons color="#64748B" name="chevron-down" size={13} />
            </Pressable>
          </View>
          <EngagementChart />
          <View style={styles.engagementStats}>
            <View style={styles.engagementStat}>
              <Text style={styles.engagementValue}>4.8%</Text>
              <Text style={styles.engagementLabel}>Avg. Rate</Text>
            </View>
            <View style={styles.engagementDivider} />
            <View style={styles.engagementStat}>
              <Text style={styles.engagementValue}>12.4k</Text>
              <Text style={styles.engagementLabel}>New Reach</Text>
            </View>
          </View>
        </View>

        <View style={styles.recommendedHeader}>
          <View style={styles.recommendedTitleRow}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <Ionicons color="#F59E0B" name="sparkles" size={18} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.recommendationList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {recommendations.map((item) => (
            <RecommendationCard
              item={item}
              key={item.title}
              onPress={() => router.push("/(creator)/browse-campaigns")}
            />
          ))}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(creator)/browse-campaigns")}
          style={({ pressed }) => [styles.browseButton, pressed && styles.browseButtonPressed]}
        >
          <Ionicons color="#FFFFFF" name="compass-outline" size={20} />
          <Text style={styles.browseButtonText}>Browse All Campaigns</Text>
          <Ionicons color="#FFFFFF" name="arrow-forward" size={19} />
        </Pressable>
      </ScrollView>
      <PrototypeTabBar activeTab="Home" role="creator" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  scrollContent: {
    alignSelf: "center",
    maxWidth: 560,
    paddingBottom: 32,
    paddingHorizontal: 20,
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 16,
  },
  headerCopy: {
    flex: 1,
  },
  welcome: {
    color: "#0F172A",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  avatar: {
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#F43F5E",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 9,
    width: 48,
    elevation: 4,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  bellButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    marginLeft: 8,
    width: 42,
  },
  notificationDot: {
    backgroundColor: "#F43F5E",
    borderColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 1,
    height: 8,
    position: "absolute",
    right: 7,
    top: 6,
    width: 8,
  },
  earningsCard: {
    borderRadius: 28,
    overflow: "hidden",
    padding: 20,
    shadowColor: "#4338CA",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 6,
  },
  earningsTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  earningsLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "700",
  },
  earningsValue: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -0.9,
    marginTop: 5,
  },
  withdrawButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.17)",
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginLeft: 10,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  withdrawPressed: {
    backgroundColor: "rgba(255,255,255,0.26)",
  },
  withdrawText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  earningsDivider: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 1,
    marginVertical: 17,
  },
  earningStatsRow: {
    flexDirection: "row",
  },
  earningStat: {
    flex: 1,
  },
  earningStatLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 9,
    fontWeight: "700",
  },
  earningStatValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4,
  },
  earningVerticalDivider: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 18,
    width: 1,
  },
  earningsOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 90,
    height: 180,
    position: "absolute",
    right: -50,
    top: -70,
    width: 180,
  },
  earningsOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 50,
    bottom: -40,
    height: 100,
    left: 80,
    position: "absolute",
    width: 100,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 29,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  linkText: {
    color: "#6366F1",
    fontSize: 11,
    fontWeight: "900",
  },
  campaignList: {
    gap: 11,
  },
  campaignRow: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 82,
    padding: 11,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  rowPressed: {
    backgroundColor: "#F8FAFC",
    transform: [{ scale: 0.995 }],
  },
  campaignThumb: {
    alignItems: "center",
    borderRadius: 16,
    height: 58,
    justifyContent: "center",
    overflow: "hidden",
    width: 58,
  },
  thumbOrb: {
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 30,
    height: 60,
    position: "absolute",
    right: -20,
    top: -17,
    width: 60,
  },
  campaignCopy: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  campaignTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },
  statusRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 7,
  },
  statusIcon: {
    alignItems: "center",
    borderRadius: 9,
    height: 20,
    justifyContent: "center",
    marginRight: 5,
    width: 20,
  },
  statusText: {
    flex: 1,
    fontSize: 9,
    fontWeight: "800",
  },
  chevronButton: {
    alignItems: "center",
    height: 38,
    justifyContent: "center",
    width: 34,
  },
  engagementCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 27,
    borderWidth: 1,
    marginTop: 28,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },
  engagementHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.35,
  },
  rangePill: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  rangeText: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "800",
  },
  chartWrap: {
    marginTop: 10,
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
    marginTop: 17,
    paddingTop: 16,
  },
  engagementStat: {
    alignItems: "center",
    flex: 1,
  },
  engagementValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },
  engagementLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  engagementDivider: {
    backgroundColor: "#E2E8F0",
    height: 36,
    width: 1,
  },
  recommendedHeader: {
    marginBottom: 14,
    marginTop: 29,
  },
  recommendedTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  recommendationList: {
    gap: 13,
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 23,
    borderWidth: 1,
    overflow: "hidden",
    width: 226,
  },
  recommendationPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  recommendationArt: {
    alignItems: "center",
    height: 128,
    justifyContent: "center",
    overflow: "hidden",
  },
  recommendationOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 60,
    height: 120,
    position: "absolute",
    right: -28,
    top: -36,
    width: 120,
  },
  recommendationOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderRadius: 35,
    bottom: -22,
    height: 70,
    left: -15,
    position: "absolute",
    width: 70,
  },
  ratingPill: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 5,
    position: "absolute",
    right: 10,
    top: 10,
  },
  ratingText: {
    color: "#0F172A",
    fontSize: 9,
    fontWeight: "900",
  },
  recommendationBody: {
    padding: 14,
  },
  categoryText: {
    color: "#6366F1",
    fontSize: 8,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  recommendationTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 5,
  },
  recommendationFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  budgetText: {
    color: "#10B981",
    fontSize: 11,
    fontWeight: "900",
  },
  miniArrow: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 13,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  browseButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 18,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    marginTop: 24,
    minHeight: 56,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.22,
    shadowRadius: 11,
    elevation: 5,
  },
  browseButtonPressed: {
    backgroundColor: "#4F46E5",
  },
  browseButtonText: {
    color: "#FFFFFF",
    flex: 1,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.65,
  },
});
