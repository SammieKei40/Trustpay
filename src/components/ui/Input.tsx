import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

export type InputState = "default" | "error" | "success" | "disabled";

// ─── State-driven style maps (full static strings for NativeWind) ─────────────

const CONTAINER_STYLE: Record<string, string> = {
  default:  "bg-input-bg border border-input-border",
  focused:  "bg-background-green border border-secondary",
  error:    "bg-input-bg border border-error",
  success:  "bg-input-bg border border-secondary",
  disabled: "bg-surface border border-ui-border",
};

function containerStyle(state: InputState, focused: boolean): string {
  if (state === "disabled") return CONTAINER_STYLE.disabled;
  if (state === "error")    return CONTAINER_STYLE.error;
  if (state === "success")  return CONTAINER_STYLE.success;
  if (focused)              return CONTAINER_STYLE.focused;
  return CONTAINER_STYLE.default;
}

// Icon color: changes with focus/state so left icons feel reactive
function iconColor(state: InputState, focused: boolean, isDark: boolean): string {
  if (state === "disabled") return isDark ? "#424242" : "#D8D8D8";
  if (state === "error")    return "#F75555";
  if (state === "success" || focused) return "#00C389";
  return isDark ? "#616161" : "#9E9E9E";
}

function placeholderColor(state: InputState, isDark: boolean): string {
  if (state === "disabled") return isDark ? "#424242" : "#D8D8D8";
  return isDark ? "#616161" : "#BDBDBD";
}

// ─── Internal sub-components ──────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return (
    <Text className="text-t-12 font-inter-medium text-fg-2 mb-1.5">
      {text}
    </Text>
  );
}

function AlertRow({
  message,
  type,
}: {
  message: string;
  type: "error" | "success";
}) {
  const isError = type === "error";
  return (
    <View className="flex-row items-center gap-1.5 mt-1.5">
      <View
        className={`w-2 h-2 rounded-full ${isError ? "bg-error" : "bg-secondary"}`}
      />
      <Text
        className={`text-t-12 font-inter-regular ${isError ? "text-error" : "text-secondary"}`}
      >
        {message}
      </Text>
    </View>
  );
}

// ─── AppTextInput ─────────────────────────────────────────────────────────────
// Standard text input with optional reactive left icon (render-prop so the
// icon can receive the state-driven color automatically).

interface AppTextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  /** Render-prop — receives current icon color so it adapts to focus/state */
  leftIcon?: (color: string) => React.ReactNode;
  keyboardType?: RNTextInputProps["keyboardType"];
  autoCapitalize?: RNTextInputProps["autoCapitalize"];
}

export function AppTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  state = "default",
  alertMessage,
  leftIcon,
  keyboardType,
  autoCapitalize = "none",
}: AppTextInputProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";
  const ic = iconColor(state, focused, isDark);

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused)}`}
      >
        {leftIcon ? leftIcon(ic) : null}
        <RNTextInput
          className={`flex-1 text-t-14 font-inter-regular ${isDisabled ? "text-fg-muted" : "text-fg"}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor(state, isDark)}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── PasswordInput ────────────────────────────────────────────────────────────
// Text input with show/hide toggle. Eye icon stays neutral (UI affordance,
// not a semantic/state icon).

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
}

export function PasswordInput({
  label,
  placeholder = "Password",
  value,
  onChangeText,
  state = "default",
  alertMessage,
}: PasswordInputProps) {
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(true);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";
  const eyeColor = isDisabled
    ? (isDark ? "#424242" : "#D8D8D8")
    : (isDark ? "#616161" : "#BDBDBD");

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused)}`}
      >
        <RNTextInput
          className={`flex-1 text-t-14 font-inter-regular ${isDisabled ? "text-fg-muted" : "text-fg"}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor(state, isDark)}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          secureTextEntry={secure}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable
          onPress={() => !isDisabled && setSecure((s) => !s)}
          hitSlop={8}
        >
          {secure ? (
            <EyeOffIcon color={eyeColor} size={20} />
          ) : (
            <EyeIcon color={eyeColor} size={20} />
          )}
        </Pressable>
      </View>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── SelectInput ──────────────────────────────────────────────────────────────
// Pressable row that looks like an input. Pass onPress to open your picker.

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onPress?: () => void;
  state?: InputState;
  alertMessage?: string;
}

export function SelectInput({
  label,
  placeholder,
  value,
  onPress,
  state = "default",
  alertMessage,
}: SelectInputProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";
  const chevronColor = iconColor(state, focused, isDark);

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <Pressable
        onPress={!isDisabled ? onPress : undefined}
        onPressIn={() => !isDisabled && setFocused(true)}
        onPressOut={() => setFocused(false)}
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused)}`}
      >
        <Text
          className={`flex-1 text-t-14 font-inter-regular ${
            value
              ? isDisabled
                ? "text-fg-muted"
                : "text-fg"
              : "text-fg-muted"
          }`}
        >
          {value ?? placeholder}
        </Text>
        <ChevronDownIcon color={chevronColor} size={20} />
      </Pressable>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── PhoneInput ───────────────────────────────────────────────────────────────
// Left side shows flag + country code + separator, right side is the number
// field. onCountryPress opens your country picker.

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  flag?: string;
  countryCode?: string;
  onCountryPress?: () => void;
}

export function PhoneInput({
  label,
  placeholder,
  value,
  onChangeText,
  state = "default",
  alertMessage,
  flag = "🇧🇩",
  countryCode = "+880",
  onCountryPress,
}: PhoneInputProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 ${containerStyle(state, focused)}`}
      >
        {/* Country code prefix */}
        <Pressable
          onPress={!isDisabled ? onCountryPress : undefined}
          className="flex-row items-center gap-1.5"
        >
          <Text className="text-t-16">{flag}</Text>
          <Text
            className={`text-t-14 font-inter-medium ${isDisabled ? "text-fg-muted" : "text-fg-2"}`}
          >
            {countryCode}
          </Text>
          <Text className="text-t-14 text-fg-muted">•</Text>
        </Pressable>

        {/* Vertical separator */}
        <View className="w-px h-5 bg-ui-border mx-3" />

        {/* Phone number field */}
        <RNTextInput
          className={`flex-1 text-t-14 font-inter-regular ${isDisabled ? "text-fg-muted" : "text-fg"}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor(state, isDark)}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          keyboardType="phone-pad"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────
// Multiline input — grows from minHeight. textAlignVertical="top" keeps the
// caret at the start on Android.

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  minHeight?: number;
}

export function TextArea({
  label,
  placeholder,
  value,
  onChangeText,
  state = "default",
  alertMessage,
  minHeight = 108,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`rounded-xl px-4 py-3.5 ${containerStyle(state, focused)}`}
        style={{ minHeight }}
      >
        <RNTextInput
          className={`text-t-14 font-inter-regular ${isDisabled ? "text-fg-muted" : "text-fg"}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor(state, isDark)}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          multiline
          textAlignVertical="top"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, minHeight: minHeight - 28 }}
        />
      </View>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── SVG icon primitives ──────────────────────────────────────────────────────

function EyeIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function EyeOffIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronDownIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9l6 6 6-6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
