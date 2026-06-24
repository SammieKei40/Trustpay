import React from "react";
import { Pressable, Text, View } from "react-native";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonColor = "primary" | "dark" | "danger";
export type ButtonSize = "lg" | "md" | "sm" | "xs";

interface ButtonProps {
  title?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
}

// ─── Container color per variant × color ─────────────────────────────────────

const containerColor: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary: "bg-primary active:opacity-75",
    dark:    "bg-dark active:opacity-75",      // #0F172A
    danger:  "bg-error active:opacity-75",
  },
  outlined: {
    primary: "border border-primary bg-transparent active:bg-black-10",
    dark:    "border border-dark bg-transparent active:bg-black-10",
    danger:  "border border-error bg-transparent active:bg-black-10",
  },
  ghost: {
    primary: "bg-transparent active:bg-black-10",
    dark:    "bg-transparent active:bg-black-10",
    danger:  "bg-transparent active:bg-black-10",
  },
};

// Icon-only ghost gets a visible circle background instead of transparent
const iconOnlyGhostBg = "bg-black-10 active:bg-black-20";

// ─── Text color per variant × color ──────────────────────────────────────────

const textColor: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary: "text-white",
    dark:    "text-white",
    danger:  "text-white",
  },
  outlined: {
    primary: "text-primary",
    dark:    "text-dark",
    danger:  "text-error",
  },
  ghost: {
    primary: "text-primary",
    dark:    "text-dark",
    danger:  "text-error",
  },
};

// ─── Size maps ────────────────────────────────────────────────────────────────

const buttonSize: Record<ButtonSize, string> = {
  lg: "px-6 py-4 rounded-xl gap-2",
  md: "px-5 py-3 rounded-xl gap-2",
  sm: "px-4 py-2.5 rounded-lg gap-1.5",
  xs: "px-3 py-2 rounded-lg gap-1",
};

const iconSize: Record<ButtonSize, string> = {
  lg: "w-14 h-14 rounded-full",
  md: "w-12 h-12 rounded-full",
  sm: "w-10 h-10 rounded-full",
  xs: "w-8 h-8 rounded-full",
};

// Inter SemiBold is the typeface used for all button labels in the design
const textSize: Record<ButtonSize, string> = {
  lg: "text-t-16 font-inter-medium",
  md: "text-t-14 font-inter-medium",
  sm: "text-t-14 font-inter-medium",
  xs: "text-t-12 font-inter-medium",
};

// ─── Disabled container per variant ──────────────────────────────────────────

const disabledContainer: Record<ButtonVariant, string> = {
  filled:   "bg-disable",
  outlined: "border border-disable bg-transparent",
  ghost:    "bg-transparent",
};

// icon-only disabled always shows a grey circle
const disabledIconOnlyContainer = "bg-disable";

// ─── Component ───────────────────────────────────────────────────────────────

export function Button({
  title,
  variant = "filled",
  color = "primary",
  size = "lg",
  disabled = false,
  onPress,
  icon,
  iconOnly = false,
  fullWidth = false,
}: ButtonProps) {
  const resolvedContainerColor = (() => {
    if (disabled) {
      return iconOnly ? disabledIconOnlyContainer : disabledContainer[variant];
    }
    if (iconOnly && variant === "ghost") return iconOnlyGhostBg;
    return containerColor[variant][color];
  })();

  const containerClasses = [
    "flex-row items-center justify-center",
    iconOnly ? iconSize[size] : buttonSize[size],
    !iconOnly && fullWidth ? "w-full" : "",
    resolvedContainerColor,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    textSize[size],
    disabled ? "text-black-40" : textColor[variant][color],
  ].join(" ");

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={containerClasses}
    >
      {icon ? <View>{icon}</View> : null}
      {!iconOnly && title ? (
        <Text className={labelClasses}>{title}</Text>
      ) : null}
    </Pressable>
  );
}

// ─── ButtonGroup ─────────────────────────────────────────────────────────────

interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  fullWidth?: boolean;
}

export function ButtonGroup({
  children,
  direction = "row",
  fullWidth = false,
}: ButtonGroupProps) {
  return (
    <View
      className={[
        direction === "row" ? "flex-row items-center" : "flex-col",
        "gap-3",
        fullWidth ? "w-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </View>
  );
}
