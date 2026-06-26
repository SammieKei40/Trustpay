import "../../global.css";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { PhoneInput } from '../../../components/ui/Input';
import { Screen } from '../../../components/ui/Screen';
import { validatePhone } from '../../../utils/validation';
import type { Country } from '../../../utils/countries';

export default function CreateAccountScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState('+880');
  const [phoneError, setPhoneError] = useState('');

  const canSubmit = phone.trim().length > 0;

  const handleNext = () => {
    const result = validatePhone(phone);
    if (!result.isValid) {
      setPhoneError(result.message);
      return;
    }
    router.push({
      pathname: '/(auth)/register/verify-otp',
      params: { phone, dialCode },
    });
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
            Create an Account
          </Text>
          <Text
            className="font-inter-regular text-fg-2"
            style={{ fontSize: 15, lineHeight: 24 }}
          >
            Enter your mobile number to verify your account.
          </Text>
        </View>

        {/* Form */}
        <View className="px-6 pt-7">
          <PhoneInput
            label="Phone Number"
            placeholder="Enter mobile number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (phoneError) setPhoneError('');
            }}
            defaultDialCode="+880"
            onCountryChange={(country: Country) => setDialCode(country.dialCode)}
            state={phoneError ? 'error' : 'default'}
            alertMessage={phoneError}
          />
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
            disabled={!canSubmit}
            onPress={handleNext}
          />
        </View>

      </View>
    </Screen>
  );
}
