import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  Pattern,
  Line,
} from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { ChevronLeft } from "../../components/ui/ChevronLeft";

// ─── Credit Cards ─────────────────────────────────────────────────────────────

function ChipIcon() {
  return (
    <Svg width={36} height={26} viewBox="0 0 36 26" fill="none">
      <Rect x={0} y={0} width={36} height={26} rx={4} fill="#D4A94A" />
      <Rect x={12} y={0} width={1.5} height={26} fill="#B8842A" />
      <Rect x={22.5} y={0} width={1.5} height={26} fill="#B8842A" />
      <Rect x={0} y={9} width={36} height={1.5} fill="#B8842A" />
      <Rect x={0} y={15.5} width={36} height={1.5} fill="#B8842A" />
      <Rect x={12} y={9} width={11} height={8} rx={2} fill="#C9A04A" />
    </Svg>
  );
}

function MastercardLogo() {
  return (
    <Svg width={48} height={30} viewBox="0 0 48 30" fill="none">
      <Circle cx={17} cy={15} r={15} fill="#EB001B" />
      <Circle cx={31} cy={15} r={15} fill="#F79E1B" fillOpacity={0.9} />
    </Svg>
  );
}

function VisaCard({ width, height }: { width: number; height: number }) {
  return (
    <LinearGradient
      colors={["#1548D4", "#2667FF", "#3B7BFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width, height, borderRadius: 20, padding: 22, overflow: "hidden" }}
    >
      <Svg style={{ position: "absolute", top: 0, left: 0 }} width={width} height={height}>
        <Circle cx={width * 0.85} cy={height * 0.1} r={height * 0.65} fill="rgba(255,255,255,0.06)" />
        <Circle cx={width * 0.1} cy={height * 0.9} r={height * 0.5} fill="rgba(255,255,255,0.04)" />
      </Svg>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontFamily: "Inter_700Bold", fontStyle: "italic", color: "#FFD700", letterSpacing: -0.5 }}>
          VISA
        </Text>
        <View style={{ alignItems: "flex-end", gap: 6 }}>
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_500Medium" }}>
            Debit
          </Text>
          <ChipIcon />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ gap: 8 }}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" }}>
            Card Number
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_500Medium", letterSpacing: 1.5 }}>
            **** **** **** 5693
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" }}>
            Expire Date
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_600SemiBold" }}>
            05/28
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function MasterCard({ width, height }: { width: number; height: number }) {
  return (
    <View style={{ width, height, borderRadius: 20, backgroundColor: "#0A1628", padding: 22, overflow: "hidden" }}>
      <Svg style={{ position: "absolute", top: 0, left: 0 }} width={width} height={height}>
        <Circle cx={width * 0.8} cy={height * 0.15} r={height * 0.6} fill="rgba(255,255,255,0.03)" />
      </Svg>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_500Medium" }}>
          Credit
        </Text>
        <MastercardLogo />
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ gap: 8 }}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" }}>
            Card Number
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_500Medium", letterSpacing: 1.5 }}>
            **** **** **** 8821
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" }}>
            Expire Date
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_600SemiBold" }}>
            09/26
          </Text>
        </View>
      </View>
    </View>
  );
}

function AmexCard({ width, height }: { width: number; height: number }) {
  return (
    <LinearGradient
      colors={["#1A7A6E", "#2FA89A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width, height, borderRadius: 20, padding: 22, overflow: "hidden" }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_500Medium" }}>
          American Express
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ gap: 8 }}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" }}>
            Card Number
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_500Medium", letterSpacing: 1.5 }}>
            **** ****** *3041
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" }}>
            Expire Date
          </Text>
          <Text style={{ fontSize: 15, color: "#fff", fontFamily: "Inter_600SemiBold" }}>
            12/27
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// ─── Striped Bar Chart ────────────────────────────────────────────────────────

const CARD_CHART_DATA = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 72, active: true },
  { month: "Apr", value: 50 },
  { month: "May", value: 88 },
  { month: "Jun", value: 48 },
];

function StripedBar({
  barH,
  totalH,
  active,
}: {
  barH: number;
  totalH: number;
  active?: boolean;
}) {
  const W = 34;
  const R = 7;
  if (active) {
    return (
      <View
        style={{
          width: W,
          height: barH,
          backgroundColor: "#2667FF",
          borderRadius: R,
        }}
      />
    );
  }
  return (
    <Svg width={W} height={barH}>
      <Defs>
        <Pattern
          id="diag"
          patternUnits="userSpaceOnUse"
          width={8}
          height={8}
          patternTransform="rotate(45)"
        >
          <Line x1={0} y1={0} x2={0} y2={8} stroke="#CBD5F5" strokeWidth={4} />
        </Pattern>
      </Defs>
      <Rect x={0} y={0} width={W} height={barH} rx={R} fill="url(#diag)" />
    </Svg>
  );
}

