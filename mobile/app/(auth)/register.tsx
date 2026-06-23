import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { type ComponentProps, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import connectConfetti from "../../assets/lottie/toogle.json";
import type { RegisterPayload } from "../../src/features/auth/types";
import { getDashboardPath, useAuthStore } from "../../src/stores/auth-store";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type RoleCardProps = {
  icon: IoniconName;
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

function RoleCard({ icon, label, description, selected, onPress }: RoleCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleCard,
        selected && styles.roleCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.roleIcon, selected && styles.roleIconSelected]}>
        <Ionicons color={selected ? "#FFFFFF" : "#6366F1"} name={icon} size={25} />
      </View>
      <Text style={styles.roleTitle}>{label}</Text>
      <Text style={styles.roleDescription}>{description}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { error, isLoading, signUp } = useAuthStore();
  const [role, setRole] = useState<RegisterPayload["role"]>("CREATOR");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleCreateAccount() {
    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName || !normalizedEmail || !password) {
      setValidationError("Enter your full name, email, and password.");
      return;
    }

    setValidationError(null);

    try {
      const user = await signUp({
        full_name: normalizedName,
        email: normalizedEmail,
        password,
        role,
      });
      router.replace(getDashboardPath(user.role));
    } catch {
      // The auth store exposes a normalized backend error below the form.
    }
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#6366F1", "#A855F7", "#F43F5E"]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={[styles.hero, { paddingTop: insets.top + 8 }]}
          >
            <LottieView
              autoPlay
              loop
              resizeMode="contain"
              source={connectConfetti}
              style={styles.animation}
            />
            <Text style={styles.brandTitle}>Connect</Text>
            <Text style={styles.brandSubtitle}>The Creator Economy Marketplace</Text>
          </LinearGradient>

          <View style={styles.contentWidth}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.heading}>Join the movement</Text>
                <Text style={styles.subheading}>Select your account type to get started</Text>
              </View>

              <View accessibilityRole="radiogroup" style={styles.roleRow}>
                <RoleCard
                  description="Monetize your influence"
                  icon="sparkles"
                  label="Creator"
                  onPress={() => setRole("CREATOR")}
                  selected={role === "CREATOR"}
                />
                <RoleCard
                  description="Scale your business"
                  icon="briefcase-outline"
                  label="Brand"
                  onPress={() => setRole("BRAND")}
                  selected={role === "BRAND"}
                />
              </View>

              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <View style={styles.inputShell}>
                    <Ionicons color="#94A3B8" name="person-outline" size={21} />
                    <TextInput
                      autoCapitalize="words"
                      autoComplete="name"
                      editable={!isLoading}
                      onChangeText={setFullName}
                      placeholder="Alex Rivera"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      textContentType="name"
                      value={fullName}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Email Address</Text>
                  <View style={styles.inputShell}>
                    <Ionicons color="#94A3B8" name="mail-outline" size={21} />
                    <TextInput
                      autoCapitalize="none"
                      autoComplete="email"
                      editable={!isLoading}
                      keyboardType="email-address"
                      onChangeText={setEmail}
                      placeholder="alex@example.com"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      textContentType="emailAddress"
                      value={email}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Password</Text>
                  <View style={styles.inputShell}>
                    <Ionicons color="#94A3B8" name="lock-closed-outline" size={21} />
                    <TextInput
                      autoCapitalize="none"
                      autoComplete="new-password"
                      editable={!isLoading}
                      onChangeText={setPassword}
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      textContentType="newPassword"
                      value={password}
                    />
                    <Pressable
                      accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                      accessibilityRole="button"
                      hitSlop={10}
                      onPress={() => setShowPassword((current) => !current)}
                    >
                      <Ionicons
                        color="#64748B"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>

              {validationError || error ? (
                <View style={styles.errorBox}>
                  <Ionicons color="#B91C1C" name="alert-circle-outline" size={18} />
                  <Text style={styles.errorText}>{validationError ?? error}</Text>
                </View>
              ) : null}

              <Pressable
                accessibilityRole="button"
                disabled={isLoading}
                onPress={() => void handleCreateAccount()}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryPressed,
                  isLoading && styles.disabled,
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Create Account</Text>
                    <Ionicons color="#FFFFFF" name="arrow-forward" size={20} />
                  </>
                )}
              </Pressable>

              <Pressable
                accessibilityRole="button"
                disabled={isLoading}
                onPress={() => router.push("/(auth)/login")}
                style={({ pressed }) => [styles.signInLink, pressed && styles.pressed]}
              >
                <Text style={styles.signInLinkText}>Already have an account? Sign in</Text>
              </Pressable>

              <Text style={styles.termsText}>
                By continuing, you agree to our <Text style={styles.termsLink}>Terms of Service</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  hero: {
    minHeight: 272,
    alignItems: "center",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
    paddingBottom: 45,
    paddingHorizontal: 24,
  },
  animation: {
    height: 118,
    width: 240,
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1,
    textShadowColor: "rgba(15, 23, 42, 0.14)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  brandSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
  contentWidth: {
    alignSelf: "center",
    maxWidth: 520,
    paddingHorizontal: 16,
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: -31,
    paddingHorizontal: 20,
    paddingBottom: 27,
    paddingTop: 27,
    shadowColor: "#4338CA",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 8,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 22,
  },
  heading: {
    color: "#0F172A",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subheading: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 7,
    textAlign: "center",
  },
  roleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  roleCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 20,
    borderWidth: 1.5,
    flex: 1,
    minHeight: 158,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  roleCardSelected: {
    backgroundColor: "#FAFAFF",
    borderColor: "#6366F1",
  },
  roleIcon: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
    width: 50,
  },
  roleIconSelected: {
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  roleTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  roleDescription: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
    textAlign: "center",
  },
  radioOuter: {
    alignItems: "center",
    borderColor: "#CBD5E1",
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: "center",
    marginTop: 9,
    width: 18,
  },
  radioOuterSelected: {
    borderColor: "#6366F1",
  },
  radioInner: {
    backgroundColor: "#6366F1",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  form: {
    gap: 17,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  inputShell: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 54,
    paddingHorizontal: 15,
  },
  input: {
    color: "#0F172A",
    flex: 1,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 11,
    paddingVertical: 0,
  },
  errorBox: {
    alignItems: "flex-start",
    backgroundColor: "#FEF2F2",
    borderRadius: 13,
    flexDirection: "row",
    gap: 8,
    marginTop: 17,
    padding: 11,
  },
  errorText: {
    color: "#B91C1C",
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 17,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    marginTop: 23,
    minHeight: 56,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryPressed: {
    backgroundColor: "#4F46E5",
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  signInLink: {
    alignItems: "center",
    paddingVertical: 18,
  },
  signInLinkText: {
    color: "#6366F1",
    fontSize: 14,
    fontWeight: "800",
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  divider: {
    backgroundColor: "#E2E8F0",
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "800",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 17,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    minHeight: 50,
  },
  socialButtonText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },
  adminLink: {
    alignItems: "center",
    paddingTop: 22,
  },
  adminText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  adminLinkText: {
    color: "#6366F1",
    fontWeight: "800",
  },
  termsText: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 14,
    textAlign: "center",
  },
  termsLink: {
    color: "#64748B",
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.68,
  },
});
