import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const platforms = [
  {
    name: "Instagram",
    detail: "Reel + Story",
    icon: "logo-instagram" as IoniconName,
    color: "#E1306C",
    background: "#FCE7F3",
  },
  {
    name: "TikTok",
    detail: "Video Post",
    icon: "musical-notes" as IoniconName,
    color: "#0F172A",
    background: "#F1F5F9",
  },
  {
    name: "YouTube",
    detail: "Dedicated Video",
    icon: "logo-youtube" as IoniconName,
    color: "#EF4444",
    background: "#FEE2E2",
  },
  {
    name: "X / Twitter",
    detail: "Thread + Media",
    icon: "logo-twitter" as IoniconName,
    color: "#0EA5E9",
    background: "#E0F2FE",
  },
];

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={[styles.textInput, multiline && styles.descriptionInput]}
        textAlignVertical={multiline ? "top" : "center"}
        value={value}
      />
    </View>
  );
}

function PlatformCard({
  platform,
  selected,
  onPress,
}: {
  platform: (typeof platforms)[number];
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.platformCard,
        selected && styles.platformCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.platformIcon, { backgroundColor: platform.background }]}>
        <Ionicons color={platform.color} name={platform.icon} size={22} />
      </View>
      <View style={styles.platformCopy}>
        <Text numberOfLines={1} style={styles.platformName}>
          {platform.name}
        </Text>
        <Text numberOfLines={1} style={styles.platformDetail}>
          {platform.detail}
        </Text>
      </View>
      <View style={[styles.platformCheck, selected && styles.platformCheckSelected]}>
        {selected ? <Ionicons color="#FFFFFF" name="checkmark" size={12} /> : null}
      </View>
    </Pressable>
  );
}

function CompactField({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}: {
  icon: IoniconName;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "decimal-pad";
}) {
  return (
    <View style={styles.compactField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.compactInputShell}>
        <Ionicons color="#64748B" name={icon} size={17} />
        <TextInput
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          style={styles.compactInput}
          value={value}
        />
      </View>
    </View>
  );
}

