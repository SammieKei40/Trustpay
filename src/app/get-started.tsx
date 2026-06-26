import "./global.css";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, ButtonGroup } from '../components/ui/Button';
import { ChevronLeft } from '../components/ui/ChevronLeft';
import { Screen } from '../components/ui/Screen';
import { useTheme } from '../context/ThemeContext';
import { useScreenLayout } from '../hooks/useScreenLayout';

export default function GetStartedScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const { W, H, circleSize } = useScreenLayout();

  const titleFontSize = W < 380 ? 26 : 30;
  const titleLineHeight = W < 380 ? 34 : 42;

  return (
    <Screen scroll>
      <View style={{ flex: 1 }}>

        {/* ── Back button ────────────────────────────────────────────────── */}
        <View className="px-4 pt-1 pb-1" style={{ alignItems: 'flex-start' }}>
          <Button
            variant="ghost"
            color="dark"
            size="sm"
            icon={<ChevronLeft />}
            onPress={() => router.back()}
          />
        </View>

        {/* ── Circular illustration ─────────────────────────────────────── */}
        <View
          className="items-center"
          style={{ paddingVertical: Math.max(H * 0.02, 8) }}
        >
          <View
          >
            <Image
              source={isDark ? require('../../assets/images/get-started-dark.png') : require('../../assets/images/get-started.png')}
              style={{ width: circleSize * 0.88, height: circleSize * 0.88 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* ── Title + subtitle ──────────────────────────────────────────── */}
        <View
          className="px-6"
          style={{ gap: 14, alignItems: 'center', paddingTop: Math.max(H * 0.025, 12) }}
        >
          <Text
            className="font-inter-bold text-fg text-center"
            style={{ fontSize: titleFontSize, lineHeight: titleLineHeight }}
          >
            {'Create your\nTrustpay account'}
          </Text>
          <Text
            className="font-inter-regular text-fg-2 text-center"
            style={{ fontSize: 15, lineHeight: 23 }}
          >
            TrustPay is a powerful tool that allows you to send, receive, and
            track all your transactions.
          </Text>
        </View>

        {/* ── Spacer — expands on tall screens, collapses on short ones ─── */}
        <View style={{ flex: 1, minHeight: 24 }} />

        {/* ── Buttons + terms ───────────────────────────────────────────── */}
        <View className="px-6" style={{ gap: 12, paddingBottom: 8 }}>
          <ButtonGroup direction="column" fullWidth>
            <Button
              title="Log in"
              variant="filled"
              color="primary"
              size="lg"
              fullWidth
              onPress={() => router.push('/(auth)/welcome')}
            />
            <Button
              title="Register"
              variant="outlined"
              color="primary"
              size="lg"
              fullWidth
              onPress={() => router.push('/(auth)/register')}
            />
          </ButtonGroup>

          <View style={{ alignItems: 'center', paddingTop: 2, paddingBottom: 4 }}>
            <Text
              className="font-inter-regular text-fg-muted text-center"
              style={{ fontSize: 13, lineHeight: 20 }}
            >
              {'By continuing you accept our\n'}
              <Text className="text-primary font-inter-medium">Terms of Service</Text>
              <Text className="text-fg-muted"> and </Text>
              <Text className="text-primary font-inter-medium">Privacy Policy</Text>
            </Text>
          </View>
        </View>

      </View>
    </Screen>
  );
}
