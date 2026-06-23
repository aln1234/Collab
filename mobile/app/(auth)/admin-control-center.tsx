import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../src/stores/auth-store";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const verificationQueue = [
  { initials: "UO", name: "Urban Outfitters", type: "Brand", color: "#E0E7FF", icon: "business-outline" as IoniconName },
  { initials: "SJ", name: "Sarah Jenkins", type: "Creator", color: "#FCE7F3", icon: "person-outline" as IoniconName },
  { initials: "TN", name: "TechNova Ltd", type: "Brand", color: "#DBEAFE", icon: "business-outline" as IoniconName },
];

const pendingCampaigns = [
  { title: "Summer Glow Skincare Launch", budget: "$5,000", time: "2h ago", icon: "sunny-outline" as IoniconName, color: "#FCE7F3" },
  { title: "Gaming Gear Unboxing Series", budget: "$12,500", time: "5h ago", icon: "game-controller-outline" as IoniconName, color: "#E0E7FF" },
];

const managementItems = [
  { label: "Reports", icon: "bar-chart-outline" as IoniconName, color: "#6366F1", background: "#EEF2FF" },
  { label: "Fees", icon: "card-outline" as IoniconName, color: "#10B981", background: "#D1FAE5" },
  { label: "Logs", icon: "shield-checkmark-outline" as IoniconName, color: "#0EA5E9", background: "#E0F2FE" },
  { label: "Disputes", icon: "warning-outline" as IoniconName, color: "#F59E0B", background: "#FEF3C7" },
];

function RevenueStat({
  icon,
  label,
  value,
  change,
}: {
  icon: IoniconName;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <View style={styles.revenueStat}>
      <View style={styles.revenueHeader}>
        <View style={styles.revenueIcon}>
          <Ionicons color="#6366F1" name={icon} size={18} />
        </View>
        <View style={styles.changePill}>
          <Ionicons color="#059669" name="arrow-up" size={10} />
          <Text style={styles.changeText}>{change}</Text>
        </View>
      </View>
      <Text style={styles.revenueLabel}>{label}</Text>
      <Text style={styles.revenueValue}>{value}</Text>
    </View>
  );
}

function VerificationRow({ item }: { item: (typeof verificationQueue)[number] }) {
  return (
    <View style={styles.verificationRow}>
      <View style={[styles.queueAvatar, { backgroundColor: item.color }]}>
        <Text style={styles.queueAvatarText}>{item.initials}</Text>
      </View>
      <View style={styles.queueCopy}>
        <Text numberOfLines={1} style={styles.queueName}>
          {item.name}
        </Text>
        <View style={styles.queueTypeRow}>
          <Ionicons color="#64748B" name={item.icon} size={12} />
          <Text style={styles.queueType}>{item.type}</Text>
        </View>
      </View>
      <Pressable
        accessibilityLabel={`Reject ${item.name}`}
        accessibilityRole="button"
        onPress={() => undefined}
        style={({ pressed }) => [styles.queueAction, styles.rejectAction, pressed && styles.pressed]}
      >
        <Ionicons color="#EF4444" name="close" size={19} />
      </Pressable>
      <Pressable
        accessibilityLabel={`Approve ${item.name}`}
        accessibilityRole="button"
        onPress={() => undefined}
        style={({ pressed }) => [styles.queueAction, styles.approveAction, pressed && styles.pressed]}
      >
        <Ionicons color="#10B981" name="checkmark" size={19} />
      </Pressable>
    </View>
  );
}

function PendingCampaignCard({ item }: { item: (typeof pendingCampaigns)[number] }) {
  return (
    <View style={styles.pendingCard}>
      <View style={styles.pendingTopRow}>
        <View style={[styles.campaignIcon, { backgroundColor: item.color }]}>
          <Ionicons color="#6366F1" name={item.icon} size={23} />
        </View>
        <View style={styles.pendingCopy}>
          <Text numberOfLines={2} style={styles.pendingTitle}>
            {item.title}
          </Text>
          <Text style={styles.pendingBudget}>Budget: {item.budget}</Text>
        </View>
        <Text style={styles.pendingTime}>{item.time}</Text>
      </View>
      <View style={styles.pendingDivider} />
      <View style={styles.pendingFooter}>
        <View style={styles.reviewPill}>
          <View style={styles.reviewDot} />
          <Text style={styles.reviewPillText}>Pending Review</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => undefined}
          style={({ pressed }) => [styles.reviewButton, pressed && styles.reviewPressed]}
        >
          <Text style={styles.reviewButtonText}>Review</Text>
          <Ionicons color="#FFFFFF" name="arrow-forward" size={14} />
        </Pressable>
      </View>
    </View>
  );
}

