import "../../global.css";
import { useEffect, useRef, useState } from 'react';
import { Text, TextInput as RNTextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Screen } from '../../../components/ui/Screen';
import { useScreenLayout } from '../../../hooks/useScreenLayout';

export default function ConfirmPinScreen() {
  const router = useRouter();
  const { W } = useScreenLayout();

  const boxSize = Math.floor((W - 48 - 36) / 4);

  // Step 1 = set PIN, Step 2 = confirm PIN
  const [step, setStep] = useState<1 | 2>(1);
  const [firstPin, setFirstPin] = useState<string[]>([]);
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);

  const inputRefs = useRef<(RNTextInput | null)[]>([null, null, null, null]);

  const allFilled = pin.every((d) => d !== '');
  const canProceed = allFilled && !pinError;

  const pinBoxClass = (index: number): string => {
    const base = 'rounded-2xl text-center font-inter-bold text-fg bg-input-bg';
    if (pinError) return `${base} border-2 border-error`;
    if (pin[index] !== '') return `${base} border-2 border-primary`;
    return `${base} border border-input-border`;
  };

  const handlePinChange = (text: string, index: number) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const updated = [...pin];
    updated[index] = digit;
    setPin(updated);
    if (pinError) setPinError(false);
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setFirstPin([...pin]);
      setPin(['', '', '', '']);
      setStep(2);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } else {
      if (pin.join('') === firstPin.join('')) {
        router.push('/(auth)/register/verification-status');
      } else {
        setPinError(true);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => inputRefs.current[0]?.focus(), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen>
      <View className="flex-1">

        {/* Back button */}
        <View className="px-4 pt-1 pb-1 items-start">
          <Button
            variant="ghost"
            color="dark"
            size="sm"
            icon={<ChevronLeft />}
            onPress={() => {
              if (step === 2) {
                setStep(1);
                setPin(['', '', '', '']);
                setPinError(false);
              } else {
                router.back();
              }
            }}
          />
        </View>

        <ProgressBar progress={6 / 8} />

        {/* Title + subtitle */}
        <View className="px-6 pt-2 gap-2">
          <Text className="font-inter-bold text-fg" style={{ fontSize: 26, lineHeight: 36 }}>
            Confirm Using PIN Code
          </Text>
          <Text className="font-inter-regular text-fg-2" style={{ fontSize: 15, lineHeight: 24 }}>
            You can use your PIN code to confirm transaction in the future
          </Text>
        </View>

        {/* PIN boxes */}
        <View className="px-6 pt-10 flex-row" style={{ gap: 12 }}>
          {pin.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              className={pinBoxClass(index)}
              value={digit}
              onChangeText={(text) => handlePinChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              caretHidden
              style={{ width: boxSize, height: boxSize, fontSize: 26, borderRadius: 16 }}
            />
          ))}
        </View>

        {/* Helper / error text */}
        <View className="px-6 pt-3">
          {pinError ? (
            <Text className="font-inter-regular text-error" style={{ fontSize: 14 }}>
              Pin code does not match
            </Text>
          ) : (
            <Text className="font-inter-regular text-fg-2" style={{ fontSize: 14 }}>
              Please provide us 4-digit PIN code
            </Text>
          )}
        </View>

        <View className="flex-1" />

        {/* Button */}
        <View className="px-6 pb-2">
          <Button
            title={canProceed ? 'Next' : 'Verify Your Pin'}
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!canProceed}
            onPress={handleNext}
          />
        </View>

      </View>
    </Screen>
  );
}
