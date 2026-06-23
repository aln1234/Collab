import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const recentWork = [
  { views: "1.2M", icon: "airplane-outline" as const, colors: ["#0EA5E9", "#6366F1"] as const },
  { views: "850K", icon: "leaf-outline" as const, colors: ["#10B981", "#0D9488"] as const },
  { views: "2.1M", icon: "sparkles" as const, colors: ["#EC4899", "#8B5CF6"] as const },
];

function ProfileStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.profileStat}>
      <Text style={styles.profileStatValue}>{value}</Text>
      <Text style={styles.profileStatLabel}>{label}</Text>
    </View>
  );
}

function LocationBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.locationItem}>
      <View style={styles.locationLabelRow}>
        <Text style={styles.locationLabel}>{label}</Text>
        <Text style={styles.locationValue}>{value}%</Text>
      </View>
      <View style={styles.locationTrack}>
        <View style={[styles.locationFill, { width: `${value}%` }]} />
      </View>
    </View>
  );
}

function GenderDonut() {
  const circumference = 226.2;

  return (
    <View style={styles.genderColumn}>
      <Text style={styles.insightSubtitle}>Gender Split</Text>
      <View style={styles.donutWrap}>
        <Svg height={94} viewBox="0 0 94 94" width={94}>
          <Circle cx="47" cy="47" fill="none" r="36" stroke="#E0E7FF" strokeWidth="12" />
          <Circle
            cx="47"
            cy="47"
            fill="none"
            r="36"
            rotation="-90"
            stroke="#EC4899"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
            strokeWidth="12"
            x="0"
            y="0"
          />
        </Svg>
        <View style={styles.donutCenter}>
          <Text style={styles.donutValue}>75%</Text>
          <Text style={styles.donutLabel}>Female</Text>
        </View>
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.femaleDot]} />
          <Text style={styles.legendText}>Female 75%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.maleDot]} />
          <Text style={styles.legendText}>Male 25%</Text>
        </View>
      </View>
    </View>
  );
}

