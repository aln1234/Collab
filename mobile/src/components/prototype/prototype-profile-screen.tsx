import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { useAuthStore } from "../../stores/auth-store";
import { PrototypeTabBar } from "./prototype-tab-bar";

export function PrototypeProfileScreen({ role }: { role: "creator" | "brand" }) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const isCreator = role === "creator";

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  function confirmLogout() {
    Alert.alert(
      "Log out?",
      "You will need to sign in again to access your workspace.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => void handleLogout(),
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile &amp; Settings</Text>
          <Pressable accessibilityRole="button" onPress={() => undefined} style={styles.editButton}>
            <Ionicons color="#6366F1" name="create-outline" size={20} />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <LinearGradient
            colors={isCreator ? ["#F43F5E", "#A855F7"] : ["#6366F1", "#0EA5E9"]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{isCreator ? "SS" : "UB"}</Text>
          </LinearGradient>
          <Text style={styles.name}>{isCreator ? "Sarah Styles" : "Connect Brand"}</Text>
          <Text style={styles.roleText}>{isCreator ? "Creator account" : "Premium brand account"}</Text>
          <View style={styles.verifiedPill}>
            <Ionicons color="#10B981" name="checkmark-circle" size={14} />
            <Text style={styles.verifiedText}>Verified profile</Text>
          </View>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons color="#6366F1" name="notifications-outline" size={21} />
            </View>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Campaign and message updates</Text>
            </View>
            <Switch
              ios_backgroundColor="#CBD5E1"
              onValueChange={setNotificationsEnabled}
              thumbColor="#FFFFFF"
              trackColor={{ false: "#CBD5E1", true: "#6366F1" }}
              value={notificationsEnabled}
            />
          </View>
          <View style={styles.divider} />
          {[
            ["card-outline", "Billing & Payments"],
            ["shield-checkmark-outline", "Privacy & Security"],
            ["help-circle-outline", "Help Center"],
          ].map(([icon, label]) => (
            <Pressable
              accessibilityRole="button"
              key={label}
              onPress={() => undefined}
              style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}
            >
              <View style={styles.settingIcon}>
                <Ionicons color="#6366F1" name={icon as "card-outline"} size={21} />
              </View>
              <Text style={styles.settingTitle}>{label}</Text>
              <Ionicons color="#94A3B8" name="chevron-forward" size={18} />
            </Pressable>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => undefined}
          style={({ pressed }) => [styles.saveButton, pressed && styles.savePressed]}
        >
          <Text style={styles.saveText}>Save Settings</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={confirmLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        >
          <Ionicons color="#DC2626" name="log-out-outline" size={19} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
      <PrototypeTabBar activeTab="Profile" role={role} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  scrollContent: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 30, width: "100%" },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 22 },
  title: { color: "#0F172A", fontSize: 27, fontWeight: "900", letterSpacing: -0.7 },
  editButton: { alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 17, height: 40, justifyContent: "center", width: 40 },
  profileCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 27, borderWidth: 1, padding: 22 },
  avatar: { alignItems: "center", borderRadius: 42, height: 84, justifyContent: "center", width: 84 },
  avatarText: { color: "#FFFFFF", fontSize: 23, fontWeight: "900" },
  name: { color: "#0F172A", fontSize: 20, fontWeight: "900", marginTop: 13 },
  roleText: { color: "#64748B", fontSize: 11, fontWeight: "600", marginTop: 4 },
  verifiedPill: { alignItems: "center", backgroundColor: "#D1FAE5", borderRadius: 12, flexDirection: "row", gap: 5, marginTop: 11, paddingHorizontal: 9, paddingVertical: 6 },
  verifiedText: { color: "#059669", fontSize: 8, fontWeight: "900" },
  settingsCard: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 25, borderWidth: 1, marginTop: 20, overflow: "hidden", paddingHorizontal: 15 },
  settingRow: { alignItems: "center", flexDirection: "row", minHeight: 69, paddingVertical: 10 },
  settingIcon: { alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 14, height: 40, justifyContent: "center", marginRight: 11, width: 40 },
  settingCopy: { flex: 1 },
  settingTitle: { color: "#0F172A", flex: 1, fontSize: 12, fontWeight: "900" },
  settingSubtitle: { color: "#64748B", fontSize: 8, marginTop: 3 },
  divider: { backgroundColor: "#E2E8F0", height: 1 },
  saveButton: { alignItems: "center", backgroundColor: "#6366F1", borderRadius: 17, marginTop: 20, minHeight: 54, justifyContent: "center" },
  savePressed: { backgroundColor: "#4F46E5" },
  saveText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  logoutButton: { alignItems: "center", borderColor: "#FECACA", borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 11, minHeight: 50 },
  logoutText: { color: "#DC2626", fontSize: 12, fontWeight: "900" },
  pressed: { opacity: 0.65 },
});
