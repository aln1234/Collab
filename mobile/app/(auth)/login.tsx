import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../../src/components/layout/screen-container";
import { Button } from "../../src/components/ui/button";
import { ErrorText } from "../../src/components/ui/error-text";
import { Input } from "../../src/components/ui/input";
import { normalizeApiError } from "../../src/lib/api-client";
import { showError, showSuccess } from "../../src/lib/toast";
import { getDashboardPath, useAuthStore } from "../../src/stores/auth-store";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const user = await signIn(email.trim(), password);
      showSuccess("Welcome back", user.full_name || user.email);
      router.replace(getDashboardPath(user.role));
    } catch (caughtError) {
      const apiError = normalizeApiError(caughtError);
      showError("Could not sign in", apiError.message);
    }
  }

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.brand}>Connect</Text>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Use your creator, brand, or admin account.</Text>
      </View>

      <View style={styles.form}>
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
          placeholder="Your password"
          secureTextEntry
          value={password}
        />
        <ErrorText message={error} />
        <Button disabled={!email || !password} loading={isLoading} onPress={handleLogin}>
          Sign in
        </Button>
      </View>

      <Text style={styles.footerText}>
        New to Connect?{" "}
        <Link href="/(auth)/register" style={styles.link}>
          Create an account
        </Link>
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 28,
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
