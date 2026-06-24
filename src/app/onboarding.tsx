import "./global.css";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useScreenLayout } from '../hooks/useScreenLayout';

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    key: '1',
    image: require('../../assets/images/onboarding-1.png') as number,
    before: 'Send, receive, and manage payments easily with ',
    highlight: 'Trustpay',
    after: '.',
    subtitle: "Your finance work starts here. We're here to help you track.",
    squiggle: false,
  },
  {
    key: '2',
    image: require('../../assets/images/onboarding-2.png') as number,
    before: 'Manage your financial ',
    highlight: 'savings',
    after: ' and keep your money organized.',
    subtitle:
      'Keeping track of your spending and making sure your savings increase and are spent prudently.',
    squiggle: false,
  },
  {
    key: '3',
    image: require('../../assets/images/onboarding-3.png') as number,
    before: 'Control access and protect your ',
    highlight: 'Space',
    after: '',
    subtitle:
      "Manage visitors, deliveries, and workers with ease. Know who's coming and keep your estate secure.",
    squiggle: true,
  },
] as const;

type SlideData = (typeof SLIDES)[number];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const { W, H, imageH } = useScreenLayout();

  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive text scale for small screens
  const titleFontSize = W < 380 ? 24 : 28;
  const titleLineHeight = W < 380 ? 32 : 38;
  const subtitleFontSize = H < 700 ? 14 : 15;

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index ?? 0);
  });

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.replace('/get-started');
    }
  };

  // isDark used only for Animated interpolation values (can't be className)
  const dotInactive = isDark ? '#E6F1FC' : '#E0E0E0';
  const stripeColor = isDark ? '#030E1A' : '#E6F1FC';
  const stripeOpacity = isDark ? 0.25 : 0.8;

  const slide = SLIDES[currentIndex];

  return (
    // SafeAreaView edges handles status-bar top + home-indicator bottom automatically
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-bg">

      {/* ── Image carousel: explicit pixel height — always reliable ─────── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES as unknown as SlideData[]}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({ length: W, offset: W * index, index })}
        style={{ height: imageH, flexGrow: 0 }}
        renderItem={({ item }) => (
          <SlideImage item={item} stripeColor={stripeColor} stripeOpacity={stripeOpacity} W={W} H={imageH} />
        )}
      />

      {/* ── Content: flex-1 fills what SafeAreaView left after the image ── */}
      {/*    justifyContent:"space-between" pins text to top, button to bottom */}
      <View
        className="flex-1 px-7"
        style={{ justifyContent: 'space-between', paddingTop: 20, paddingBottom: 4 }}
      >
        {/* Slide text — updates instantly when currentIndex changes */}
        <View style={{ gap: 10 }}>
          <View>
            <Text
              className="font-inter-bold text-fg"
              style={{ fontSize: titleFontSize, lineHeight: titleLineHeight, letterSpacing: -0.3 }}
            >
              {slide.before}
              <Text className="text-primary">{slide.highlight}</Text>
              {slide.after}
            </Text>
            {slide.squiggle && <Squiggle />}
          </View>
          <Text
            className="font-inter-regular text-fg-2"
            style={{ fontSize: subtitleFontSize, lineHeight: subtitleFontSize * 1.47 }}
          >
            {slide.subtitle}
          </Text>
        </View>

          <Dots
            total={SLIDES.length}
            scrollX={scrollX}
            W={W}
            dotActive="#2667FF"
            dotInactive={dotInactive}
            onDotPress={(i) => flatListRef.current?.scrollToIndex({ index: i, animated: true })}
          />

        {/* Dots + button — always at the bottom of the content area */}
        <View style={{ gap: 16 }}>
          <Button
            title={currentIndex < SLIDES.length - 1 ? 'Next' : 'Get Started'}
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Slide image (inside carousel) ───────────────────────────────────────────

function SlideImage({
  item,
  stripeColor,
  stripeOpacity,
  W,
  H,
}: {
  item: SlideData;
  stripeColor: string;
  stripeOpacity: number;
  W: number;
  H: number;
}) {
  return (
    <View style={{ width: W, height: H, overflow: 'hidden' }}>
      <BackgroundStripes color={stripeColor} strokeOpacity={stripeOpacity} W={W} H={H} />
      <Image
        source={item.image}
        style={{ width: W * 0.8, height: H * 0.9, alignSelf: 'center', marginTop: 'auto' }}
        contentFit="contain"
      />
    </View>
  );
}

// ─── Background stripes ───────────────────────────────────────────────────────

function BackgroundStripes({
  color,
  strokeOpacity,
  W,
  H,
}: {
  color: string;
  strokeOpacity: number;
  W: number;
  H: number;
}) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* viewBox matches the original design (375×285); xMidYMid slice fills the image area */}
      <Svg width={W} height={H} viewBox="0 0 375 285" preserveAspectRatio="xMidYMid slice">
        <Path
          d="M-96.4872 214.459C-64.3604 189.663 41.534 135.875 76.9377 114.819C133.592 81.1241 191.699 49.0018 247.719 14.5571C249.954 13.1831 256.682 9.97582 255.404 12.0543C247.226 25.3572 235.301 37.8658 225.06 50.0054C173.621 110.984 117.813 169.563 75.3985 235.601C74.9146 236.354 49.7522 277.387 57.9847 278.596C62.2334 279.219 431.76 54.1125 489.104 16.155C445.163 117.598 165.322 411.177 596.002 165.016"
          stroke={color}
          strokeOpacity={strokeOpacity}
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

// ─── Squiggle (slide 3 accent) ────────────────────────────────────────────────

function Squiggle() {
  return (
    <View style={{ position: 'absolute', right: 0, bottom: 0 }} pointerEvents="none">
      <Svg width={112} height={158} viewBox="0 0 112 158" fill="none">
        <Path
          d="M72.1142 5.35545C72.1142 5.35545 112.734 21.2102 108.213 55.4465C105.611 75.1576 75.9644 89.9589 59.0293 80.1324C42.0941 70.3058 44.1655 50.7324 63.7045 58.109C74.8115 62.3022 81.7193 69.7724 83.7625 81.6323C83.664 85.7128 81.6662 115.337 59.0784 134.394C36.4906 153.45 8.61177 152.153 1.49983 151.721"
          stroke="#0171DF"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M81.9605 4.32135C78.9595 4.21132 75.9335 4.32843 72.9389 4.18217C72.6126 4.16623 70.9742 3.89912 70.6712 4.08997C70.4035 4.25855 70.6208 4.97357 70.6697 5.155C71.3168 7.55505 71.9089 9.94312 72.4432 12.3557M72.4432 12.3557C73.0381 15.0421 71.8674 9.66981 72.4432 12.3557Z"
          stroke="#0171DF"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// ─── Pagination dots ──────────────────────────────────────────────────────────

function Dots({
  total,
  scrollX,
  W,
  dotActive,
  dotInactive,
  onDotPress,
}: {
  total: number;
  scrollX: Animated.Value;
  W: number;
  dotActive: string;
  dotInactive: string;
  onDotPress: (index: number) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => {
        const inputRange = [(i - 1) * W, i * W, (i + 1) * W];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 28, 8],
          extrapolate: 'clamp',
        });
        const bg = scrollX.interpolate({
          inputRange,
          outputRange: [dotInactive, dotActive, dotInactive],
          extrapolate: 'clamp',
        });
        return (
          <Pressable
            key={i}
            onPress={() => onDotPress(i)}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          >
            <Animated.View
              style={{ width: dotWidth, height: 8, borderRadius: 4, backgroundColor: bg }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
