import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
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

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const filters = [
  { label: "All Platforms", icon: "apps-outline" as IoniconName },
  { label: "Instagram", icon: "logo-instagram" as IoniconName },
  { label: "TikTok", icon: "musical-notes" as IoniconName },
  { label: "YouTube", icon: "logo-youtube" as IoniconName },
];

const creators = [
  {
    name: "Alex Rivera",
    initials: "AR",
    location: "Los Angeles, CA",
    rating: "4.9",
    followers: "250k",
    engagement: "5.2%",
    tags: ["Travel", "Luxury"],
    colors: ["#0EA5E9", "#6366F1"] as const,
    accent: "#DBEAFE",
  },
  {
    name: "Mika Chen",
    initials: "MC",
    location: "Singapore",
    rating: "4.8",
    followers: "890k",
    engagement: "8.1%",
    tags: ["Tech", "Gaming"],
    colors: ["#8B5CF6", "#EC4899"] as const,
    accent: "#EDE9FE",
  },
  {
    name: "Elena Rossi",
    initials: "ER",
    location: "Milan, Italy",
    rating: "5.0",
    followers: "1.2M",
    engagement: "4.3%",
    tags: ["Fashion", "Beauty"],
    colors: ["#F43F5E", "#FB7185"] as const,
    accent: "#FFE4E6",
  },
  {
    name: "Jordan Smith",
    initials: "JS",
    location: "London, UK",
    rating: "4.7",
    followers: "45k",
    engagement: "12.5%",
    tags: ["Fitness", "Health"],
    colors: ["#10B981", "#0EA5E9"] as const,
    accent: "#D1FAE5",
  },
];