function CardBarChart({ isDark }: { isDark: boolean }) {
  const CHART_H = 140;

  return (
    <View style={{ height: CHART_H + 30, paddingHorizontal: 2 }}>
      <View
        style={{
          height: CHART_H,
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        {CARD_CHART_DATA.map((item) => {
          const barH = (item.value / 100) * CHART_H;
          return (
            <View
              key={item.month}
              style={{ flex: 1, alignItems: "center" }}
            >
              <StripedBar barH={barH} totalH={CHART_H} active={item.active} />
            </View>
          );
        })}
      </View>

      {/* Month labels */}
      <View style={{ flexDirection: "row", marginTop: 10, gap: 4 }}>
        {CARD_CHART_DATA.map((item) => (
          <View key={item.month} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: item.active ? "Inter_600SemiBold" : "Inter_400Regular",
                color: item.active ? "#2667FF" : isDark ? "#757575" : "#9E9E9E",
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

// ─── Transaction Item ─────────────────────────────────────────────────────────

function DribbbleLogo() {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F7E8F0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} stroke="#E4405F" strokeWidth={1.5} />
        <Path
          d="M2 12s4-3 10-3 10 3 10 3"
          stroke="#E4405F"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M8 3.5C10 8 13 14 15.5 20.5M16 3.5C14 8 11 14 8.5 20.5"
          stroke="#E4405F"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

function SlackLogo() {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A" />
        <Path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0" />
        <Path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2V9h2zm-1 0a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#2EB67D" />
        <Path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E" />
      </Svg>
    </View>
  );
}

function CardTransactionItem({
  logo,
  name,
  date,
  amount,
  isDark,
}: {
  logo: React.ReactNode;
  name: string;
  date: string;
  amount: string;
  isDark: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: isDark ? "#1E293B" : "#F8F9FD",
        borderRadius: 16,
      }}
    >
      {logo}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_600SemiBold",
            color: isDark ? "#FFFFFF" : "#0F172A",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_400Regular",
            color: "#9E9E9E",
            marginTop: 2,
          }}
        >
          Payment • {date}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_600SemiBold",
          color: isDark ? "#FFFFFF" : "#0F172A",
        }}
      >
        {amount}
      </Text>
    </View>
  );
}

// ─── Summary Icons ────────────────────────────────────────────────────────────

function IncomeCircleIcon() {
  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#2667FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 5v10M7 10l5 5 5-5"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M5 19h14" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

function ExpenseCircleIcon() {
  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#2667FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Rect x={3} y={6} width={18} height={13} rx={2} stroke="#fff" strokeWidth={1.6} />
        <Path d="M3 11h18" stroke="#fff" strokeWidth={1.6} />
        <Circle cx={8} cy={15} r={1.5} fill="#fff" />
      </Svg>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const CARDS = ["visa", "mastercard", "amex"] as const;

export default function MyCardScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const CARD_W = screenWidth - 40;
  const CARD_H = CARD_W / 1.6;

  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const surface = isDark ? "#1E293B" : "#F8F9FD";
  const titleColor = isDark ? "#FFFFFF" : "#0F172A";
  const mutedColor = isDark ? "#757575" : "#9E9E9E";
  const borderColor = isDark ? "#424242" : "#EEEEEE";

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_W);
    setActiveCard(idx);
  };

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
          My Card
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ── Card Carousel ── */}
        <View style={{ paddingTop: 24 }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 0 }}
            decelerationRate="fast"
            snapToInterval={CARD_W + 20}
            snapToAlignment="center"
          >
            <View style={{ marginRight: 20 }}>
              <VisaCard width={CARD_W} height={CARD_H} />
            </View>
            <View style={{ marginRight: 20 }}>
              <MasterCard width={CARD_W} height={CARD_H} />
            </View>
            <View>
              <AmexCard width={CARD_W} height={CARD_H} />
            </View>
          </ScrollView>

          {/* Dot indicators */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 6,
              marginTop: 16,
            }}
          >
            {CARDS.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === activeCard ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === activeCard ? "#2667FF" : isDark ? "#424242" : "#D8D8D8",
                }}
              />
            ))}
          </View>
        </View>

        {/* ── Spending Summary ── */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,
            padding: 20,
            backgroundColor: surface,
            borderRadius: 20,
          }}
        >
          {/* Total + Period Selector */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Inter_400Regular",
                color: mutedColor,
              }}
            >
              Total spent for six months
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: bg,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: borderColor,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Inter_500Medium",
                  color: titleColor,
                }}
              >
                Monthly
              </Text>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M6 9l6 6 6-6"
                  stroke={titleColor}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>

          <Text
            style={{
              fontSize: 28,
              fontFamily: "Inter_700Bold",
              color: "#2667FF",
              marginBottom: 20,
            }}
          >
            $14,220.00
          </Text>

          {/* Bar Chart */}
          <CardBarChart isDark={isDark} />

          {/* Separator */}
          <View
            style={{
              height: 1,
              backgroundColor: borderColor,
              marginVertical: 16,
            }}
          />

          {/* Income + Expenses summary */}
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
              <IncomeCircleIcon />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_400Regular",
                    color: mutedColor,
                  }}
                >
                  Income
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_700Bold",
                    color: "#2667FF",
                    marginTop: 2,
                  }}
                >
                  $453.00
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
              <ExpenseCircleIcon />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_400Regular",
                    color: mutedColor,
                  }}
                >
                  Expenses
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_700Bold",
                    color: "#2667FF",
                    marginTop: 2,
                  }}
                >
                  $235.00
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Transactions ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Inter_700Bold",
              color: titleColor,
              marginBottom: 14,
            }}
          >
            Transactions
          </Text>
          <View style={{ gap: 10 }}>
            <CardTransactionItem
              logo={<DribbbleLogo />}
              name="Dribbble Pro"
              date="16 Oct 26"
              amount="-$33.85"
              isDark={isDark}
            />
            <CardTransactionItem
              logo={<SlackLogo />}
              name="Slack"
              date="11 Oct 26"
              amount="-$73.53"
              isDark={isDark}
            />
            <CardTransactionItem
              logo={
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: "#E8F5E9",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#2E7D32" strokeWidth={1.5} strokeLinejoin="round" />
                    <Path d="M12 12l10-5M12 12v10M12 12L2 7" stroke="#2E7D32" strokeWidth={1.5} strokeLinecap="round" />
                  </Svg>
                </View>
              }
              name="Notion"
              date="02 Oct 26"
              amount="-$16.00"
              isDark={isDark}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
