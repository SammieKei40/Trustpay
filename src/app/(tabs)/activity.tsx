import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { ChevronLeft } from "../../components/ui/ChevronLeft";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "income" | "expenses";

// ─── Bar Chart Data ───────────────────────────────────────────────────────────

const CHART_DATA = [
  { month: "Jan", main: 65, bg: 82 },
  { month: "Feb", main: 45, bg: 72 },
  { month: "Mar", main: 22, bg: 50 },
  { month: "Apr", main: 58, bg: 78 },
  { month: "May", main: 78, bg: 92 },
  { month: "Jun", main: 62, bg: 86 },
];

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ mode }: { mode: Mode }) {
  const CHART_HEIGHT = 160;
  const mainColor = mode === "income" ? "#2667FF" : "#C44B1A";
  const bgColor = mode === "income" ? "rgba(38,103,255,0.15)" : "rgba(196,75,26,0.15)";

  return (
    <View style={{ height: CHART_HEIGHT + 28, paddingHorizontal: 4 }}>
      <View
        style={{
          height: CHART_HEIGHT,
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        {CHART_DATA.map((item) => {
          const mainH = (item.main / 100) * CHART_HEIGHT;
          const bgH = (item.bg / 100) * CHART_HEIGHT;
          return (
            <View
              key={item.month}
              style={{ flex: 1, alignItems: "center", gap: 6 }}
            >
              <View
                style={{
                  height: CHART_HEIGHT,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 3,
                }}
              >
                {/* Background bar (taller) */}
                <View
                  style={{
                    flex: 1,
                    height: bgH,
                    backgroundColor: bgColor,
                    borderRadius: 6,
                  }}
                />
                {/* Main bar (shorter, colored) */}
                <View
                  style={{
                    flex: 1,
                    height: mainH,
                    backgroundColor: mainColor,
                    borderRadius: 6,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Month labels */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          gap: 6,
          paddingHorizontal: 4,
        }}
      >
        {CHART_DATA.map((item) => (
          <View key={item.month} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_400Regular",
                color: "#9E9E9E",
              }}
            >
              {item.month}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Income / Expense Toggle ──────────────────────────────────────────────────

function IncomeIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3v14M5 10l7 7 7-7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3 21h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ExpenseIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21V7M5 14l7-7 7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3 3h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Activity Item ────────────────────────────────────────────────────────────

interface ActivityData {
  name: string;
  type: string;
  date: string;
  amount: string;
  avatarColor: string;
  initials: string;
}

const ACTIVITIES: ActivityData[] = [
  {
    name: "Rina Islam",
    type: "Payment",
    date: "06 Oct 26",
    amount: "- $53.85",
    avatarColor: "#4ECDC4",
    initials: "RI",
  },
  {
    name: "Slack",
    type: "Payment",
    date: "11 Oct 26",
    amount: "-$73.53",
    avatarColor: "#FFFFFF",
    initials: "Sl",
  },
  {
    name: "Dribbble Pro",
    type: "Payment",
    date: "16 Oct 26",
    amount: "-$33.85",
    avatarColor: "#FF6B9D",
    initials: "Dr",
  },
];

function SlackLogoSmall() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A" />
      <Path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0" />
      <Path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2V9h2zm-1 0a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#2EB67D" />
      <Path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E" />
    </Svg>
  );
}

function ActivityItem({ item, isDark }: { item: ActivityData; isDark: boolean }) {
  const isSlack = item.name === "Slack";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: isDark ? "#1E293B" : "#F8F9FD",
        borderRadius: 16,
      }}
    >
      {/* Avatar / Logo */}
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: isSlack
            ? isDark
              ? "#1E293B"
              : "#F0F0F0"
            : item.avatarColor,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: isSlack ? 1 : 0,
          borderColor: isDark ? "#424242" : "#E0E0E0",
        }}
      >
        {isSlack ? (
          <SlackLogoSmall />
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_700Bold",
              color: "#fff",
            }}
          >
            {item.initials}
          </Text>
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            color: isDark ? "#FFFFFF" : "#0F172A",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_400Regular",
            color: "#9E9E9E",
            marginTop: 2,
          }}
        >
          {item.type} • {item.date}
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_600SemiBold",
          color: isDark ? "#FFFFFF" : "#0F172A",
        }}
      >
        {item.amount}
      </Text>
    </View>
  );
}

// ─── Period Selector ──────────────────────────────────────────────────────────

function PeriodSelector({ isDark }: { isDark: boolean }) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: isDark ? "#1E293B" : "#F3F4F6",
        borderRadius: 10,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_600SemiBold",
          color: isDark ? "#FFFFFF" : "#0F172A",
        }}
      >
        1 Week
      </Text>
      <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 9l6 6 6-6"
          stroke={isDark ? "#FFFFFF" : "#0F172A"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ActivityScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("expenses");

  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const titleColor = isDark ? "#FFFFFF" : "#0F172A";
  const borderColor = isDark ? "#424242" : "#EEEEEE";

  const activeExpenseColor = "#C44B1A";
  const activeExpenseBg = "#C44B1A";
  const activeIncomeBg = "#2667FF";

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          backgroundColor: bg,
        }}
      >
        <Pressable
          onPress={() => router.navigate("/(tabs)")}
          style={{ marginRight: 12 }}
        >
          <ChevronLeft />
        </Pressable>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontFamily: "Inter_700Bold",
            color: titleColor,
            textAlign: "center",
          }}
        >
          Activities
        </Text>
        {/* Spacer to centre the title */}
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 0 }}
      >
        {/* ── Income / Expenses Toggle ── */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            padding: 6,
            backgroundColor: isDark ? "#1E293B" : "#F3F4F6",
            borderRadius: 50,
            marginBottom: 22,
          }}
        >
          {/* Income */}
          <Pressable
            onPress={() => setMode("income")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 12,
              borderRadius: 50,
              backgroundColor:
                mode === "income" ? activeIncomeBg : "transparent",
            }}
          >
            <IncomeIcon color={mode === "income" ? "#FFFFFF" : isDark ? "#9E9E9E" : "#616161"} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Inter_600SemiBold",
                color: mode === "income" ? "#FFFFFF" : isDark ? "#9E9E9E" : "#616161",
              }}
            >
              Income
            </Text>
          </Pressable>

          {/* Expenses */}
          <Pressable
            onPress={() => setMode("expenses")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 12,
              borderRadius: 50,
              backgroundColor:
                mode === "expenses" ? activeExpenseBg : "transparent",
            }}
          >
            <ExpenseIcon color={mode === "expenses" ? "#FFFFFF" : isDark ? "#9E9E9E" : "#616161"} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Inter_600SemiBold",
                color:
                  mode === "expenses"
                    ? "#FFFFFF"
                    : isDark
                    ? "#9E9E9E"
                    : "#616161",
              }}
            >
              Expenses
            </Text>
          </Pressable>
        </View>

        {/* ── Period Selector ── */}
        <PeriodSelector isDark={isDark} />

        {/* ── Bar Chart ── */}
        <View style={{ marginTop: 20, marginBottom: 28 }}>
          <BarChart mode={mode} />
        </View>

        {/* ── Recent Activity ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Inter_700Bold",
              color: titleColor,
            }}
          >
            Recent Activity
          </Text>
          <Pressable>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_600SemiBold",
                color: "#2667FF",
              }}
            >
              See All
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: 10 }}>
          {ACTIVITIES.map((item) => (
            <ActivityItem key={item.name} item={item} isDark={isDark} />
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}
