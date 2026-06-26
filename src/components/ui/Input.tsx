import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  COUNTRIES,
  Country,
  DEFAULT_COUNTRY,
  countryFlag,
  findCountryByDialCode,
} from "../../utils/countries";
import { useTheme } from "../../context/ThemeContext";

export type InputState = "default" | "error" | "success" | "disabled";

// ─── State-driven style maps (full static strings for NativeWind) ─────────────

const CONTAINER_STYLE: Record<string, string> = {
  default:       "bg-input-bg border border-input-border",
  focusedLight:  "bg-background-green border border-secondary",
  focusedDark:   "bg-input-bg border border-secondary",
  error:         "bg-input-bg border border-error",
  success:       "bg-input-bg border border-secondary",
  disabled:      "bg-surface border border-ui-border",
};

function containerStyle(state: InputState, focused: boolean, isDark: boolean): string {
  if (state === "disabled") return CONTAINER_STYLE.disabled;
  if (state === "error")    return CONTAINER_STYLE.error;
  if (state === "success")  return CONTAINER_STYLE.success;
  if (focused)              return isDark ? CONTAINER_STYLE.focusedDark : CONTAINER_STYLE.focusedLight;
  return CONTAINER_STYLE.default;
}

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

interface AppTextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  leftIcon?: (color: string) => React.ReactNode;
  keyboardType?: RNTextInputProps["keyboardType"];
  autoCapitalize?: RNTextInputProps["autoCapitalize"];
  onBlur?: () => void;
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
  onBlur,
}: AppTextInputProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";
  const ic = iconColor(state, focused, isDark);

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused, isDark)}`}
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
          onBlur={() => { setFocused(false); onBlur?.(); }}
        />
      </View>
      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}
    </View>
  );
}

// ─── PasswordInput ────────────────────────────────────────────────────────────

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  onBlur?: () => void;
}

export function PasswordInput({
  label,
  placeholder = "Password",
  value,
  onChangeText,
  state = "default",
  alertMessage,
  onBlur,
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
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused, isDark)}`}
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
          onBlur={() => { setFocused(false); onBlur?.(); }}
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
        className={`flex-row items-center rounded-xl px-4 py-3.5 gap-3 ${containerStyle(state, focused, isDark)}`}
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

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  defaultDialCode?: string;
  onCountryChange?: (country: Country) => void;
  onBlur?: () => void;
}

