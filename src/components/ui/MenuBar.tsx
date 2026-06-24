import React from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "react-native-iconly";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MenuBarItem {
  key: string;
  label: string;
  icon: (color: string) => React.ReactNode;
  iconBg?: string;
  badge?: number;
  destructive?: boolean;
}

interface MenuBarProps {
  items: MenuBarItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  userName?: string;
  userRole?: string;
  avatarLabel?: string;
  footer?: React.ReactNode;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ label, size = 52 }: { label: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#2667FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "700", lineHeight: 24 }}
      >
        {label.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}

// ─── Menu Item Row ────────────────────────────────────────────────────────────

function MenuItem({
  item,
  active,
  onPress,
}: {
  item: MenuBarItem;
  active: boolean;
  onPress: () => void;
}) {
  const iconBg = item.iconBg ?? (active ? "rgba(38,103,255,0.12)" : "#F5F5F5");
  const iconColor = item.destructive ? "#F75555" : active ? "#2667FF" : "#616161";
  const chevronColor = active ? "#2667FF" : "#BDBDBD";
  const labelClass = item.destructive
    ? "text-error"
    : active
    ? "text-primary"
    : "text-fg";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-3 py-3 rounded-xl ${
        active ? "bg-primary/10" : ""
      }`}
    >
      {/* Icon container */}
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon(iconColor)}
      </View>

      {/* Label */}
      <Text className={`flex-1 text-t-14 font-inter-medium ${labelClass}`}>
        {item.label}
      </Text>

      {/* Badge */}
      {item.badge != null && (
        <View className="bg-error rounded-full min-w-[20px] h-5 px-1.5 items-center justify-center">
          <Text className="text-white text-[10px] font-inter-bold">
            {item.badge > 99 ? "99+" : item.badge}
          </Text>
        </View>
      )}

      {/* Chevron */}
      {item.badge == null && (
        <ChevronRight set="light" primaryColor={chevronColor} size={16} />
      )}
    </Pressable>
  );
}

// ─── MenuBar ──────────────────────────────────────────────────────────────────

export function MenuBar({
  items,
  activeKey,
  onSelect,
  userName = "User",
  userRole,
  avatarLabel,
  footer,
}: MenuBarProps) {
  return (
    <View className="bg-bg rounded-2xl p-4 gap-1" style={{ minWidth: 240 }}>
      {/* Profile header */}
      {userName ? (
        <View className="flex-row items-center gap-3 px-3 pb-4 mb-1 border-b border-ui-border">
          <Avatar label={avatarLabel ?? userName} />
          <View className="flex-1">
            <Text
              className="text-t-14 font-inter-semibold text-fg"
              numberOfLines={1}
            >
              {userName}
            </Text>
            {userRole ? (
              <Text className="text-t-12 font-inter-regular text-fg-muted mt-0.5">
                {userRole}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {/* Navigation items */}
      {items.map((item) => (
        <MenuItem
          key={item.key}
          item={item}
          active={item.key === activeKey}
          onPress={() => onSelect?.(item.key)}
        />
      ))}

      {/* Optional footer slot */}
      {footer ? (
        <View className="mt-2 pt-2 border-t border-ui-border">{footer}</View>
      ) : null}
    </View>
  );
}

// ─── BottomMenuBar ────────────────────────────────────────────────────────────
// Horizontal bottom tab variant with support for a raised center action button.

export interface BottomMenuBarItem {
  key: string;
  label: string;
  icon: (color: string, active?: boolean) => React.ReactNode;
  badge?: number;
  center?: boolean;
}

interface BottomMenuBarProps {
  items: BottomMenuBarItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function BottomMenuBar({
  items,
  activeKey,
  onSelect,
}: BottomMenuBarProps) {
  return (
    <View className="flex-row bg-bg border-t border-ui-border px-2 pt-2 pb-4 items-center">
      {items.map((item) => {
        const active = item.key === activeKey;
        const iconColor = active ? "#2667FF" : "#9E9E9E";

        if (item.center) {
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect(item.key)}
              className="flex-1 items-center"
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#2667FF",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#2667FF",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              >
                {item.icon("#FFFFFF")}
              </View>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            className="flex-1 items-center gap-1 py-1"
          >
            <View className="relative">
              {item.icon(iconColor, active)}
              {item.badge != null && (
                <View className="absolute -top-1 -right-1 bg-error rounded-full min-w-[16px] h-4 px-1 items-center justify-center">
                  <Text className="text-white text-[9px] font-inter-bold leading-none">
                    {item.badge > 9 ? "9+" : item.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              className={`text-[10px] ${
                active ? "font-inter-semibold text-primary" : "font-inter-medium text-fg-muted"
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
