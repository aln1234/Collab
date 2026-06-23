import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubmitContentScreen() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
        <View style={styles.header}><Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.headerButton}><Ionicons color="#334155" name="arrow-back" size={22} /></Pressable><Text style={styles.headerTitle}>Submit Content</Text><View style={styles.headerButton} /></View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.campaignCard}><View style={styles.campaignIcon}><Ionicons color="#F43F5E" name="sunny-outline" size={25} /></View><View><Text style={styles.campaignTitle}>Summer Glow Series</Text><Text style={styles.campaignMeta}>TikTok transition video • Due today</Text></View></View>
          <Text style={styles.sectionTitle}>Upload your content</Text>
          <Pressable accessibilityRole="button" onPress={() => undefined} style={styles.upload}><View style={styles.uploadIcon}><Ionicons color="#6366F1" name="cloud-upload-outline" size={31} /></View><Text style={styles.uploadTitle}>Choose a file to upload</Text><Text style={styles.uploadText}>Video or image up to 250 MB</Text><View style={styles.choose}><Text style={styles.chooseText}>Browse Files</Text></View></Pressable>
          <View style={styles.field}><Text style={styles.label}>Published Link</Text><View style={styles.inputShell}><Ionicons color="#94A3B8" name="link-outline" size={19} /><TextInput autoCapitalize="none" onChangeText={setLink} placeholder="https://tiktok.com/@you/video…" placeholderTextColor="#94A3B8" style={styles.input} value={link} /></View></View>
          <View style={styles.field}><Text style={styles.label}>Message to Brand</Text><TextInput multiline onChangeText={setMessage} placeholder="Share notes about your submission…" placeholderTextColor="#94A3B8" style={[styles.inputShell, styles.messageInput]} textAlignVertical="top" value={message} /></View>
          <View style={styles.tip}><Ionicons color="#F59E0B" name="bulb-outline" size={19} /><Text style={styles.tipText}>Double-check that your logo placement, captions and required tags match the campaign brief.</Text></View>
        </ScrollView>
        <View style={styles.bottom}><Pressable accessibilityRole="button" onPress={() => router.push("/(creator)/content-approval-chat")} style={styles.submit}><Text style={styles.submitText}>Submit Content</Text><Ionicons color="#FFFFFF" name="arrow-forward" size={18} /></Pressable></View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F8FAFC", flex: 1 }, keyboard: { flex: 1 }, header: { alignItems: "center", backgroundColor: "#FFFFFF", borderBottomColor: "#E2E8F0", borderBottomWidth: 1, flexDirection: "row", minHeight: 64, paddingHorizontal: 16 }, headerButton: { alignItems: "center", height: 40, justifyContent: "center", width: 40 }, headerTitle: { color: "#0F172A", flex: 1, fontSize: 17, fontWeight: "900", textAlign: "center" },
  content: { alignSelf: "center", maxWidth: 560, padding: 20, paddingBottom: 28, width: "100%" }, campaignCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 20, borderWidth: 1, flexDirection: "row", padding: 12 }, campaignIcon: { alignItems: "center", backgroundColor: "#FCE7F3", borderRadius: 16, height: 48, justifyContent: "center", marginRight: 11, width: 48 }, campaignTitle: { color: "#0F172A", fontSize: 13, fontWeight: "900" }, campaignMeta: { color: "#64748B", fontSize: 8, marginTop: 4 }, sectionTitle: { color: "#0F172A", fontSize: 19, fontWeight: "900", marginBottom: 12, marginTop: 24 },
  upload: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#C7D2FE", borderRadius: 24, borderStyle: "dashed", borderWidth: 1.5, padding: 23 }, uploadIcon: { alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 21, height: 52, justifyContent: "center", width: 52 }, uploadTitle: { color: "#0F172A", fontSize: 13, fontWeight: "900", marginTop: 11 }, uploadText: { color: "#64748B", fontSize: 8, marginTop: 4 }, choose: { backgroundColor: "#6366F1", borderRadius: 13, marginTop: 12, paddingHorizontal: 12, paddingVertical: 8 }, chooseText: { color: "#FFFFFF", fontSize: 8, fontWeight: "900" },
  field: { gap: 8, marginTop: 18 }, label: { color: "#334155", fontSize: 11, fontWeight: "900" }, inputShell: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 17, borderWidth: 1, flexDirection: "row", minHeight: 53, paddingHorizontal: 13 }, input: { color: "#0F172A", flex: 1, fontSize: 11, minHeight: 51, paddingHorizontal: 9 }, messageInput: { alignItems: "flex-start", color: "#0F172A", flexDirection: "column", fontSize: 11, minHeight: 105, paddingTop: 14 }, tip: { alignItems: "center", backgroundColor: "#FFFBEB", borderColor: "#FDE68A", borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 9, marginTop: 18, padding: 12 }, tipText: { color: "#92400E", flex: 1, fontSize: 8, lineHeight: 13 },
  bottom: { backgroundColor: "#FFFFFF", borderTopColor: "#E2E8F0", borderTopWidth: 1, padding: 14 }, submit: { alignItems: "center", backgroundColor: "#6366F1", borderRadius: 17, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 54 }, submitText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
});
