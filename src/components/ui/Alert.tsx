import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export type AlertVariant = "info" | "success" | "warning" | "error";

// ─── Per-variant tokens ───────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  info: {
    iconBg: "#2667FF",
    symbol: "i",
    accentColor: "#2667FF",
    bgLight: "#EFF6FF",
    bgDark: "rgba(38,103,255,0.12)",
    bgFilled: "#1E3A8A",
  },
  success: {
    iconBg: "#12D18E",
    symbol: "✓",
    accentColor: "#12D18E",
    bgLight: "#F0FDF9",
    bgDark: "rgba(18,209,142,0.12)",
    bgFilled: "#14532D",
  },
  warning: {
    iconBg: "#FACC15",
    symbol: "!",
    accentColor: "#B45309",
    bgLight: "#FFFBEB",
    bgDark: "rgba(250,204,21,0.12)",
    bgFilled: "#78350F",
  },
  error: {
    iconBg: "#F75555",
    symbol: "×",
    accentColor: "#F75555",
    bgLight: "#FEF2F2",
    bgDark: "rgba(247,85,85,0.12)",
    bgFilled: "#7F1D1D",
  },
} as const;

// ─── Alert component ──────────────────────────────────────────────────────────

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  visible?: boolean;
  filled?: boolean;
}

export function Alert({
  variant = "info",
  title,
  message,
  dismissible = true,
  onDismiss,
  visible = true,
  filled = false,
}: AlertProps) {
  const { isDark } = useTheme();
  const [dismissed, setDismissed] = useState(false);
  const cfg = VARIANT_CONFIG[variant];

  if (!visible || dismissed) return null;

  const bg = filled ? cfg.bgFilled : isDark ? cfg.bgDark : cfg.bgLight;
  const titleColor = filled ? "#FFFFFF" : cfg.accentColor;
  const messageColor = filled ? "rgba(255,255,255,0.7)" : cfg.accentColor;
  const circleColor = filled ? "rgba(255,255,255,0.2)" : cfg.iconBg;

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <View
      style={{ backgroundColor: bg, borderRadius: 12 }}
      className="flex-row items-start px-4 py-3.5 gap-3"
    >
      {/* Filled circle indicator */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: circleColor,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <Text
          style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700", lineHeight: 14 }}
        >
          {cfg.symbol}
        </Text>
      </View>

      {/* Text content */}
      <View className="flex-1">
        <Text style={{ color: titleColor }} className="font-inter-semibold text-t-14">
          {title}
        </Text>
        {message ? (
          <Text style={{ color: messageColor }} className="font-inter-regular text-t-12 mt-0.5">
            {message}
          </Text>
        ) : null}
      </View>

      {/* Dismiss button */}
      {dismissible && (
        <Pressable onPress={handleDismiss} hitSlop={8} className="mt-0.5">
          <View
            style={{
              width: 18,
              height: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: filled ? "rgba(255,255,255,0.5)" : isDark ? "#757575" : "#9E9E9E",
                fontSize: 16,
                lineHeight: 18,
              }}
            >
              ✕
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

// ─── AlertStack ───────────────────────────────────────────────────────────────

interface AlertItem {
  id: string;
  variant: AlertVariant;
  title: string;
  message?: string;
  filled?: boolean;
}

interface AlertStackProps {
  alerts: AlertItem[];
  dismissible?: boolean;
}

export function AlertStack({ alerts, dismissible = true }: AlertStackProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  return (
    <View className="gap-3">
      {alerts
        .filter((a) => !dismissed.includes(a.id))
        .map((a) => (
          <Alert
            key={a.id}
            variant={a.variant}
            title={a.title}
            message={a.message}
            filled={a.filled}
            dismissible={dismissible}
            onDismiss={() => setDismissed((prev) => [...prev, a.id])}
          />
        ))}
    </View>
  );
}
