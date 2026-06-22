import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../../src/components/layout/screen-container";
import { Button } from "../../src/components/ui/button";
import { useAuthStore } from "../../src/stores/auth-store";

export default function BrandDashboardScreen() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const name = user?.full_name || user?.email || "Brand";

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.kicker}>Brand dashboard</Text>
        <Text style={styles.title}>Welcome back, {name}</Text>
        <Text style={styles.subtitle}>Manage campaigns, applications, submissions, and payments.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Campaigns coming next</Text>
        <Text style={styles.cardText}>
          Mobile campaign CRUD will use the same Django API as the web app.
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
