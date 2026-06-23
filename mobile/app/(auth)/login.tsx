import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

import { getDashboardPath, useAuthStore } from "../../src/stores/auth-store";

export default function LoginScreen() {
  const router = useRouter();
  const { error, isLoading, signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSignIn() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setValidationError("Enter your email and password.");
      return;
    }

    setValidationError(null);

    try {
      const user = await signIn(normalizedEmail, password);
      router.replace(getDashboardPath(user.role));
    } catch {
      // The auth store exposes a normalized backend error below the form.
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons color="#334155" name="arrow-back" size={22} />
          </Pressable>

          <LinearGradient colors={["#6366F1", "#A855F7", "#F43F5E"]} style={styles.logo}>
            <Ionicons color="#FFFFFF" name="link" size={33} />
          </LinearGradient>
          <Text style={styles.brand}>Connect</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue to your workspace.</Text>

          <View style={styles.formCard}>
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
                  onSubmitEditing={() => undefined}
                  placeholder="alex@example.com"
                  placeholderTextColor="#94A3B8"
                  returnKeyType="next"
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
                  autoComplete="current-password"
                  editable={!isLoading}
                  onChangeText={setPassword}
                  onSubmitEditing={() => void handleSignIn()}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  returnKeyType="done"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  textContentType="password"
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

            {validationError || error ? (
              <View style={styles.errorBox}>
                <Ionicons color="#B91C1C" name="alert-circle-outline" size={18} />
                <Text style={styles.errorText}>{validationError ?? error}</Text>
              </View>
            ) : null}

            <Pressable
              accessibilityRole="button"
              disabled={isLoading}
              onPress={() => void handleSignIn()}
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
                  <Text style={styles.primaryButtonText}>Sign In</Text>
                  <Ionicons color="#FFFFFF" name="arrow-forward" size={20} />
                </>
              )}
            </Pressable>

            <Pressable
              accessibilityRole="button"
              disabled={isLoading}
              onPress={() => router.push("/(auth)/register")}
              style={({ pressed }) => [styles.registerLink, pressed && styles.pressed]}
            >
              <Text style={styles.registerText}>
                New to Connect? <Text style={styles.registerLinkText}>Create an account</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: {
    alignItems: "center",
    alignSelf: "center",
    flexGrow: 1,
    justifyContent: "center",
    maxWidth: 520,
    paddingBottom: 30,
    paddingHorizontal: 22,
    paddingTop: 70,
    width: "100%",
  },
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 17,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    left: 22,
    position: "absolute",
    top: 18,
    width: 44,
  },
  logo: {
    alignItems: "center",
    borderRadius: 25,
    elevation: 6,
    height: 76,
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.22,
    shadowRadius: 15,
    width: 76,
  },
  brand: {
    color: "#6366F1",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginTop: 18,
    textTransform: "uppercase",
  },
  title: {
    color: "#0F172A",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: { color: "#64748B", fontSize: 13, marginTop: 8, textAlign: "center" },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 26,
    borderWidth: 1,
    gap: 17,
    marginTop: 27,
    padding: 20,
    width: "100%",
  },
  field: { gap: 8 },
  fieldLabel: { color: "#334155", fontSize: 13, fontWeight: "700" },
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
    padding: 11,
  },
  errorText: { color: "#B91C1C", flex: 1, fontSize: 12, lineHeight: 18 },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 17,
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    minHeight: 56,
  },
  primaryPressed: { backgroundColor: "#4F46E5" },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  registerLink: { alignItems: "center", paddingTop: 2 },
  registerText: { color: "#64748B", fontSize: 13 },
  registerLinkText: { color: "#6366F1", fontWeight: "800" },
  disabled: { opacity: 0.65 },
  pressed: { opacity: 0.68 },
});
