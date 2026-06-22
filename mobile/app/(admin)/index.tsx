import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../../src/components/layout/screen-container";
import { Button } from "../../src/components/ui/button";
import { useAuthStore } from "../../src/stores/auth-store";

export default function AdminScreen() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const name = user?.full_name || user?.email || "Admin";

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.kicker}>Admin</Text>
        <Text style={styles.title}>Welcome back, {name}</Text>
        <Text style={styles.subtitle}>Admin operations mainly happen in Django Admin for now.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Internal tools</Text>
        <Text style={styles.cardText}>
          Use the web Django Admin for managing users, campaigns, applications, submissions, and payments.
        </Text>
      </View>

      <Button variant="secondary" onPress={handleLogout}>
        Sign out
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
    marginTop: 18,
    marginBottom: 24,
  },
  kicker: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    marginBottom: 18,
    padding: 18,
  },
  cardTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
  cardText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
  },
});