export default function NewCampaignScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["Instagram"]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [smartMatch, setSmartMatch] = useState(true);

  function togglePlatform(name: string) {
    setSelectedPlatforms((current) =>
      current.includes(name)
        ? current.filter((platform) => platform !== name)
        : [...current, name],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={8}
        style={styles.keyboardView}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Close new campaign"
            accessibilityRole="button"
            hitSlop={9}
            onPress={() => router.replace("/(brand)/dashboard")}
            style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
          >
            <Ionicons color="#334155" name="close" size={25} />
          </Pressable>
          <Text style={styles.topBarTitle}>New Campaign</Text>
          <Pressable accessibilityRole="button" onPress={() => undefined} style={styles.draftButton}>
            <Text style={styles.draftText}>Draft</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stepperCard}>
            <View style={styles.stepsRow}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, styles.stepCircleActive]}>
                  <Text style={styles.stepNumberActive}>1</Text>
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Details</Text>
              </View>
              <View style={styles.stepConnector} />
              <View style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>2</Text>
                </View>
                <Text style={styles.stepLabel}>Budget</Text>
              </View>
              <View style={styles.stepConnector} />
              <View style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>3</Text>
                </View>
                <Text style={styles.stepLabel}>Target</Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressActive} />
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle>Campaign Essentials</SectionTitle>
            <FormField
              label="Campaign Title"
              onChangeText={setTitle}
              placeholder="e.g. Summer Glow Skincare Launch"
              value={title}
            />
            <FormField
              label="Description"
              multiline
              onChangeText={setDescription}
              placeholder="Describe your brand goals and what you’re looking for…"
              value={description}
            />
          </View>

          <View style={styles.section}>
            <SectionTitle>Deliverables &amp; Platforms</SectionTitle>
            <View style={styles.platformGrid}>
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  onPress={() => togglePlatform(platform.name)}
                  platform={platform}
                  selected={selectedPlatforms.includes(platform.name)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle>Budget &amp; Timeline</SectionTitle>
            <View style={styles.compactFieldRow}>
              <CompactField
                icon="wallet-outline"
                keyboardType="decimal-pad"
                label="Total Budget"
                onChangeText={setBudget}
                placeholder="$0.00"
                value={budget}
              />
              <CompactField
                icon="calendar-outline"
                label="Deadline"
                onChangeText={setDeadline}
                placeholder="Select Date"
                value={deadline}
              />
            </View>
          </View>

          <LinearGradient
            colors={["#EEF2FF", "#FAF5FF"]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={styles.smartMatchCard}
          >
            <LinearGradient colors={["#6366F1", "#A855F7"]} style={styles.smartMatchIcon}>
              <Ionicons color="#FFFFFF" name="sparkles" size={22} />
            </LinearGradient>
            <View style={styles.smartMatchCopy}>
              <View style={styles.smartMatchTitleRow}>
                <Text style={styles.smartMatchTitle}>AI Smart Match</Text>
                <View style={styles.recommendedPill}>
                  <Text style={styles.recommendedText}>RECOMMENDED</Text>
                </View>
              </View>
              <Text style={styles.smartMatchText}>
                Automatically find creators who best match your campaign goals.
              </Text>
            </View>
            <Switch
              accessibilityLabel="AI Smart Match"
              ios_backgroundColor="#CBD5E1"
              onValueChange={setSmartMatch}
              thumbColor="#FFFFFF"
              trackColor={{ false: "#CBD5E1", true: "#6366F1" }}
              value={smartMatch}
            />
          </LinearGradient>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/(brand)/dashboard")}
            style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
          >
            <Ionicons color="#64748B" name="arrow-back" size={18} />
            <Text style={styles.backLinkText}>Back</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(brand)/campaign-details")}
            style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
          >
            <Text numberOfLines={1} style={styles.nextButtonText}>
              Next: Budget &amp; Audience
            </Text>
            <Ionicons color="#FFFFFF" name="arrow-forward" size={19} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 66,
    paddingHorizontal: 18,
  },
  closeButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  topBarTitle: {
    color: "#0F172A",
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  draftButton: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    minWidth: 55,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  draftText: {
    color: "#6366F1",
    fontSize: 11,
    fontWeight: "900",
  },
  scrollContent: {
    alignSelf: "center",
    maxWidth: 560,
    paddingBottom: 28,
    paddingHorizontal: 20,
    width: "100%",
  },
  stepperCard: {
    paddingBottom: 20,
    paddingTop: 21,
  },
  stepsRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  stepItem: {
    alignItems: "center",
    width: 56,
  },
  stepCircle: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 17,
    borderWidth: 1.5,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  stepCircleActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 3,
  },
  stepNumber: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "900",
  },
  stepNumberActive: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  stepLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 6,
  },
  stepLabelActive: {
    color: "#6366F1",
    fontWeight: "900",
  },
  stepConnector: {
    backgroundColor: "#E2E8F0",
    flex: 1,
    height: 2,
    marginHorizontal: 2,
    marginTop: 16,
  },
  progressTrack: {
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    height: 5,
    marginTop: 17,
    overflow: "hidden",
  },
  progressActive: {
    backgroundColor: "#6366F1",
    borderRadius: 3,
    height: "100%",
    width: "34%",
  },
  section: {
    gap: 15,
    marginTop: 17,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.45,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "800",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 17,
    borderWidth: 1,
    color: "#0F172A",
    fontSize: 13,
    minHeight: 54,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  descriptionInput: {
    lineHeight: 20,
    minHeight: 108,
    paddingTop: 15,
  },
  platformGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
  },
  platformCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 19,
    borderWidth: 1.5,
    flexBasis: "46%",
    flexDirection: "row",
    flexGrow: 1,
    minHeight: 80,
    padding: 12,
  },
  platformCardSelected: {
    backgroundColor: "#FAFAFF",
    borderColor: "#6366F1",
  },
  platformIcon: {
    alignItems: "center",
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    marginRight: 9,
    width: 42,
  },
  platformCopy: {
    flex: 1,
    minWidth: 0,
  },
  platformName: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "900",
  },
  platformDetail: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "600",
    marginTop: 3,
  },
  platformCheck: {
    alignItems: "center",
    borderColor: "#CBD5E1",
    borderRadius: 8,
    borderWidth: 1.5,
    height: 17,
    justifyContent: "center",
    marginLeft: 4,
    width: 17,
  },
  platformCheckSelected: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  compactFieldRow: {
    flexDirection: "row",
    gap: 11,
  },
  compactField: {
    flex: 1,
    gap: 8,
  },
  compactInputShell: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 54,
    paddingHorizontal: 12,
  },
  compactInput: {
    color: "#0F172A",
    flex: 1,
    fontSize: 11,
    minHeight: 52,
    paddingHorizontal: 7,
    paddingVertical: 0,
  },
  smartMatchCard: {
    alignItems: "center",
    borderColor: "#C7D2FE",
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
  },
  smartMatchIcon: {
    alignItems: "center",
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    marginRight: 11,
    width: 48,
  },
  smartMatchCopy: {
    flex: 1,
    minWidth: 0,
  },
  smartMatchTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  smartMatchTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },
  recommendedPill: {
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  recommendedText: {
    color: "#6366F1",
    fontSize: 6,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  smartMatchText: {
    color: "#64748B",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
    paddingRight: 5,
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
  backLink: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  backLinkText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "800",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 17,
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    maxWidth: "75%",
    minHeight: 52,
    paddingHorizontal: 16,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.22,
    shadowRadius: 11,
    elevation: 5,
  },
  nextButtonPressed: {
    backgroundColor: "#4F46E5",
  },
  nextButtonText: {
    color: "#FFFFFF",
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.65,
  },
});