export function PhoneInput({
  label,
  placeholder,
  value,
  onChangeText,
  state = "default",
  alertMessage,
  defaultDialCode = "+880",
  onCountryChange,
  onBlur,
}: PhoneInputProps) {
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => findCountryByDialCode(defaultDialCode) ?? DEFAULT_COUNTRY
  );

  // Detect country from a numeric/dial-code query
  const isNumericQuery = search.trim().length > 0 && /^\+?\d+$/.test(search.trim());
  const dialCodeQuery = search.trim().startsWith('+')
    ? search.trim()
    : search.trim() ? '+' + search.trim() : '';
  const detectedCountry = isNumericQuery
    ? COUNTRIES.find((c) => c.dialCode === dialCodeQuery) ?? null
    : null;

  // Build list: for numeric queries show countries whose code starts with query;
  // for text queries filter by name or code; otherwise show all
  const listData = (() => {
    const q = search.trim();
    if (!q) return COUNTRIES;
    if (isNumericQuery) {
      return COUNTRIES.filter(
        (c) => c.dialCode.startsWith(dialCodeQuery) && c.dialCode !== dialCodeQuery
      );
    }
    const lower = q.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.dialCode.toLowerCase().includes(lower)
    );
  })();

  // Placeholder color needed as a plain value for RNTextInput
  const searchPlaceholderColor = isDark ? '#616161' : '#9E9E9E';

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearch('');
    onCountryChange?.(country);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearch('');
  };

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 ${containerStyle(state, focused, isDark)}`}
      >
        {/* Country prefix — tap to open picker */}
        <Pressable
          onPress={() => !isDisabled && setModalVisible(true)}
          className="flex-row items-center gap-1.5"
        >
          <Text style={{ fontSize: 20 }}>{countryFlag(selectedCountry.iso2)}</Text>
          <Text
            className={`text-t-14 font-inter-medium ${isDisabled ? "text-fg-muted" : "text-fg-2"}`}
          >
            {selectedCountry.dialCode}
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
          onChangeText={(text) => onChangeText?.(text.replace(/\D/g, ''))}
          editable={!isDisabled}
          keyboardType="phone-pad"
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
        />
      </View>

      {alertMessage && (state === "error" || state === "success") ? (
        <AlertRow message={alertMessage} type={state} />
      ) : null}

      {/* ── Country picker modal ───────────────────────────────────────────── */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={handleClose}
      >
        {/* Backdrop — tap to dismiss */}
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onPress={handleClose}
        >
          {/* Sheet — stop tap propagation */}
          <Pressable
            className="bg-white dark:bg-dark rounded-t-3xl pt-3"
            style={{ height: '75%' }}
            onPress={() => {}}
          >
            {/* Drag handle */}
            <View className="items-center mb-4">
              <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-t-18 font-inter-semibold text-dark dark:text-white">
                Select Country
              </Text>
              <Pressable onPress={handleClose} hitSlop={12}>
                <Text className="text-t-16 text-black-50 dark:text-black-60">✕</Text>
              </Pressable>
            </View>

            {/* Search input */}
            <View className="mx-5 mb-3 bg-black-10 dark:bg-dark-card rounded-xl px-3.5 py-2.5 flex-row items-center gap-2">
              <Text className="text-t-16 text-black-50 dark:text-black-60">🔍</Text>
              <RNTextInput
                className="flex-1 text-t-14 font-inter-regular text-dark dark:text-white"
                placeholder="Country name or +dial code..."
                placeholderTextColor={searchPlaceholderColor}
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')} hitSlop={8}>
                  <Text className="text-t-14 text-black-50 dark:text-black-60">✕</Text>
                </Pressable>
              )}
            </View>

            {/* Divider */}
            <View className="h-px bg-black-20 dark:bg-black-80 mb-1" />

            {/* Countries list */}
            <FlatList
              data={listData}
              keyExtractor={(item) => item.iso2}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                detectedCountry ? (
                  <Pressable
                    className="mx-5 mt-3 mb-1 p-4 rounded-xl border-2 border-secondary active:opacity-70"
                    style={{ backgroundColor: isDark ? 'rgba(0,195,137,0.12)' : 'rgba(0,195,137,0.07)' }}
                    onPress={() => handleSelect(detectedCountry)}
                  >
                    <Text className="text-t-11 font-inter-semibold text-secondary mb-2 uppercase tracking-wide">
                      Detected Country
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <Text style={{ fontSize: 30 }}>{countryFlag(detectedCountry.iso2)}</Text>
                      <View className="flex-1">
                        <Text className="text-t-14 font-inter-semibold text-dark dark:text-white">
                          {detectedCountry.name}
                        </Text>
                        <Text className="text-t-12 font-inter-regular text-black-60 dark:text-black-50">
                          {detectedCountry.dialCode}
                        </Text>
                      </View>
                      <View className="bg-secondary px-3 py-1.5 rounded-lg">
                        <Text className="text-t-12 font-inter-semibold text-white">Select</Text>
                      </View>
                    </View>
                  </Pressable>
                ) : null
              }
              renderItem={({ item }) => {
                const isSelected = item.iso2 === selectedCountry.iso2;
                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    className={`flex-row items-center px-5 py-3.5 gap-3.5 active:bg-black-5 dark:active:bg-dark-card ${
                      isSelected ? 'bg-black-5 dark:bg-dark-card' : ''
                    }`}
                  >
                    <Text style={{ fontSize: 22, width: 32, textAlign: 'center' }}>
                      {countryFlag(item.iso2)}
                    </Text>
                    <Text
                      className={`flex-1 text-t-14 ${
                        isSelected
                          ? 'font-inter-semibold text-secondary'
                          : 'font-inter-regular text-dark dark:text-white'
                      }`}
                    >
                      {item.name}
                    </Text>
                    <Text className="text-t-13 text-black-60 dark:text-black-50 min-w-12 text-right">
                      {item.dialCode}
                    </Text>
                    {isSelected && (
                      <Text className="text-t-16 text-secondary">✓</Text>
                    )}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  state?: InputState;
  alertMessage?: string;
  minHeight?: number;
  onBlur?: () => void;
}

export function TextArea({
  label,
  placeholder,
  value,
  onChangeText,
  state = "default",
  alertMessage,
  minHeight = 108,
  onBlur,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();
  const isDisabled = state === "disabled";

  return (
    <View>
      {label ? <Label text={label} /> : null}
      <View
        className={`rounded-xl px-4 py-3.5 ${containerStyle(state, focused, isDark)}`}
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
          onBlur={() => { setFocused(false); onBlur?.(); }}
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
