import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../../src/components/layout/screen-container";
import { Button } from "../../src/components/ui/button";
import { ErrorText } from "../../src/components/ui/error-text";
import { Input } from "../../src/components/ui/input";
import type { RegisterPayload } from "../../src/features/auth/types";
import { normalizeApiError } from "../../src/lib/api-client";
import { showError, showSuccess } from "../../src/lib/toast";
import { getDashboardPath, useAuthStore } from "../../src/stores/auth-store";

type RegisterRole = RegisterPayload["role"];

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RegisterRole>("CREATOR");

  async function handleRegister() {
    try {
      const user = await signUp({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        role,
      });
      showSuccess("Account created", "Welcome to Connect");
      router.replace(getDashboardPath(user.role));
    } catch (caughtError) {
      const apiError = normalizeApiError(caughtError);
      showError("Could not create account", apiError.message);
    }
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.brand}>Connect</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Start as a creator or brand. Admins are created separately.</Text>
      </View>

      <View style={styles.form}>
        <Input
          autoCapitalize="words"
          label="Full name"
          onChangeText={setFullName}
          placeholder="Your name"
          value={fullName}
        />
        <Input
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          value={email}
        />
        <Input
          autoCapitalize="none"
          label="Password"
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          value={password}
        />

        <View style={styles.roleGroup}>
          <Text style={styles.roleLabel}>Account type</Text>
          <View style={styles.roleButtons}>
            <Button
              onPress={() => setRole("CREATOR")}
              variant={role === "CREATOR" ? "primary" : "secondary"}
            >
              Creator
            </Button>
            <Button
              onPress={() => setRole("BRAND")}
              variant={role === "BRAND" ? "primary" : "secondary"}
            >
              Brand
            </Button>
          </View>
        </View>

        <ErrorText message={error} />
        <Button
          disabled={!fullName || !email || !password}
          loading={isLoading}
          onPress={handleRegister}
        >
          Create account
        </Button>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href="/(auth)/login" style={styles.link}>
          Sign in
        </Link>
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 28,
    marginTop: 18,
  },
  brand: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "800",
  },
  title: {
    color: "#0f172a",
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  roleGroup: {
    gap: 10,
  },
  roleLabel: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },
  roleButtons: {
    flexDirection: "row",
    gap: 10,
  },
  footerText: {
    color: "#475569",
    fontSize: 15,
    marginTop: 24,
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    fontWeight: "800",
  },
});
