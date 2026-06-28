import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import {
  useIconColors,
  BellIcon,
  EyeOffIcon,
  SendIcon,
  RequestIcon,
  TopUpIcon,
  MoreIcon,
  ChipIcon,
  MastercardLogo,
  SlackLogo,
} from "../../components/ui/icons";

// ─── Credit Cards ─────────────────────────────────────────────────────────────

function VisaCard({ width, height }: { width: number; height: number }) {
  return (
    <LinearGradient
      colors={["#1245CC", "#2667FF", "#3A79FF"]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width, height, borderRadius: 20, padding: 22, overflow: "hidden" }}
    >
      <Svg style={{ position: "absolute", top: 0, left: 0 }} width={width} height={height}>
        <Circle cx={width * 0.88} cy={-height * 0.1} r={height * 0.75} fill="rgba(255,255,255,0.07)" />
        <Circle cx={width * 0.05} cy={height * 1.05} r={height * 0.55} fill="rgba(255,255,255,0.05)" />
      </Svg>

      <View className="flex-row justify-between items-start">
        <Text
          className="font-inter-bold text-[#FFD700]"
          style={{ fontSize: 26, fontStyle: "italic", letterSpacing: -0.5 }}
        >
          VISA
        </Text>
        <View className="items-end gap-2">
          <Text className="text-t-14 font-inter-medium text-white/85">Debit</Text>
          <ChipIcon />
        </View>
      </View>

      <View className="flex-1" />

      <View className="flex-row justify-between items-end">
        <View className="gap-1">
          <Text className="text-[11px] font-inter-regular text-white/60">Card Number</Text>
          <Text className="font-inter-medium text-white" style={{ fontSize: 15, letterSpacing: 2 }}>
            **** **** **** 5693
          </Text>
        </View>
        <View className="gap-1 items-end">
          <Text className="text-[11px] font-inter-regular text-white/60">Expire Date</Text>
          <Text className="font-inter-semibold text-white" style={{ fontSize: 15 }}>
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
        <Circle cx={width * 0.8} cy={height * 0.2} r={height * 0.65} fill="rgba(255,255,255,0.03)" />
      </Svg>

      <View className="flex-row justify-between items-start">
        <Text className="text-t-14 font-inter-medium text-white/65">Credit</Text>
        <MastercardLogo />
      </View>

      <View className="flex-1" />

      <View className="flex-row justify-between items-end">
        <View className="gap-1">
          <Text className="text-[11px] font-inter-regular text-white/50">Card Number</Text>
          <Text className="font-inter-medium text-white" style={{ fontSize: 15, letterSpacing: 2 }}>
            **** **** **** 8821
          </Text>
        </View>
        <View className="gap-1 items-end">
          <Text className="text-[11px] font-inter-regular text-white/50">Expire Date</Text>
          <Text className="font-inter-semibold text-white" style={{ fontSize: 15 }}>
            09/26
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Quick Action ─────────────────────────────────────────────────────────────

function QuickAction({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Pressable className="flex-1 items-center gap-2.5">
      <View className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center">
        {icon}
      </View>
      <Text className="text-[13px] font-inter-medium text-fg">{label}</Text>
    </Pressable>
  );
}

// ─── Recent Contacts ──────────────────────────────────────────────────────────

const CONTACTS = [
  { name: "Adelle F.", color: "#C0392B" },
  { name: "Andmesh", color: "#E67E22" },
  { name: "David O.", color: "#2C3E50" },
  { name: "Hellena J.", color: "#BDC3C7" },
  { name: "Isaac O.", color: "#1A252F" },
];

function ContactAvatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const lightBg = color === "#BDC3C7";
  return (
    <Pressable className="items-center gap-1.5">
      <View
        style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: color }}
        className="items-center justify-center"
      >
        <Text className="text-[17px] font-inter-bold" style={{ color: lightBg ? "#555" : "#fff" }}>
          {initials}
        </Text>
      </View>
      <Text className="text-[12px] font-inter-regular text-fg-muted" numberOfLines={1}>
        {name.split(" ")[0]}
      </Text>
    </Pressable>
  );
}

// ─── Transaction Item ─────────────────────────────────────────────────────────

