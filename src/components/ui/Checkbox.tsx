import React from "react";
import { Pressable, Text, View } from "react-native";

export type CheckboxState = "unchecked" | "checked" | "indeterminate";
export type CheckboxSize = "sm" | "md";

interface CheckboxProps {
  state?: CheckboxState;
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
  size?: CheckboxSize;
}

const BOX_SIZE: Record<CheckboxSize, { box: number; radius: number; fontSize: number }> = {
  md: { box: 22, radius: 6, fontSize: 13 },
  sm: { box: 18, radius: 5, fontSize: 11 },
};

export function Checkbox({
  state = "unchecked",
  label,
  disabled = false,
  onPress,
  size = "md",
}: CheckboxProps) {
  const { box, radius, fontSize } = BOX_SIZE[size];
  const isChecked = state === "checked";
  const isIndeterminate = state === "indeterminate";
  const filled = isChecked || isIndeterminate;

  const borderColor = disabled ? "#BDBDBD" : filled ? "#2667FF" : "#9E9E9E";
  const bgColor = filled ? (disabled ? "#BDBDBD" : "#2667FF") : "transparent";

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      className="flex-row items-center gap-2.5"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <View
        style={{
          width: box,
          height: box,
          borderRadius: radius,
          backgroundColor: bgColor,
          borderWidth: filled ? 0 : 2,
          borderColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isChecked && (
          <Text
            style={{
              color: "#FFFFFF",
              fontSize,
              fontWeight: "700",
              lineHeight: fontSize + 2,
            }}
          >
            ✓
          </Text>
        )}
        {isIndeterminate && (
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: fontSize + 1,
              fontWeight: "700",
              lineHeight: fontSize + 3,
            }}
          >
            −
          </Text>
        )}
      </View>
      {label ? (
        <Text
          className={`text-t-14 font-inter-regular ${
            disabled ? "text-fg-muted" : "text-fg"
          }`}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

interface CheckboxGroupProps {
  options: { value: string; label: string; disabled?: boolean }[];
  values: string[];
  onChange: (values: string[]) => void;
  direction?: "row" | "column";
  size?: CheckboxSize;
}

export function CheckboxGroup({
  options,
  values,
  onChange,
  direction = "column",
  size = "md",
}: CheckboxGroupProps) {
  function toggle(val: string) {
    onChange(
      values.includes(val) ? values.filter((v) => v !== val) : [...values, val]
    );
  }

  return (
    <View className={direction === "row" ? "flex-row flex-wrap gap-4" : "gap-3"}>
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          state={values.includes(opt.value) ? "checked" : "unchecked"}
          label={opt.label}
          disabled={opt.disabled}
          onPress={() => toggle(opt.value)}
          size={size}
        />
      ))}
    </View>
  );
}
