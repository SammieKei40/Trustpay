import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export interface TabItem {
  key: string;
  label: string;
  badge?: number;
}

export type TabVariant = "pills" | "underline" | "segment";

interface TabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: TabVariant;
  scrollable?: boolean;
}

// ─── Pills variant ────────────────────────────────────────────────────────────
// Filled pill for active tab inside a surface container.

function PillTabs({
  tabs,
  activeKey,
  onChange,
  scrollable,
}: Omit<TabsProps, "variant">) {
  const inner = (
    <View className="flex-row p-1 bg-surface rounded-xl gap-1">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`flex-1 py-2 px-3 rounded-lg items-center justify-center flex-row gap-1.5 ${
              active ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-t-14 font-inter-medium ${
                active ? "text-white" : "text-fg-muted"
              }`}
            >
              {tab.label}
            </Text>
            {tab.badge != null && (
              <View
                className={`rounded-full px-1.5 min-w-[18px] h-[18px] items-center justify-center ${
                  active ? "bg-white/20" : "bg-black-20"
                }`}
              >
                <Text
                  className={`text-[10px] font-inter-medium leading-none ${
                    active ? "text-white" : "text-fg-2"
                  }`}
                >
                  {tab.badge}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  return scrollable ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {inner}
    </ScrollView>
  ) : (
    inner
  );
}

// ─── Underline variant ────────────────────────────────────────────────────────
// Active tab gets a bottom border line, no background.

function UnderlineTabs({
  tabs,
  activeKey,
  onChange,
  scrollable,
}: Omit<TabsProps, "variant">) {
  const inner = (
    <View className="flex-row border-b border-ui-border">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor: active ? "#2667FF" : "transparent",
              marginBottom: -1,
              flexDirection: "row",
              gap: 6,
            }}
          >
            <Text
              className={`text-t-14 font-inter-medium ${
                active ? "text-primary" : "text-fg-muted"
              }`}
            >
              {tab.label}
            </Text>
            {tab.badge != null && (
              <View className="rounded-full px-1.5 min-w-[18px] h-[18px] items-center justify-center bg-primary/10">
                <Text className="text-[10px] font-inter-medium text-primary leading-none">
                  {tab.badge}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  return scrollable ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {inner}
    </ScrollView>
  ) : (
    inner
  );
}

// ─── Segment variant ──────────────────────────────────────────────────────────
// Each tab is an equal segment; active fills with primary, inactive is ghost.

function SegmentTabs({
  tabs,
  activeKey,
  onChange,
}: Omit<TabsProps, "variant">) {
  return (
    <View
      className="flex-row rounded-xl overflow-hidden border border-primary"
      style={{ alignSelf: "flex-start" }}
    >
      {tabs.map((tab, i) => {
        const active = tab.key === activeKey;
        const isLast = i === tabs.length - 1;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`flex-1 py-2.5 px-4 items-center ${
              active ? "bg-primary" : "bg-transparent"
            } ${!isLast ? "border-r border-primary" : ""}`}
          >
            <Text
              className={`text-t-14 font-inter-medium ${
                active ? "text-white" : "text-primary"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Main Tabs export ─────────────────────────────────────────────────────────

export function Tabs({
  tabs,
  activeKey,
  onChange,
  variant = "pills",
  scrollable = false,
}: TabsProps) {
  if (variant === "underline") {
    return (
      <UnderlineTabs
        tabs={tabs}
        activeKey={activeKey}
        onChange={onChange}
        scrollable={scrollable}
      />
    );
  }
  if (variant === "segment") {
    return (
      <SegmentTabs tabs={tabs} activeKey={activeKey} onChange={onChange} />
    );
  }
  return (
    <PillTabs
      tabs={tabs}
      activeKey={activeKey}
      onChange={onChange}
      scrollable={scrollable}
    />
  );
}