function TransactionItem({
  logo, name, type, date, amount,
}: {
  logo: React.ReactNode;
  name: string;
  type: string;
  date: string;
  amount: string;
}) {
  return (
    <View className="flex-row items-center gap-3.5 py-4 px-4 bg-surface rounded-2xl">
      {logo}
      <View className="flex-1">
        <Text className="text-[15px] font-inter-semibold text-fg">{name}</Text>
        <Text className="text-t-12 font-inter-regular text-fg-muted mt-0.5">
          {type} • {date}
        </Text>
      </View>
      <Text className="text-[15px] font-inter-semibold text-fg">{amount}</Text>
    </View>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function HomeScreen() {
  useTheme(); // subscribe so CSS vars re-render on theme change
  const iconColors = useIconColors();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const greeting = getGreeting();

  const CARD_WIDTH = screenWidth * 0.75;
  const CARD_HEIGHT = CARD_WIDTH / 1.585;

  return (
    <View className="flex-1 bg-bg">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 28 }}
      >
        {/* ══════════ HEADER ══════════ */}
        <View
          className="bg-header px-5"
          style={{ paddingTop: insets.top + 14, paddingBottom: 30 }}
        >
          {/* Avatar row */}
          <View className="flex-row items-center gap-3 mb-[22px]">
            <View className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 items-center justify-center">
              <Text className="text-[15px] font-inter-bold text-white">MH</Text>
            </View>

            <View className="flex-1">
              <Text className="text-[13px] font-inter-regular text-white/70">{greeting}</Text>
              <Text className="text-[17px] font-inter-bold text-white mt-0.5">Sammie Kei</Text>
            </View>

            <Pressable>
              <View className="w-[46px] h-[46px] rounded-full bg-white/20 items-center justify-center">
                <BellIcon color={iconColors.onHeader} size={22} />
                <View
                  className="absolute w-2 h-2 rounded-full bg-error border-[1.5px] border-header"
                  style={{ top: 9, right: 9 }}
                />
              </View>
            </Pressable>
          </View>

          {/* ── Balance card — deeper blue via --header-card token ── */}
          <View className="bg-header-card rounded-t-[20px] p-2 pt-4 ">
            

            <View className="flex-row !items-center justify-between">
                          <View className="flex-col !items-start justify-between">
              <Text className="text-[13px] font-inter-regular text-white/70 mb-2">
              Total Balance
            </Text>
              <Pressable
                onPress={() => setBalanceVisible((v) => !v)}
                className="flex-row items-center gap-1"
              >
                <Text className="font-inter-semibold text-white" style={{ fontSize: 20, letterSpacing: -0.8 }}>
                  {balanceVisible ? "$20,000.00" : "$••,•••.••"}
                </Text>
                <EyeOffIcon color={iconColors.onHeaderMuted} size={22} />
              </Pressable>
              </View>

              <Pressable className="bg-white/[0.18] rounded-full px-[18px] py-3">
                <Text className="text-t-14 font-inter-semibold text-white">Add money</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ══════════ CONTENT AREA ══════════ */}
        <View className="flex-1 bg-bg -mt-[10px] pt-[26px]">

          {/* ── Your Cards ── */}
          <Text className="px-5 text-t-18 font-inter-bold text-fg mb-4">Your Cards</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 16}
            snapToAlignment="start"
          >
            <VisaCard width={CARD_WIDTH} height={CARD_HEIGHT} />
            <MasterCard width={CARD_WIDTH} height={CARD_HEIGHT} />
          </ScrollView>

          {/* ── Pay & Transfer ── */}
          <View className="px-5 mt-7">
            <Text className="text-t-18 font-inter-bold text-fg mb-[18px]">Pay & Transfer</Text>
            <View className="flex-row">
              <QuickAction label="Send"    icon={<SendIcon    color={iconColors.primary} size={24} />} />
              <QuickAction label="Request" icon={<RequestIcon color={iconColors.primary} size={24} />} />
              <QuickAction label="Top up"  icon={<TopUpIcon   color={iconColors.primary} size={24} />} />
              <QuickAction label="More"    icon={<MoreIcon    color={iconColors.primary} size={22} />} />
            </View>
          </View>

          {/* ── Recent Contacts ── */}
          <View className="mt-7">
            <View className="flex-row items-center justify-between px-5 mb-3.5">
              <Text className="text-t-18 font-inter-bold text-fg">Recent Contacts</Text>
              <Pressable>
                <Text className="text-t-14 font-inter-semibold text-primary">Add</Text>
              </Pressable>
            </View>

            <View className="mx-5 bg-surface rounded-[18px] pt-[18px] pb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 18, gap: 20 }}
              >
                {CONTACTS.map((c) => (
                  <ContactAvatar key={c.name} name={c.name} color={c.color} />
                ))}
              </ScrollView>
            </View>
          </View>

          {/* ── Transactions ── */}
          <View className="mt-7 px-5">
            <View className="flex-row items-center justify-between mb-3.5">
              <Text className="text-t-18 font-inter-bold text-fg">Transactions</Text>
              <Pressable>
                <Text className="text-t-14 font-inter-semibold text-primary">See All</Text>
              </Pressable>
            </View>

            <View className="gap-3">
              <TransactionItem
                logo={
                  <View className="w-11 h-11 rounded-[14px] bg-bg border border-ui-border items-center justify-center">
                    <SlackLogo />
                  </View>
                }
                name="Slack"
                type="Payment"
                date="11 Oct 26"
                amount="-$73,53"
              />
            </View>
          </View>

          <View className="h-6" />
        </View>
      </ScrollView>
    </View>
  );
}
