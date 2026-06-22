import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "../src/components/layout/screen-container";

const homePageAnimation = require("../assets/lottie/home_page.json");

export default function IndexScreen() {
  const router = useRouter();

  return (
    <ScreenContainer centered={false} scroll={false}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoMark}>↗</Text>
            </View>

            <Text style={styles.logoText}>Connect</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.animationContainer}>
            <LottieView
              source={homePageAnimation}
              autoPlay
              loop
              resizeMode="contain"
              style={styles.animation}
            />
          </View>

          <Text style={styles.title}>Connect with Top Creators</Text>

          <Text style={styles.subtitle}>
            Find the perfect creators to promote your brand, run campaigns, and
            grow together.
          </Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.activeIndicator} />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.primaryButton}
              onPress={() => router.push("/(auth)/register")}
            >
              <Text style={styles.primaryButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.secondaryButton}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            The creator marketplace for brands and influencers
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoMark: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },

  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  skipText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6366F1",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  animationContainer: {
    width: "100%",
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  animation: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 27,
    fontWeight: "500",
    color: "#64748B",
  },

  bottom: {
    paddingBottom: 4,
  },

  activeIndicator: {
    width: 28,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#6366F1",
    alignSelf: "center",
    marginBottom: 26,
  },

  buttonRow: {
    flexDirection: "row",
    marginBottom: 22,
  },

  primaryButton: {
    flex: 1,
    height: 56,
    borderRadius: 22,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryButton: {
    flex: 1,
    height: 56,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },

  footerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
});