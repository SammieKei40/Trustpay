import "../global.css";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Home,
  Notification,
  Setting,
  Swap,
  User,
  Wallet,
  Logout,
} from "react-native-iconly";
import { useTheme } from "../../context/ThemeContext";
import { Screen } from "../../components/ui/Screen";
import { Toggle } from "../../components/ui/Toggle";
import { Checkbox, CheckboxGroup } from "../../components/ui/Checkbox";
import { Radio, RadioGroup } from "../../components/ui/Radio";
import { Alert, AlertStack } from "../../components/ui/Alert";
import { Tabs } from "../../components/ui/Tabs";
import { MenuBar, BottomMenuBar } from "../../components/ui/MenuBar";

// ─── Section header ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-8">
      <Text className="font-inter-bold text-t-18 text-fg mb-4">{title}</Text>
      {children}
    </View>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider({ label }: { label: string }) {
  return (
    <View className="flex-row items-center gap-3 my-3">
      <View className="flex-1 h-px bg-ui-border" />
      <Text className="text-t-12 font-inter-medium text-fg-muted">{label}</Text>
      <View className="flex-1 h-px bg-ui-border" />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  // Toggle state
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(true);
  const [toggle4, setToggle4] = useState(false);

  // Checkbox state
  const [checks, setChecks] = useState(["notifications"]);

  // Radio state
  const [radio, setRadio] = useState("weekly");

  // Tabs state
  const [pillTab, setPillTab] = useState("all");
  const [underlineTab, setUnderlineTab] = useState("overview");
  const [segmentTab, setSegmentTab] = useState("send");

  // MenuBar state
  const [menuActive, setMenuActive] = useState("home");
  const [bottomActive, setBottomActive] = useState("home");

  return (
    <Screen scroll className=" !px-5 pt-6">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <View className="flex-row items-center justify-between mb-8">
        <Text className="font-inter-bold text-t-24 text-fg">Components</Text>
        <Pressable
          onPress={toggleTheme}
          className="px-4 py-2 rounded-xl bg-surface"
        >
          <Text className="font-inter-semibold text-t-14 text-fg-2">
            {isDark ? "☀️  Light" : "🌙  Dark"}
          </Text>
        </Pressable>
      </View>

      {/* ── Toggle ────────────────────────────────────────────────────────── */}
      <Section title="Toggle">
        <Divider label="MD size" />
        <View className="flex-row gap-6 items-center">
          <View className="items-center gap-2">
            <Toggle value={toggle1} onValueChange={setToggle1} />
            <Text className="text-t-12 font-inter-regular text-fg-muted">On</Text>
          </View>
          <View className="items-center gap-2">
            <Toggle value={toggle2} onValueChange={setToggle2} />
            <Text className="text-t-12 font-inter-regular text-fg-muted">Off</Text>
          </View>
          <View className="items-center gap-2">
            <Toggle value disabled />
            <Text className="text-t-12 font-inter-regular text-fg-muted">Disabled</Text>
          </View>
        </View>

        <Divider label="SM size" />
        <View className="flex-row gap-6 items-center">
          <View className="items-center gap-2">
            <Toggle value={toggle3} onValueChange={setToggle3} size="sm" />
            <Text className="text-t-12 font-inter-regular text-fg-muted">On</Text>
          </View>
          <View className="items-center gap-2">
            <Toggle value={toggle4} onValueChange={setToggle4} size="sm" />
            <Text className="text-t-12 font-inter-regular text-fg-muted">Off</Text>
          </View>
          <View className="items-center gap-2">
            <Toggle value size="sm" disabled />
            <Text className="text-t-12 font-inter-regular text-fg-muted">Disabled</Text>
          </View>
        </View>
      </Section>

      {/* ── Checkbox ──────────────────────────────────────────────────────── */}
      <Section title="Checkbox">
        <Divider label="States" />
        <View className="flex-row gap-6 items-center flex-wrap">
          <Checkbox state="unchecked" label="Unchecked" />
          <Checkbox state="checked" label="Checked" />
          <Checkbox state="indeterminate" label="Partial" />
          <Checkbox state="checked" label="Disabled" disabled />
        </View>
        <Divider label="Group" />
        <CheckboxGroup
          options={[
            { value: "notifications", label: "Push notifications" },
            { value: "email", label: "Email alerts" },
            { value: "sms", label: "SMS alerts" },
            { value: "promo", label: "Promotions", disabled: true },
          ]}
          values={checks}
          onChange={setChecks}
        />
      </Section>

      {/* ── Radio ─────────────────────────────────────────────────────────── */}
      <Section title="Radio">
        <Divider label="States" />
        <View className="flex-row gap-6 items-center">
          <Radio selected={false} label="Unselected" />
          <Radio selected label="Selected" />
          <Radio selected label="Disabled" disabled />
        </View>
        <Divider label="Group" />
        <RadioGroup
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
          value={radio}
          onChange={setRadio}
        />
      </Section>

      {/* ── Alert ─────────────────────────────────────────────────────────── */}
      <Section title="Alert">
        <AlertStack
          alerts={[
            { id: "1", variant: "info", title: "Transaction pending", message: "Your transfer of $250 is being processed." },
            { id: "2", variant: "success", title: "Payment successful", message: "You have sent $120 to John Doe." },
            { id: "3", variant: "warning", title: "Unusual activity", message: "We noticed a login from a new device." },
            { id: "4", variant: "error", title: "Transaction failed", message: "Insufficient balance to complete this transfer." },
          ]}
        />
      </Section>

      {/* ── Navigation Tabs ───────────────────────────────────────────────── */}
      <Section title="Navigation Tab">
        <Divider label="Pills (default)" />
        <Tabs
          tabs={[
            { key: "all", label: "All Time" },
            { key: "month", label: "Monthly" },
            { key: "week", label: "Weekly" },
          ]}
          activeKey={pillTab}
          onChange={setPillTab}
        />

        <Divider label="Underline" />
        <Tabs
          tabs={[
            { key: "overview", label: "Overview" },
            { key: "transactions", label: "Transactions" },
            { key: "analytics", label: "Analytics" },
          ]}
          activeKey={underlineTab}
          onChange={setUnderlineTab}
          variant="underline"
        />

        <Divider label="Segment" />
        <Tabs
          tabs={[
            { key: "send", label: "Send" },
            { key: "receive", label: "Receive" },
          ]}
          activeKey={segmentTab}
          onChange={setSegmentTab}
          variant="segment"
        />
      </Section>


      {/* ── Bottom Menu Bar ───────────────────────────────────────────────── */}
      <Section title="Bottom Menu Bar">
        <View className="rounded-2xl overflow-hidden border border-ui-border">
          
        </View>
      </Section>

      <View className="h-8" />
    </Screen>
  );
}
