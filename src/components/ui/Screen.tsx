import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}

export function Screen({ children, scroll = false, className = "" }: ScreenProps) {
  const insets = useSafeAreaInsets();

  const safeStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const base = `flex-1 bg-bg ${className}`.trim();

  if (scroll) {
    return (
      <View className={base} style={safeStyle}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View className={base} style={safeStyle}>
      {children}
    </View>
  );
}
