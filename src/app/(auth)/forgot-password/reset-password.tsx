import "../../global.css";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { PasswordInput } from '../../../components/ui/Input';
import { Screen } from '../../../components/ui/Screen';

interface Check {
  label: string;
  passed: boolean;
}

export default function ResetPasswordScreen() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const checks: Check[] = [
    { label: '6-20 characters', passed: password.length >= 6 && password.length <= 20 },
    {
      label: 'Includes numbers, lowercase letters',
      passed: /[0-9]/.test(password) && /[a-z]/.test(password),
    },
    { label: 'No spaces', passed: password.length > 0 && !/\s/.test(password) },
    {
      label: 'Duplicate login name',
      passed: password.length > 0 && confirm.length > 0 && password === confirm,
    },
  ];

  const allPassed = checks.every((c) => c.passed);

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
            Reset your password
          </Text>
          <Text
            className="font-inter-regular text-fg-2"
            style={{ fontSize: 15, lineHeight: 24 }}
          >
            Your new password must be different from your previous used password
          </Text>
        </View>

        {/* Password fields */}
        <View className="px-6 pt-7 gap-4">
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>

        {/* Validation checklist */}
        <View className="px-6 pt-5 gap-3">
          {checks.map((check) => (
            <View key={check.label} className="flex-row items-center gap-2.5">
              <CheckIcon passed={check.passed} />
              <Text className="text-t-14 font-inter-regular text-fg-2">
                {check.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-1 min-h-8" />

        {/* Next button */}
        <View className="px-6 pb-2">
          <Button
            title="Next"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!allPassed}
            onPress={() => router.push('/(auth)/forgot-password/success')}
          />
        </View>

      </View>
    </Screen>
  );
}

function CheckIcon({ passed }: { passed: boolean }) {
  if (passed) {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <Circle cx={10} cy={10} r={10} fill="#2667FF" />
        <Path
          d="M6 10.5L8.5 13L14 7.5"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={9} stroke="#BDBDBD" strokeWidth={1.5} />
      <Path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="#BDBDBD"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
