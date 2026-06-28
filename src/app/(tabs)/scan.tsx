import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function ScanScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
        paddingTop: insets.top,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Inter_700Bold",
          color: isDark ? "#FFFFFF" : "#0F172A",
        }}
      >
        Scan & Pay
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_400Regular",
          color: "#9E9E9E",
          marginTop: 8,
        }}
      >
        Coming soon
      </Text>
    </View>
  );
}
