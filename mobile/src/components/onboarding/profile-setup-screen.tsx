import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { PrototypeRole } from "../../stores/onboarding-store";

type ProfileSetupScreenProps = {
  role: PrototypeRole;
  title: string;
  subtitle: string;
};

export function ProfileSetupScreen({ role, title, subtitle }: ProfileSetupScreenProps) {
  const router = useRouter();
  const isCreator = role === "CREATOR";

  function continueToDashboard() {
    router.replace(isCreator ? "/(creator)/dashboard" : "/(brand)/dashboard");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons color="#334155" name="arrow-back" size={23} />
        </Pressable>

        <View style={styles.content}>
          <LinearGradient
            colors={isCreator ? ["#6366F1", "#A855F7"] : ["#6366F1", "#F43F5E"]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={styles.iconWrap}
          >
            <Ionicons
              color="#FFFFFF"
              name={isCreator ? "sparkles" : "briefcase-outline"}
              size={42}
            />
          </LinearGradient>

          <Text style={styles.eyebrow}>{isCreator ? "CREATOR" : "BRAND"} PROFILE</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.placeholderCard}>
            <View style={styles.placeholderRow}>
              <View style={styles.placeholderIcon}>
                <Ionicons color="#6366F1" name="person-outline" size={20} />
              </View>
              <View style={styles.placeholderCopy}>
                <Text style={styles.placeholderTitle}>Profile details</Text>
                <Text style={styles.placeholderText}>This guided form is coming next.</Text>
              </View>
            </View>
            <View style={styles.placeholderDivider} />
            <View style={styles.placeholderRow}>
              <View style={styles.placeholderIcon}>
                <Ionicons color="#6366F1" name="checkmark-circle-outline" size={21} />
              </View>
              <View style={styles.placeholderCopy}>
                <Text style={styles.placeholderTitle}>You&apos;re ready to preview</Text>
                <Text style={styles.placeholderText}>Continue to explore your dashboard.</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={continueToDashboard}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>
            Continue to {isCreator ? "Creator" : "Brand"} Dashboard
          </Text>
          <Ionicons color="#FFFFFF" name="arrow-forward" size={20} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFF",
    flex: 1,
  },
  screen: {
    alignSelf: "center",
    flex: 1,
    maxWidth: 520,
    paddingBottom: 24,
    paddingHorizontal: 22,
    paddingTop: 10,
    width: "100%",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 16,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 30,
    height: 92,
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    width: 92,
    elevation: 7,
  },
  eyebrow: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: "#0F172A",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 38,
    textAlign: "center",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 360,
    textAlign: "center",
  },
  placeholderCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 32,
    padding: 18,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    width: "100%",
    elevation: 3,
  },
  placeholderRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 13,
  },
  placeholderIcon: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    height: 43,
    justifyContent: "center",
    width: 43,
  },
  placeholderCopy: {
    flex: 1,
    gap: 3,
  },
  placeholderTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },
  placeholderText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },
  placeholderDivider: {
    backgroundColor: "#E2E8F0",
    height: 1,
    marginVertical: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 18,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 16,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#4F46E5",
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.65,
  },
});
