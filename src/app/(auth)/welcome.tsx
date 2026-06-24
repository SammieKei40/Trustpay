import "../global.css";
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { useTheme } from '../../context/ThemeContext';
import { useScreenLayout } from '../../hooks/useScreenLayout';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const { W, H, circleSize } = useScreenLayout();

  return (
    <Screen scroll>
      <View style={{ flex: 1 }}>

        {/* ── Back button ────────────────────────────────────────────────── */}
        <View className="px-4 pt-1 pb-1" style={{ alignItems: 'flex-start' }}>
          <Button
            color="dark"
            size="sm"
            icon={<ChevronLeft isDark={isDark} />}
            onPress={() => router.back()}
          />
        </View>

        {/* ── Illustration ───────────────────────────────────────────────── */}
        <View
          className="items-center"
          style={{ paddingTop: Math.max(H * 0.03, 16), paddingBottom: Math.max(H * 0.03, 16) }}
        >
<Image
              source={isDark ? require('../../../assets/images/welcome-dark.png') : require('../../../assets/images/welcome.png')}
              style={{ width: circleSize * 0.88, height: circleSize * 0.88 }}
              contentFit="contain"
            />
        </View>

        {/* ── Title + subtitle ──────────────────────────────────────────── */}
        <View className="px-7" style={{ gap: 12, alignItems: 'center' }}>
          <Text
            className="font-inter-bold text-fg text-center"
            style={{ fontSize: 26, lineHeight: 36 }}
          >
            {'Congratulations!\nWelcome to Trustpay'}
          </Text>
          <Text
            className="font-inter-regular text-fg-2 text-center"
            style={{ fontSize: 15, lineHeight: 24 }}
          >
            We are happy to have you. It's time to send, receive and track your expense.
          </Text>
        </View>

        {/* ── Spacer ────────────────────────────────────────────────────── */}
        <View style={{ flex: 1, minHeight: 32 }} />

        {/* ── Continue button ───────────────────────────────────────────── */}
        <View className="px-6" style={{ paddingBottom: 8 }}>
          <Button
            title="Continue"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/(auth)/login')}
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
