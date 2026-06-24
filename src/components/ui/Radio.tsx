import React from "react";
import { Pressable, Text, View } from "react-native";

export type RadioSize = "sm" | "md";

interface RadioProps {
  selected?: boolean;
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
  size?: RadioSize;
}

const SIZES: Record<RadioSize, { outer: number; inner: number }> = {
  md: { outer: 22, inner: 10 },
  sm: { outer: 18, inner: 8 },
};

export function Radio({
  selected = false,
  label,
  disabled = false,
  onPress,
  size = "md",
}: RadioProps) {
  const { outer, inner } = SIZES[size];
  const borderColor = disabled ? "#BDBDBD" : selected ? "#2667FF" : "#9E9E9E";
  const dotColor = disabled ? "#BDBDBD" : "#2667FF";

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      className="flex-row items-center gap-2.5"
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
    >
      <View
        style={{
          width: outer,
          height: outer,
          borderRadius: outer / 2,
          borderWidth: 2,
          borderColor,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        {selected && (
          <View
            style={{
              width: inner,
              height: inner,
              borderRadius: inner / 2,
              backgroundColor: dotColor,
            }}
          />
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

// ─── RadioGroup ───────────────────────────────────────────────────────────────

interface RadioGroupProps<T extends string> {
  options: { value: T; label: string; disabled?: boolean }[];
  value: T;
  onChange: (value: T) => void;
  direction?: "row" | "column";
  size?: RadioSize;
}

export function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  direction = "column",
  size = "md",
}: RadioGroupProps<T>) {
  return (
    <View className={direction === "row" ? "flex-row flex-wrap gap-4" : "gap-3"}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          selected={value === opt.value}
          label={opt.label}
          disabled={opt.disabled}
          onPress={() => onChange(opt.value)}
          size={size}
        />
      ))}
    </View>
  );
}
