import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  { title: "Content approved", text: "Summer Glow Series has been approved.", time: "5m", icon: "checkmark-circle", color: "#10B981", background: "#D1FAE5" },
  { title: "New application", text: "A creator applied to your active campaign.", time: "1h", icon: "person-add", color: "#6366F1", background: "#E0E7FF" },
  { title: "Revision requested", text: "A new content revision is ready to review.", time: "3h", icon: "refresh", color: "#F59E0B", background: "#FEF3C7" },
  { title: "Payment update", text: "A payment moved to pending status.", time: "1d", icon: "wallet", color: "#0EA5E9", background: "#E0F2FE" },
];

export function PrototypeNotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Ionicons color="#334155" name="arrow-back" size={22} />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <Pressable accessibilityRole="button" onPress={() => undefined}>
          <Text style={styles.markRead}>Mark all read</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>RECENT</Text>
        <View style={styles.list}>
          {notifications.map((item, index) => (
            <View key={item.title} style={styles.notificationCard}>
              <View style={[styles.icon, { backgroundColor: item.background }]}>
                <Ionicons color={item.color} name={item.icon as "wallet"} size={21} />
              </View>
              <View style={styles.copy}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationText}>{item.text}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
              {index < 2 ? <View style={styles.unreadDot} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 },
  header: { alignItems: "center", backgroundColor: "#FFFFFF", borderBottomColor: "#E2E8F0", borderBottomWidth: 1, flexDirection: "row", minHeight: 64, paddingHorizontal: 17 },
  backButton: { alignItems: "center", height: 40, justifyContent: "center", width: 40 },
  title: { color: "#0F172A", flex: 1, fontSize: 18, fontWeight: "900", textAlign: "center" },
  markRead: { color: "#6366F1", fontSize: 8, fontWeight: "900", width: 66, textAlign: "right" },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, width: "100%" },
  sectionLabel: { color: "#94A3B8", fontSize: 9, fontWeight: "900", letterSpacing: 1, marginBottom: 12 },
  list: { gap: 11 },
  notificationCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 21, borderWidth: 1, flexDirection: "row", minHeight: 79, padding: 12 },
  icon: { alignItems: "center", borderRadius: 16, height: 46, justifyContent: "center", marginRight: 11, width: 46 },
  copy: { flex: 1, minWidth: 0 },
  notificationTitle: { color: "#0F172A", fontSize: 12, fontWeight: "900" },
  notificationText: { color: "#64748B", fontSize: 9, lineHeight: 14, marginTop: 4 },
  time: { color: "#94A3B8", fontSize: 8, fontWeight: "700", marginLeft: 8 },
  unreadDot: { backgroundColor: "#6366F1", borderRadius: 4, height: 7, position: "absolute", right: 8, top: 8, width: 7 },
});
