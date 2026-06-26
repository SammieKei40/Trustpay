import "../../global.css";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { Screen } from '../../../components/ui/Screen';

type OtpError = 'incorrect' | 'expired' | null;

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, dialCode } = useLocalSearchParams<{ phone: string; dialCode: string }>();

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [error, setError] = useState<OtpError>(null);
  const [timer, setTimer] = useState(120);

  const inputRefs = useRef<(RNTextInput | null)[]>([null, null, null, null, null]);

  const timerExpired = timer <= 0;
  const allFilled = otp.every((d) => d !== '');
  const canVerify = allFilled && error === null;

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const timerDisplay = (() => {
    const m = Math.floor(timer / 60).toString().padStart(2, '0');
    const s = (timer % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  })();

  const handleOtpChange = (text: string, index: number) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    if (error) setError(null);
    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '']);
    setError(null);
    setTimer(120);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    router.push('/(auth)/forgot-password/reset-password');
  };

  const formattedPhone = `${dialCode ?? '+880'} ${phone ?? ''}`;

  const otpBoxClass = (index: number): string => {
    const base = 'flex-1 h-16 rounded-xl text-center font-inter-bold text-fg bg-input-bg';
    if (error !== null) return `${base} border-2 border-error`;
    if (otp[index] !== '') return `${base} border-2 border-primary`;
    return `${base} border border-input-border`;
  };

  return (
    <Screen scroll>
      <View className="flex-1">

        {/* Back button */}
        <View className="px-4 pt-1 pb-1 items-start">
          <Button
            variant="ghost"
            color="dark"
            size="sm"
            icon={<ChevronLeft />}
            onPress={() => router.back()}
          />
        </View>

        {/* Title + subtitle */}
        <View className="px-6 pt-4 gap-2">
          <Text
            className="font-inter-bold text-fg"
            style={{ fontSize: 26, lineHeight: 36 }}
          >
            Input verification code
          </Text>
          <Text
            className="font-inter-regular text-fg-2"
            style={{ fontSize: 15, lineHeight: 24 }}
          >
            We've sent the code to {formattedPhone}
          </Text>
        </View>

        {/* OTP boxes */}
        <View className="px-6 pt-9 flex-row gap-2.5">
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              className={otpBoxClass(index)}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              caretHidden
              style={{ fontSize: 22 }}
            />
          ))}
        </View>

        {/* Error message */}
        {error !== null && (
          <View className="px-6 pt-2.5">
            <Text className="text-t-14 font-inter-regular text-error">
              {error === 'incorrect' ? 'Incorrect OTP code' : 'OTP code expired'}
            </Text>
          </View>
        )}

        {/* Timer / Resend row */}
        <View className="px-6 pt-3.5 flex-row justify-between items-center">
          {timerExpired ? (
            <>
              <Text className="text-t-14 font-inter-regular text-fg">
                Don't receive an OTP?
              </Text>
              <Pressable onPress={handleResend} hitSlop={8}>
                <Text className="text-t-14 font-inter-semibold text-primary">
                  Resend now
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text className="text-t-14 font-inter-regular text-fg">
                Resend code for reload
              </Text>
              <Text className="text-t-14 font-inter-bold text-fg">
                {timerDisplay}
              </Text>
            </>
          )}
        </View>

        <View className="flex-1 min-h-8" />

        {/* Verify button */}
        <View className="px-6 pb-2">
          <Button
            title="Verify Your Number"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!canVerify}
            onPress={handleVerify}
          />
        </View>

      </View>
    </Screen>
  );
}
