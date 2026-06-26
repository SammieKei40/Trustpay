import "../global.css";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button } from '../../components/ui/Button';
import { PasswordInput, PhoneInput } from '../../components/ui/Input';
import { Screen } from '../../components/ui/Screen';
import { useTheme } from '../../context/ThemeContext';
import { validatePassword, validatePhone } from '../../utils/validation';

export default function LoginScreen() {
  const { isDark } = useTheme();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const canSubmit = phone.trim().length > 0 && password.length > 0;

  const handlePhoneBlur = () => {
    if (!phone) return;
    const result = validatePhone(phone);
    setPhoneError(result.isValid ? '' : result.message);
  };

  const handlePasswordBlur = () => {
    if (!password) return;
    const result = validatePassword(password);
    setPasswordError(result.isValid ? '' : result.message);
  };

  const handleLogin = () => {
    const phoneResult = validatePhone(phone);
    const passResult = validatePassword(password);

    setPhoneError(phoneResult.isValid ? '' : phoneResult.message);
    setPasswordError(passResult.isValid ? '' : passResult.message);

    if (!phoneResult.isValid || !passResult.isValid) return;

    // TODO: authenticate — on success navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <Screen scroll>
      <View style={{ flex: 1 }}>

        {/* ── Back button ────────────────────────────────────────────────── */}
        <View className="px-4 pt-1 pb-1" style={{ alignItems: 'flex-start' }}>
          <Button
            variant="ghost"
            color="dark"
            size="sm"
            icon={<ChevronLeft isDark={isDark} />}
            onPress={() => router.back()}
          />
        </View>

        {/* ── Title + subtitle ──────────────────────────────────────────── */}
        <View className="px-6 pt-4" style={{ gap: 8 }}>
          <Text
            className="font-inter-bold text-fg"
            style={{ fontSize: 26, lineHeight: 36 }}
          >
            Log in to Trustpay
          </Text>
          <Text
            className="font-inter-regular text-fg-2"
            style={{ fontSize: 15, lineHeight: 24 }}
          >
            Log in with your registered mobile number.
          </Text>
        </View>

        {/* ── Form ──────────────────────────────────────────────────────── */}
        <View className="px-6" style={{ gap: 16, paddingTop: 28 }}>

          <PhoneInput
            label="Phone Number"
            placeholder="Enter mobile number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (phoneError) setPhoneError('');
            }}
            defaultDialCode="+880"
            state={phoneError ? 'error' : 'default'}
            alertMessage={phoneError}
            onBlur={handlePhoneBlur}
          />

          <View style={{ gap: 8 }}>
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              state={passwordError ? 'error' : 'default'}
              alertMessage={passwordError}
              onBlur={handlePasswordBlur}
            />
            <Pressable
              style={{ alignSelf: 'flex-end' }}
              onPress={() => {/* TODO: forgot password flow */}}
            >
              <Text
                className="font-inter-medium text-primary"
                style={{ fontSize: 14, lineHeight: 20 }}
              >
                Forgot Password?
              </Text>
            </Pressable>
          </View>

        </View>

        {/* ── Spacer ────────────────────────────────────────────────────── */}
        <View style={{ flex: 1, minHeight: 32 }} />

        {/* ── Log In button ─────────────────────────────────────────────── */}
        <View className="px-6" style={{ paddingBottom: 8 }}>
          <Button
            title="Log In"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!canSubmit}
            onPress={handleLogin}
          />
        </View>

      </View>
    </Screen>
  );
}

// ─── Back chevron ─────────────────────────────────────────────────────────────

function ChevronLeft({ isDark }: { isDark: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19l-7-7 7-7"
        stroke={isDark ? '#FFFFFF' : '#0F172A'}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
