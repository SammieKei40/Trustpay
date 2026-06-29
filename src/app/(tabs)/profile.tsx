import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import {
  BackIcon,
  GearIcon,
  QRCodeIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
  SpendAnalysisIcon,
  TransactionHistoryIcon,
  ChangeEmailIcon,
  ChangePasswordIcon,
  ChangePinIcon,
  BiometricIcon,
  FAQIcon,
  HelpCenterIcon,
} from "../../components/ui/icons";

// ─── Shared layout components ─────────────────────────────────────────────────

function ArrowCircle() {
  return (
    <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
      <ChevronRightIcon />
    </View>
  );
}

function RowDivider() {
  return <View className="h-px bg-ui-border mx-4" />;
}

function SectionLabel({ title }: { title: string }) {
  return (
    <View className="px-5 mt-7 mb-3">
      <Text className="text-[17px] font-inter-bold text-fg mb-2.5">{title}</Text>
      <View className="h-px bg-ui-border" />
    </View>
  );
}

function MenuCard({ children }: { children: React.ReactNode }) {
  return (
    <View className="mx-5 bg-bg border border-ui-border rounded-2xl overflow-hidden">
      {children}
    </View>
  );
}

function MenuRow({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 gap-3.5 active:opacity-60"
      style={{ paddingVertical: 14 }}
    >
      <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
        {icon}
      </View>
      <Text className="flex-1 text-[15px] font-inter-medium text-fg">{label}</Text>
      <ArrowCircle />
    </Pressable>
  );
}

function ToggleRow({ icon, label, value, onValueChange }: { icon: React.ReactNode; label: string; value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <View className="flex-row items-center px-4 gap-3.5" style={{ paddingVertical: 14 }}>
      <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
        {icon}
      </View>
      <Text className="flex-1 text-[15px] font-inter-medium text-fg">{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E0E0E0", true: "#2667FF" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { isDark, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── Header ── */}
        <View className="flex-row items-center px-5" style={{ paddingTop: insets.top + 12, paddingBottom: 16 }}>
          <Pressable
            onPress={() => router.canGoBack() && router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <BackIcon color={isDark ? "#FFFFFF" : "#0F172A"} />
          </Pressable>
          <Text className="flex-1 text-center text-[17px] font-inter-bold text-fg">Profile</Text>
          <Pressable
            onPress={() => router.push("/settings")}
            className="w-10 h-10 rounded-full items-center justify-center"
          >
            <GearIcon />
          </Pressable>
        </View>

        {/* ── User card ── */}
        <View className="mx-5 p-4 rounded-2xl bg-primary/10 flex-row items-center gap-3.5">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=51" }}
            style={{ width: 62, height: 62, borderRadius: 31 }}
          />
          <View className="flex-1">
            <Text className="text-[16px] font-inter-bold text-fg">Sammie Kei</Text>
            <Text className="text-[13px] font-inter-regular text-fg-muted mt-0.5">+8801758967406</Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
            <QRCodeIcon />
          </Pressable>
        </View>

        {/* ── Activity ── */}
        <SectionLabel title="Activity" />
        <MenuCard>
          <MenuRow icon={<SpendAnalysisIcon />} label="Spend Analysis" />
          <RowDivider />
          <MenuRow icon={<TransactionHistoryIcon />} label="Transaction History" />
        </MenuCard>

        {/* ── Account Security ── */}
        <SectionLabel title="Account Security" />
        <MenuCard>
          <MenuRow icon={<ChangeEmailIcon />} label="Change Email" />
          <RowDivider />
          <MenuRow icon={<ChangePasswordIcon />} label="Change Password" />
          <RowDivider />
          <MenuRow icon={<ChangePinIcon />} label="Change Pin" />
          <RowDivider />
          <MenuRow icon={<BiometricIcon />} label="Biometric Login" />
        </MenuCard>

        {/* ── Other ── */}
        <SectionLabel title="Other" />
        <MenuCard>
          <ToggleRow
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            label="Dark Mode"
            value={isDark}
            onValueChange={(v) => setTheme(v ? "dark" : "light")}
          />
          <RowDivider />
          <MenuRow icon={<FAQIcon />} label="FAQ" />
          <RowDivider />
          <MenuRow icon={<HelpCenterIcon />} label="Help Center" />
        </MenuCard>

      </ScrollView>
    </View>
  );
}