function FilterChip({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: IoniconName;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        selected && styles.filterChipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons color={selected ? "#FFFFFF" : "#64748B"} name={icon} size={15} />
      <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function CreatorCard({
  creator,
  onViewProfile,
}: {
  creator: (typeof creators)[number];
  onViewProfile: () => void;
}) {
  return (
    <View style={styles.creatorCard}>
      <LinearGradient colors={creator.colors} style={styles.creatorArtwork}>
        <View style={styles.artOrbLarge} />
        <View style={styles.artOrbSmall} />
        <View style={[styles.creatorAvatar, { backgroundColor: creator.accent }]}>
          <Text style={styles.creatorAvatarText}>{creator.initials}</Text>
        </View>
        <View style={styles.ratingPill}>
          <Ionicons color="#F59E0B" name="star" size={11} />
          <Text style={styles.ratingText}>{creator.rating}</Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(15,23,42,0.78)"]}
          style={styles.creatorOverlay}
        >
          <Text numberOfLines={1} style={styles.creatorName}>
            {creator.name}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons color="rgba(255,255,255,0.8)" name="location-outline" size={11} />
            <Text numberOfLines={1} style={styles.locationText}>
              {creator.location}
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>

      <View style={styles.creatorBody}>
        <View style={styles.creatorStats}>
          <View style={styles.creatorStat}>
            <Text style={styles.creatorStatValue}>{creator.followers}</Text>
            <Text style={styles.creatorStatLabel}>Followers</Text>
          </View>
          <View style={styles.creatorStatDivider} />
          <View style={styles.creatorStat}>
            <Text style={styles.creatorStatValue}>{creator.engagement}</Text>
            <Text style={styles.creatorStatLabel}>Engagement</Text>
          </View>
        </View>
        <View style={styles.tagRow}>
          {creator.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onViewProfile}
          style={({ pressed }) => [styles.profileButton, pressed && styles.profileButtonPressed]}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function FindCreatorsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All Platforms");
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Find Creators</Text>
            <Text style={styles.subtitle}>2,480 influencers available</Text>
          </View>
          <Pressable
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            onPress={() => router.push("/(brand)/notifications")}
            style={({ pressed }) => [styles.bellButton, pressed && styles.pressed]}
          >
            <Ionicons color="#334155" name="notifications-outline" size={22} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons color="#94A3B8" name="search-outline" size={20} />
            <TextInput
              autoCapitalize="none"
              onChangeText={setSearch}
              placeholder="Search by name or niche…"
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={search}
            />
          </View>
          <Pressable
            accessibilityLabel="Filter creators"
            accessibilityRole="button"
            onPress={() => undefined}
            style={({ pressed }) => [styles.filterButton, pressed && styles.filterButtonPressed]}
          >
            <Ionicons color="#FFFFFF" name="options-outline" size={22} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.filterList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((filter) => (
            <FilterChip
              icon={filter.icon}
              key={filter.label}
              label={filter.label}
              onPress={() => setSelectedFilter(filter.label)}
              selected={selectedFilter === filter.label}
            />
          ))}
        </ScrollView>

        <LinearGradient
          colors={["#312E81", "#6366F1", "#A855F7"]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.featuredCard}
        >
          <View style={styles.featuredOrbLarge} />
          <View style={styles.featuredOrbSmall} />
          <View style={styles.featuredCopy}>
            <View style={styles.topPickPill}>
              <Ionicons color="#FDE68A" name="sparkles" size={12} />
              <Text style={styles.topPickText}>Top Pick of the Week</Text>
            </View>
            <Text style={styles.featuredName}>Sarah Jenkins</Text>
            <Text style={styles.featuredMeta}>Tech &amp; AI Reviewer • 1.2M Fans</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [styles.inviteButton, pressed && styles.inviteButtonPressed]}
            >
              <Ionicons color="#FFFFFF" name="paper-plane-outline" size={14} />
              <Text style={styles.inviteButtonText}>Invite to Campaign</Text>
            </Pressable>
          </View>
          <View style={styles.featuredAvatarRing}>
            <LinearGradient colors={["#E0E7FF", "#BAE6FD"]} style={styles.featuredAvatar}>
              <Text style={styles.featuredAvatarText}>SJ</Text>
            </LinearGradient>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Pressable accessibilityRole="button" onPress={() => undefined}>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.creatorGrid}>
          {creators.map((creator) => (
            <CreatorCard
              creator={creator}
              key={creator.name}
              onViewProfile={() => router.push("/(brand)/creator-profile")}
            />
          ))}
        </View>

        <View style={styles.loadingRow}>
          <ActivityIndicator color="#6366F1" size="small" />
          <Text style={styles.loadingText}>Loading more creators…</Text>
        </View>
      </ScrollView>
      <PrototypeTabBar activeTab="Find Creators" role="brand" />
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
    justifyContent: "space-between",
    paddingBottom: 22,
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
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
  bellButton: {
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
  notificationDot: {
    backgroundColor: "#F43F5E",
    borderColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1.5,
    height: 9,
    position: "absolute",
    right: 8,
    top: 7,
    width: 9,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    minHeight: 54,
    paddingHorizontal: 15,
  },
  searchInput: {
    color: "#0F172A",
    flex: 1,
    fontSize: 13,
    minHeight: 52,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 54,
    elevation: 4,
  },
  filterButtonPressed: {
    backgroundColor: "#4F46E5",
  },
  filterList: {
    gap: 9,
    paddingBottom: 22,
    paddingTop: 15,
  },
  filterChip: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  filterChipSelected: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  filterChipText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "800",
  },
  filterChipTextSelected: {
    color: "#FFFFFF",
  },
  featuredCard: {
    borderRadius: 28,
    minHeight: 188,
    overflow: "hidden",
    padding: 20,
    shadowColor: "#4338CA",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  featuredCopy: {
    maxWidth: "72%",
    zIndex: 2,
  },
  topPickPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 13,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  topPickText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  featuredName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginTop: 13,
  },
  featuredMeta: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 15,
    marginTop: 4,
  },
  inviteButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#0EA5E9",
    borderRadius: 14,
    flexDirection: "row",
    gap: 6,
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inviteButtonPressed: {
    backgroundColor: "#0284C7",
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  featuredAvatarRing: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 62,
    height: 124,
    justifyContent: "center",
    position: "absolute",
    right: -5,
    top: 33,
    width: 124,
  },
  featuredAvatar: {
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.85)",
    borderRadius: 48,
    borderWidth: 3,
    height: 96,
    justifyContent: "center",
    width: 96,
  },
  featuredAvatarText: {
    color: "#4338CA",
    fontSize: 28,
    fontWeight: "900",
  },
  featuredOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 100,
    height: 200,
    position: "absolute",
    right: -55,
    top: -80,
    width: 200,
  },
  featuredOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 55,
    bottom: -45,
    height: 110,
    left: 120,
    position: "absolute",
    width: 110,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 29,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  seeAllText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "800",
  },
  creatorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  creatorCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 23,
    borderWidth: 1,
    flexGrow: 1,
    flexBasis: "46%",
    maxWidth: "49%",
    overflow: "hidden",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.08,
    shadowRadius: 13,
    elevation: 3,
  },
  creatorArtwork: {
    height: 150,
    justifyContent: "center",
    overflow: "hidden",
  },
  artOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 55,
    height: 110,
    position: "absolute",
    right: -27,
    top: -23,
    width: 110,
  },
  artOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 35,
    bottom: -17,
    height: 70,
    left: -15,
    position: "absolute",
    width: 70,
  },
  creatorAvatar: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: "rgba(255,255,255,0.9)",
    borderRadius: 34,
    borderWidth: 3,
    height: 68,
    justifyContent: "center",
    marginBottom: 25,
    width: 68,
  },
  creatorAvatarText: {
    color: "#334155",
    fontSize: 18,
    fontWeight: "900",
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
    right: 8,
    top: 8,
  },
  ratingText: {
    color: "#0F172A",
    fontSize: 9,
    fontWeight: "900",
  },
  creatorOverlay: {
    bottom: 0,
    left: 0,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 24,
    position: "absolute",
    right: 0,
  },
  creatorName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },
  locationText: {
    color: "rgba(255,255,255,0.82)",
    flex: 1,
    fontSize: 8,
    fontWeight: "600",
  },
  creatorBody: {
    padding: 10,
  },
  creatorStats: {
    alignItems: "center",
    flexDirection: "row",
  },
  creatorStat: {
    alignItems: "center",
    flex: 1,
  },
  creatorStatValue: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "900",
  },
  creatorStatLabel: {
    color: "#94A3B8",
    fontSize: 7,
    fontWeight: "700",
    marginTop: 2,
  },
  creatorStatDivider: {
    backgroundColor: "#E2E8F0",
    height: 26,
    width: 1,
  },
  tagRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#EEF2FF",
    borderRadius: 9,
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  tagText: {
    color: "#6366F1",
    fontSize: 7,
    fontWeight: "800",
    textAlign: "center",
  },
  profileButton: {
    alignItems: "center",
    borderColor: "#C7D2FE",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 9,
    paddingVertical: 8,
  },
  profileButtonPressed: {
    backgroundColor: "#EEF2FF",
  },
  profileButtonText: {
    color: "#6366F1",
    fontSize: 9,
    fontWeight: "900",
  },
  loadingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    paddingTop: 26,
  },
  loadingText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.65,
  },
});