function ActivityChart() {
  const bars = [48, 73, 56, 88, 67, 94, 78];
  const labels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <View style={styles.chartArea}>
      <View style={styles.barRow}>
        {bars.map((height, index) => (
          <View key={`${labels[index]}-${index}`} style={styles.barColumn}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  { height: `${height}%` },
                  index === 5 && styles.highlightBar,
                ]}
              />
            </View>
            <Text style={styles.barLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ManagementCard({ item }: { item: (typeof managementItems)[number] }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => undefined}
      style={({ pressed }) => [styles.managementCard, pressed && styles.managementPressed]}
    >
      <View style={[styles.managementIcon, { backgroundColor: item.background }]}>
        <Ionicons color={item.color} name={item.icon} size={25} />
      </View>
      <Text style={styles.managementLabel}>{item.label}</Text>
      <Ionicons color="#94A3B8" name="chevron-forward" size={17} />
    </Pressable>
  );
}

export default function AdminControlCenterScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  function confirmLogout() {
    Alert.alert(
      "Log out?",
      "You will need to sign in again to access the control center.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => void handleLogout(),
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Control Center</Text>
            <Text style={styles.subtitle}>Platform Overview • June 2024</Text>
          </View>
          <Pressable
            accessibilityLabel="Settings"
            accessibilityRole="button"
            onPress={() => undefined}
            style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
          >
            <Ionicons color="#334155" name="settings-outline" size={22} />
          </Pressable>
        </View>

        <View style={styles.revenuePanel}>
          <RevenueStat change="12%" icon="cash-outline" label="Total Revenue" value="$42.8k" />
          <RevenueStat change="5%" icon="receipt-outline" label="Platform Fees" value="$6.4k" />
        </View>

        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Verification Queue</Text>
          <View style={styles.queueBadge}>
            <Text style={styles.queueBadgeText}>12</Text>
          </View>
        </View>
        <View style={styles.verificationList}>
          {verificationQueue.map((item) => (
            <VerificationRow item={item} key={item.name} />
          ))}
        </View>

        <Text style={styles.centeredSectionTitle}>Pending Campaigns</Text>
        <View style={styles.pendingList}>
          {pendingCampaigns.map((item) => (
            <PendingCampaignCard item={item} key={item.title} />
          ))}
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.cardTitle}>Platform Activity</Text>
            <View style={styles.weekPill}>
              <Text style={styles.weekText}>This Week</Text>
              <Ionicons color="#64748B" name="chevron-down" size={12} />
            </View>
          </View>
          <ActivityChart />
          <View style={styles.activityStats}>
            <View style={styles.activityStat}>
              <Text style={styles.activityValue}>842</Text>
              <Text style={styles.activityLabel}>Active Brands</Text>
            </View>
            <View style={styles.activityDivider} />
            <View style={styles.activityStat}>
              <Text style={styles.activityValue}>3,120</Text>
              <Text style={styles.activityLabel}>Active Creators</Text>
            </View>
          </View>
        </View>

        <Text style={styles.centeredSectionTitle}>System Management</Text>
        <View style={styles.managementGrid}>
          {managementItems.map((item) => (
            <ManagementCard item={item} key={item.label} />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={confirmLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        >
          <Ionicons color="#DC2626" name="log-out-outline" size={19} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
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
    paddingBottom: 34,
    paddingHorizontal: 20,
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 21,
    paddingTop: 16,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: "#0F172A",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  settingsButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 19,
    borderWidth: 1,
    height: 43,
    justifyContent: "center",
    marginLeft: 12,
    width: 43,
  },
  revenuePanel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 27,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 11,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 3,
  },
  revenueStat: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    minHeight: 127,
    padding: 14,
  },
  revenueHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  revenueIcon: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 13,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  changePill: {
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 10,
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  changeText: {
    color: "#059669",
    fontSize: 8,
    fontWeight: "900",
  },
  revenueLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 13,
  },
  revenueValue: {
    color: "#0F172A",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: -0.6,
    marginTop: 3,
  },
  sectionHeaderLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    marginTop: 29,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  queueBadge: {
    alignItems: "center",
    backgroundColor: "#E0E7FF",
    borderRadius: 11,
    height: 23,
    justifyContent: "center",
    minWidth: 23,
    paddingHorizontal: 6,
  },
  queueBadgeText: {
    color: "#6366F1",
    fontSize: 10,
    fontWeight: "900",
  },
  verificationList: {
    gap: 10,
  },
  verificationRow: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 76,
    padding: 11,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  queueAvatar: {
    alignItems: "center",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    marginRight: 11,
    width: 44,
  },
  queueAvatarText: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "900",
  },
  queueCopy: {
    flex: 1,
    minWidth: 0,
  },
  queueName: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },
  queueTypeRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    marginTop: 4,
  },
  queueType: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "600",
  },
  queueAction: {
    alignItems: "center",
    borderRadius: 17,
    height: 36,
    justifyContent: "center",
    marginLeft: 8,
    width: 36,
  },
  rejectAction: {
    backgroundColor: "#FEE2E2",
  },
  approveAction: {
    backgroundColor: "#D1FAE5",
  },
  centeredSectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
    marginBottom: 14,
    marginTop: 30,
    textAlign: "center",
  },
  pendingList: {
    gap: 12,
  },
  pendingCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 23,
    borderWidth: 1,
    padding: 15,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  pendingTopRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  campaignIcon: {
    alignItems: "center",
    borderRadius: 17,
    height: 50,
    justifyContent: "center",
    marginRight: 11,
    width: 50,
  },
  pendingCopy: {
    flex: 1,
    minWidth: 0,
  },
  pendingTitle: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 17,
  },
  pendingBudget: {
    color: "#6366F1",
    fontSize: 9,
    fontWeight: "800",
    marginTop: 4,
  },
  pendingTime: {
    color: "#94A3B8",
    fontSize: 8,
    fontWeight: "600",
    marginLeft: 8,
  },
  pendingDivider: {
    backgroundColor: "#E2E8F0",
    height: 1,
    marginVertical: 13,
  },
  pendingFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewPill: {
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  reviewDot: {
    backgroundColor: "#F59E0B",
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  reviewPillText: {
    color: "#B45309",
    fontSize: 8,
    fontWeight: "900",
  },
  reviewButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 13,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  reviewPressed: {
    backgroundColor: "#4F46E5",
  },
  reviewButtonText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 27,
    borderWidth: 1,
    marginTop: 29,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },
  activityHeader: {
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
  weekPill: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  weekText: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "800",
  },
  chartArea: {
    height: 150,
    marginTop: 17,
  },
  barRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
  },
  barColumn: {
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    width: 28,
  },
  barTrack: {
    backgroundColor: "#F1F5F9",
    borderRadius: 7,
    flex: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
    width: 16,
  },
  bar: {
    backgroundColor: "#A5B4FC",
    borderRadius: 7,
    minHeight: 8,
    width: "100%",
  },
  highlightBar: {
    backgroundColor: "#6366F1",
  },
  barLabel: {
    color: "#94A3B8",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 7,
  },
  activityStats: {
    alignItems: "center",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    flexDirection: "row",
    marginTop: 17,
    paddingTop: 16,
  },
  activityStat: {
    alignItems: "center",
    flex: 1,
  },
  activityValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },
  activityLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  activityDivider: {
    backgroundColor: "#E2E8F0",
    height: 36,
    width: 1,
  },
  managementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
  },
  logoutButton: {
    alignItems: "center",
    borderColor: "#FECACA",
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 24,
    minHeight: 50,
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "900",
  },
  managementCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: "46%",
    flexDirection: "row",
    flexGrow: 1,
    minHeight: 74,
    padding: 12,
  },
  managementPressed: {
    backgroundColor: "#F8FAFC",
  },
  managementIcon: {
    alignItems: "center",
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    marginRight: 9,
    width: 42,
  },
  managementLabel: {
    color: "#0F172A",
    flex: 1,
    fontSize: 11,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.65,
  },
});
