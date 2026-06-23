import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
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

import { useAuthStore } from "../../src/stores/auth-store";

function Timestamp({ children, outgoing = false }: { children: string; outgoing?: boolean }) {
  return (
    <Text style={[styles.timestamp, outgoing && styles.outgoingTimestamp]}>{children}</Text>
  );
}

export default function ContentApprovalChatScreen() {
  const router = useRouter();
  const isBrand = useAuthStore((state) => state.user?.role === "BRAND");
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={4}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
          >
            <Ionicons color="#334155" name="arrow-back" size={23} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Summer Glow Campaign
            </Text>
            <Text style={styles.headerSubtitle}>with Elena Styles</Text>
          </View>
          <Pressable
            accessibilityLabel="Campaign information"
            accessibilityRole="button"
            onPress={() => undefined}
            style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
          >
            <Ionicons color="#6366F1" name="information-circle-outline" size={24} />
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTopRow}>
            <View>
              <Text style={styles.progressTitle}>Content Approval</Text>
              <Text style={styles.progressStep}>Step 3 of 5</Text>
            </View>
            <View style={styles.reviewPill}>
              <View style={styles.reviewDot} />
              <Text style={styles.reviewText}>IN REVIEW</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.chatContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.datePill}>
            <Text style={styles.dateText}>August 24, 2023</Text>
          </View>

          <View style={styles.incomingGroup}>
            <View style={styles.senderRow}>
              <LinearGradient colors={["#FCE7F3", "#F43F5E"]} style={styles.senderAvatar}>
                <Text style={styles.senderAvatarText}>ES</Text>
              </LinearGradient>
              <Text style={styles.senderName}>Elena Styles</Text>
            </View>
            <View style={styles.incomingBubble}>
              <Text style={styles.incomingText}>
                Hey! I&apos;ve finished the first draft of the TikTok transition video. Let me know
                what you think of the lighting.
              </Text>
            </View>
            <Timestamp>09:15 AM</Timestamp>
          </View>

          <View style={styles.fileMessageGroup}>
            <View style={styles.fileCard}>
              <View style={styles.fileTitleRow}>
                <View style={styles.fileTypeIcon}>
                  <Ionicons color="#6366F1" name="videocam" size={18} />
                </View>
                <Text numberOfLines={1} style={styles.fileCardTitle}>
                  Draft_v1_Elena.mp4
                </Text>
                <Pressable
                  accessibilityLabel="More file options"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => undefined}
                >
                  <Ionicons color="#94A3B8" name="ellipsis-horizontal" size={19} />
                </Pressable>
              </View>
              <View style={styles.innerFileRow}>
                <LinearGradient colors={["#6366F1", "#EC4899"]} style={styles.videoThumb}>
                  <Ionicons color="#FFFFFF" name="play" size={18} />
                </LinearGradient>
                <View style={styles.innerFileCopy}>
                  <Text numberOfLines={1} style={styles.innerFileName}>
                    Summer_Glow_Draft.mp4
                  </Text>
                  <Text style={styles.fileSize}>12.4 MB</Text>
                </View>
                <View style={styles.downloadButton}>
                  <Ionicons color="#6366F1" name="download-outline" size={18} />
                </View>
              </View>
            </View>
            <Timestamp>09:16 AM</Timestamp>
          </View>

          <View style={styles.outgoingGroup}>
            <View style={styles.outgoingBubble}>
              <Text style={styles.outgoingText}>
                This looks amazing, Elena! The transition at 0:05 is very smooth. Could we just
                make the product logo slightly more visible in the final shot?
              </Text>
            </View>
            <Timestamp outgoing>10:30 AM</Timestamp>
          </View>

          <View style={styles.incomingGroup}>
            <View style={styles.senderRow}>
              <LinearGradient colors={["#FCE7F3", "#F43F5E"]} style={styles.senderAvatar}>
                <Text style={styles.senderAvatarText}>ES</Text>
              </LinearGradient>
              <Text style={styles.senderName}>Elena Styles</Text>
            </View>
            <View style={styles.incomingBubble}>
              <Text style={styles.incomingText}>
                Absolutely! I&apos;ll adjust the framing for the end card and re-upload.
              </Text>
            </View>
            <Timestamp>10:32 AM</Timestamp>
          </View>
        </ScrollView>

        <View style={styles.composer}>
          {isBrand ? (
            <View style={styles.approvalActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => undefined}
                style={({ pressed }) => [styles.approveButton, pressed && styles.approvePressed]}
              >
                <Ionicons color="#FFFFFF" name="checkmark-circle-outline" size={18} />
                <Text style={styles.approveText}>Approve Content</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => undefined}
                style={({ pressed }) => [styles.revisionButton, pressed && styles.revisionPressed]}
              >
                <Ionicons color="#6366F1" name="refresh-outline" size={17} />
                <Text style={styles.revisionText}>Request Revision</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.messageRow}>
            <Pressable
              accessibilityLabel="Add attachment"
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            >
              <Ionicons color="#64748B" name="add" size={24} />
            </Pressable>
            <View style={styles.messageInputShell}>
              <TextInput
                multiline
                onChangeText={setMessage}
                placeholder="Discuss revisions…"
                placeholderTextColor="#94A3B8"
                style={styles.messageInput}
                value={message}
              />
            </View>
            <Pressable
              accessibilityLabel="Send message"
              accessibilityRole="button"
              onPress={() => undefined}
              style={({ pressed }) => [styles.sendButton, pressed && styles.sendPressed]}
            >
              <Ionicons color="#FFFFFF" name="send" size={18} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 66,
    paddingHorizontal: 15,
  },
  headerButton: {
    alignItems: "center",
    borderRadius: 18,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  headerCopy: {
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 3,
  },
  progressSection: {
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  progressTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
  },
  progressStep: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 3,
  },
  reviewPill: {
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  reviewDot: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  reviewText: {
    color: "#059669",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  progressTrack: {
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    height: 7,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    height: "100%",
    width: "60%",
  },
  chatContent: {
    alignSelf: "center",
    maxWidth: 560,
    paddingBottom: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
    width: "100%",
  },
  datePill: {
    alignSelf: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 13,
    marginBottom: 22,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  dateText: {
    color: "#64748B",
    fontSize: 8,
    fontWeight: "800",
  },
  incomingGroup: {
    alignSelf: "flex-start",
    marginBottom: 19,
    maxWidth: "86%",
  },
  senderRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    marginBottom: 7,
  },
  senderAvatar: {
    alignItems: "center",
    borderRadius: 13,
    height: 27,
    justifyContent: "center",
    width: 27,
  },
  senderAvatarText: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "900",
  },
  senderName: {
    color: "#334155",
    fontSize: 9,
    fontWeight: "800",
  },
  incomingBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 19,
    borderTopLeftRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  incomingText: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 19,
  },
  timestamp: {
    color: "#94A3B8",
    fontSize: 8,
    fontWeight: "600",
    marginLeft: 5,
    marginTop: 5,
  },
  outgoingTimestamp: {
    marginLeft: 0,
    marginRight: 5,
    textAlign: "right",
  },
  fileMessageGroup: {
    alignSelf: "flex-start",
    marginBottom: 20,
    maxWidth: "89%",
    width: 310,
  },
  fileCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 19,
    borderWidth: 1,
    padding: 12,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  fileTitleRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  fileTypeIcon: {
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 11,
    height: 33,
    justifyContent: "center",
    marginRight: 8,
    width: 33,
  },
  fileCardTitle: {
    color: "#0F172A",
    flex: 1,
    fontSize: 10,
    fontWeight: "900",
  },
  innerFileRow: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 10,
    padding: 8,
  },
  videoThumb: {
    alignItems: "center",
    borderRadius: 10,
    height: 42,
    justifyContent: "center",
    width: 50,
  },
  innerFileCopy: {
    flex: 1,
    marginLeft: 9,
    minWidth: 0,
  },
  innerFileName: {
    color: "#334155",
    fontSize: 9,
    fontWeight: "800",
  },
  fileSize: {
    color: "#94A3B8",
    fontSize: 8,
    fontWeight: "600",
    marginTop: 3,
  },
  downloadButton: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  outgoingGroup: {
    alignSelf: "flex-end",
    marginBottom: 20,
    maxWidth: "86%",
  },
  outgoingBubble: {
    backgroundColor: "#6366F1",
    borderRadius: 19,
    borderTopRightRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  outgoingText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 19,
  },
  composer: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 14,
    paddingTop: 11,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  approvalActions: {
    flexDirection: "row",
    gap: 9,
  },
  approveButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 15,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 43,
  },
  approvePressed: {
    backgroundColor: "#4F46E5",
  },
  approveText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  revisionButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#C7D2FE",
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 43,
  },
  revisionPressed: {
    backgroundColor: "#EEF2FF",
  },
  revisionText: {
    color: "#6366F1",
    fontSize: 10,
    fontWeight: "900",
  },
  messageRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  messageInputShell: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 12,
  },
  messageInput: {
    color: "#0F172A",
    fontSize: 11,
    maxHeight: 84,
    minHeight: 40,
    paddingVertical: 11,
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 18,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  sendPressed: {
    backgroundColor: "#4F46E5",
  },
  pressed: {
    opacity: 0.65,
  },
});
