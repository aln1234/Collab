import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, type Href } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
type PrototypeRole = "creator" | "brand";

type PrototypeTabBarProps = {
  role: PrototypeRole;
  activeTab: string;
};

type TabItem = {
  label: string;
  icon: IoniconName;
  activeIcon: IoniconName;
  href: Href;
};

const creatorTabs: TabItem[] = [
  { label: "Home", icon: "home-outline", activeIcon: "home", href: "/(creator)/dashboard" },
  { label: "Browse", icon: "compass-outline", activeIcon: "compass", href: "/(creator)/browse-campaigns" },
  { label: "Applications", icon: "documents-outline", activeIcon: "documents", href: "/(creator)/applications" },
  { label: "Messages", icon: "chatbubble-outline", activeIcon: "chatbubble", href: "/(creator)/content-approval-chat" },
  { label: "Profile", icon: "person-outline", activeIcon: "person", href: "/(creator)/profile" },
];

const brandTabs: TabItem[] = [
  { label: "Dashboard", icon: "grid-outline", activeIcon: "grid", href: "/(brand)/dashboard" },
  { label: "Campaigns", icon: "megaphone-outline", activeIcon: "megaphone", href: "/(brand)/campaign-details" },
  { label: "Find Creators", icon: "search-outline", activeIcon: "search", href: "/(brand)/find-creators" },
  { label: "Messages", icon: "chatbubble-outline", activeIcon: "chatbubble", href: "/(brand)/messages" },
  { label: "Profile", icon: "person-outline", activeIcon: "person", href: "/(brand)/profile" },
];

export function PrototypeTabBar({ role, activeTab }: PrototypeTabBarProps) {
  const router = useRouter();
  const tabs = role === "creator" ? creatorTabs : brandTabs;

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const selected = activeTab === tab.label;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={tab.label}
            onPress={() => router.replace(tab.href)}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
              <Ionicons
                color={selected ? "#6366F1" : "#94A3B8"}
                name={selected ? tab.activeIcon : tab.icon}
                size={20}
              />
            </View>
            <Text numberOfLines={1} style={[styles.label, selected && styles.labelSelected]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    flexDirection: "row",
    minHeight: 68,
    paddingHorizontal: 5,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    paddingVertical: 7,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 13,
    height: 30,
    justifyContent: "center",
    width: 36,
  },
  iconWrapSelected: {
    backgroundColor: "#EEF2FF",
  },
  label: {
    color: "#94A3B8",
    fontSize: 7,
    fontWeight: "700",
    marginTop: 3,
    maxWidth: "100%",
  },
  labelSelected: {
    color: "#6366F1",
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.6,
  },
});