function RecentWorkCard({ item }: { item: (typeof recentWork)[number] }) {
  return (
    <LinearGradient colors={item.colors} style={styles.workCard}>
      <View style={styles.workOrbLarge} />
      <View style={styles.workOrbSmall} />
      <View style={styles.playButton}>
        <Ionicons color="#FFFFFF" name="play" size={19} />
      </View>
      <Ionicons color="rgba(255,255,255,0.82)" name={item.icon} size={52} />
      <LinearGradient colors={["transparent", "rgba(15,23,42,0.72)"]} style={styles.workOverlay}>
        <View style={styles.viewsRow}>
          <Ionicons color="#FFFFFF" name="eye-outline" size={14} />
          <Text style={styles.viewsText}>{item.views} views</Text>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

export default function CreatorProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#312E81", "#6366F1", "#EC4899"]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={[styles.hero, { height: 236 + insets.top, paddingTop: insets.top + 11 }]}
        >
          <View style={styles.heroOrbLarge} />
          <View style={styles.heroOrbSmall} />
          <Ionicons color="rgba(255,255,255,0.18)" name="camera-outline" size={88} />
          <LinearGradient colors={["transparent", "rgba(15,23,42,0.48)"]} style={styles.heroFade} />

          <View style={[styles.heroActions, { top: insets.top + 11 }]}>
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
            >
              <Ionicons color="#FFFFFF" name="arrow-back" size={22} />
            </Pressable>
            <View style={styles.heroActionGroup}>
              <Pressable
                accessibilityLabel="Share profile"
                accessibilityRole="button"
                onPress={() => undefined}
                style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
              >
                <Ionicons color="#FFFFFF" name="share-outline" size={21} />
              </Pressable>
              <Pressable
                accessibilityLabel={liked ? "Unlike profile" : "Like profile"}
                accessibilityRole="button"
                onPress={() => setLiked((current) => !current)}
                style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
              >
                <Ionicons
                  color={liked ? "#F43F5E" : "#FFFFFF"}
                  name={liked ? "heart" : "heart-outline"}
                  size={22}
                />
              </Pressable>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.profileHeader}>
          <LinearGradient colors={["#FCE7F3", "#E0E7FF"]} style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>SM</Text>
          </LinearGradient>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Sarah Mitchell</Text>
            <Ionicons color="#6366F1" name="checkmark-circle" size={21} />
          </View>
          <Text style={styles.creatorSubtitle}>Fashion &amp; Travel Content Creator</Text>
        </View>

        <View style={styles.contentWidth}>
          <View style={styles.statsCard}>
            <ProfileStat label="Followers" value="1.2M" />
            <View style={styles.statDivider} />
            <ProfileStat label="Followers" value="450K" />
            <View style={styles.statDivider} />
            <ProfileStat label="Engagement" value="5.8%" />
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.centeredTitle}>About</Text>
            <Text style={styles.bio}>
              Helping sustainable fashion brands reach Gen-Z audiences through authentic
              storytelling and high-energy short-form video. Based in London, available globally.
            </Text>
            <View style={styles.tagsWrap}>
              {["Sustainable Fashion", "Luxury Travel", "Vlogs", "UK Based"].map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.audienceCard}>
            <View style={styles.audienceTitleRow}>
              <Text style={styles.cardTitle}>Audience Insights</Text>
              <View style={styles.livePill}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE DATA</Text>
              </View>
            </View>
            <View style={styles.insightColumns}>
              <View style={styles.locationColumn}>
                <Text style={styles.insightSubtitle}>Top Locations</Text>
                <LocationBar label="United States" value={42} />
                <LocationBar label="United Kingdom" value={28} />
              </View>
              <View style={styles.insightDivider} />
              <GenderDonut />
            </View>
          </View>

          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Work</Text>
            <Pressable accessibilityRole="button" onPress={() => undefined}>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={styles.workList}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {recentWork.map((item) => (
              <RecentWorkCard item={item} key={item.views} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceCopy}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>$1,200/post</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => undefined}
          style={({ pressed }) => [styles.inviteButton, pressed && styles.inviteButtonPressed]}
        >
          <Ionicons color="#FFFFFF" name="paper-plane-outline" size={18} />
          <Text style={styles.inviteButtonText}>Invite to Campaign</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 18,
    position: "absolute",
    right: 18,
    top: 0,
  },
  heroActionGroup: {
    flexDirection: "row",
    gap: 9,
  },
  heroButton: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.35)",
    borderColor: "rgba(255,255,255,0.24)",
    borderRadius: 20,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  heroFade: {
    bottom: 0,
    height: 95,
    left: 0,
    position: "absolute",
    right: 0,
  },
  heroOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderRadius: 120,
    height: 240,
    position: "absolute",
    right: -55,
    top: -70,
    width: 240,
  },
  heroOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 75,
    bottom: -45,
    height: 150,
    left: -35,
    position: "absolute",
    width: 150,
  },
  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileAvatar: {
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderRadius: 59,
    borderWidth: 5,
    height: 118,
    justifyContent: "center",
    marginTop: -59,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    width: 118,
    elevation: 7,
  },
  profileAvatarText: {
    color: "#4338CA",
    fontSize: 32,
    fontWeight: "900",
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    marginTop: 14,
  },
  name: {
    color: "#0F172A",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  creatorSubtitle: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
  contentWidth: {
    alignSelf: "center",
    maxWidth: 560,
    paddingHorizontal: 20,
    width: "100%",
  },
  statsCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 22,
    minHeight: 83,
    paddingHorizontal: 8,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  },
  profileStat: {
    alignItems: "center",
    flex: 1,
  },
  profileStatValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },
  profileStatLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  statDivider: {
    backgroundColor: "#E2E8F0",
    height: 38,
    width: 1,
  },
  aboutSection: {
    alignItems: "center",
    marginTop: 30,
  },
  centeredTitle: {
    color: "#0F172A",
    fontSize: 21,
    fontWeight: "900",
  },
  bio: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 11,
    maxWidth: 440,
    textAlign: "center",
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 17,
  },
  tag: {
    backgroundColor: "#EEF2FF",
    borderColor: "#E0E7FF",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  tagText: {
    color: "#6366F1",
    fontSize: 9,
    fontWeight: "800",
  },
  audienceCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 27,
    borderWidth: 1,
    marginTop: 30,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },
  audienceTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: -0.35,
  },
  livePill: {
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 10,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  liveDot: {
    backgroundColor: "#10B981",
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  liveText: {
    color: "#059669",
    fontSize: 7,
    fontWeight: "900",
  },
  insightColumns: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  locationColumn: {
    flex: 1,
    paddingRight: 14,
  },
  insightSubtitle: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 13,
  },
  locationItem: {
    gap: 6,
    marginBottom: 14,
  },
  locationLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
  },
  locationValue: {
    color: "#0F172A",
    fontSize: 9,
    fontWeight: "900",
  },
  locationTrack: {
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    height: 7,
    overflow: "hidden",
  },
  locationFill: {
    backgroundColor: "#6366F1",
    borderRadius: 4,
    height: "100%",
  },
  insightDivider: {
    backgroundColor: "#E2E8F0",
    height: 133,
    width: 1,
  },
  genderColumn: {
    alignItems: "center",
    paddingLeft: 14,
    width: 135,
  },
  donutWrap: {
    alignItems: "center",
    height: 94,
    justifyContent: "center",
    width: 94,
  },
  donutCenter: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  donutValue: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
  },
  donutLabel: {
    color: "#64748B",
    fontSize: 7,
    fontWeight: "700",
  },
  legendRow: {
    gap: 4,
    marginTop: 8,
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  legendDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  femaleDot: {
    backgroundColor: "#EC4899",
  },
  maleDot: {
    backgroundColor: "#C7D2FE",
  },
  legendText: {
    color: "#64748B",
    fontSize: 7,
    fontWeight: "700",
  },
  recentHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 30,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  seeAllText: {
    color: "#6366F1",
    fontSize: 11,
    fontWeight: "900",
  },
  workList: {
    gap: 12,
    paddingRight: 20,
  },
  workCard: {
    alignItems: "center",
    borderRadius: 22,
    height: 190,
    justifyContent: "center",
    overflow: "hidden",
    width: 158,
  },
  workOrbLarge: {
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 65,
    height: 130,
    position: "absolute",
    right: -32,
    top: -28,
    width: 130,
  },
  workOrbSmall: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 40,
    bottom: -20,
    height: 80,
    left: -16,
    position: "absolute",
    width: 80,
  },
  playButton: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.36)",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    width: 36,
  },
  workOverlay: {
    bottom: 0,
    left: 0,
    padding: 12,
    paddingTop: 35,
    position: "absolute",
    right: 0,
  },
  viewsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  viewsText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  bottomBar: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 82,
    paddingHorizontal: 20,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  priceCopy: {
    flexShrink: 1,
  },
  priceLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "600",
  },
  priceValue: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 2,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 17,
    flexDirection: "row",
    gap: 7,
    marginLeft: 12,
    minHeight: 52,
    paddingHorizontal: 15,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.22,
    shadowRadius: 11,
    elevation: 5,
  },
  inviteButtonPressed: {
    backgroundColor: "#4F46E5",
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.65,
  },
});
