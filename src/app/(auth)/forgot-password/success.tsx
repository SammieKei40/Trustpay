import "../../global.css";
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { Screen } from '../../../components/ui/Screen';
import { Image } from 'expo-image';
import { useTheme } from '../../../context/ThemeContext';
import { useScreenLayout } from '../../../hooks/useScreenLayout';

export default function ResetSuccessScreen() {
  const router = useRouter();
    const { isDark } = useTheme();
    const { W, H, circleSize } = useScreenLayout();
  

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
            onPress={() => router.back()}
          />
        </View>

        {/* Illustration + text */}
        <View className="flex-1 items-center justify-center px-6 gap-5">
          <Image
                        source={isDark ? require('../../../../assets/images/reset-success-dark.png') : require('../../../../assets/images/reset-success.png')}
                        style={{ width: circleSize * 0.88, height: circleSize * 0.88 }}
                        contentFit="contain"
                      />

          <View className="items-center gap-2 mt-2">
            <Text
              className="font-inter-bold text-fg text-center"
              style={{ fontSize: 26, lineHeight: 36 }}
            >
              Reset Successfully
            </Text>
            <Text
              className="font-inter-regular text-fg-2 text-center"
              style={{ fontSize: 15, lineHeight: 24 }}
            >
              Please re-login to get started
            </Text>
          </View>
        </View>

        {/* Login button */}
        <View className="px-6 pb-2">
          <Button
            title="Login"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            onPress={() => router.replace('/(auth)/login')}
          />
        </View>

      </View>
    </Screen>
  );
}