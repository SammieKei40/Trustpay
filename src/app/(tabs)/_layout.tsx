import "../global.css";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import {
  TabHomeIcon,
  TabCardIcon,
  TabScanIcon,
  TabActivityIcon,
  TabProfileIcon,
} from "../../components/ui/icons";

// ─── Tab Config ───────────────────────────────────────────────────────────────

interface TabConfig {
  name: string;
  label: string;
  center?: boolean;
  Icon: (props: { color: string; filled?: boolean }) => React.ReactElement;
}

const TAB_CONFIG: TabConfig[] = [
  { name: "index",    label: "Home",    Icon: TabHomeIcon },
  { name: "card",     label: "My Card", Icon: TabCardIcon },
  { name: "scan",     label: "",        Icon: TabScanIcon, center: true },
  { name: "activity", label: "Activity",Icon: TabActivityIcon },
  { name: "profile",  label: "Profile", Icon: TabProfileIcon },
];

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const bgColor     = isDark ? "#1E293B" : "#FFFFFF";
  const borderColor = isDark ? "#424242" : "#EEEEEE";

  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderTopWidth: 1,
        borderTopColor: borderColor,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingTop: 10,
        paddingBottom: Math.max(insets.bottom, 12),
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const config = TAB_CONFIG.find((c) => c.name === route.name);
        if (!config) return null; // skip hidden screens (e.g. settings)

        const isFocused = state.index === index;
        const color     = isFocused ? "#2667FF" : isDark ? "#757575" : "#9E9E9E";

        if (config.center) {
          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 29,
                  backgroundColor: "#2667FF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -24,
                  shadowColor: "#2667FF",
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.45,
                  shadowRadius: 14,
                  elevation: 10,
                }}
              >
                <config.Icon color="#FFFFFF" />
              </View>
            </Pressable>
          );
        }

        const showDot = config.name === "activity";

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 2,
              gap: 4,
            }}
          >
            <View style={{ position: "relative" }}>
              <config.Icon color={color} filled={isFocused} />
              {showDot && !isFocused && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -1,
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: "#2667FF",
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 14,
                color,
                fontFamily: isFocused ? "Inter_600SemiBold" : "Inter_400Regular",
              }}
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="card" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
