import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('screen');
const PILL_W = 150;
const BLUE = '#3B6EFF';
const ARROW_SIZE = 72;
const ARROW_OFFSET = 18;

interface Props {
  onFinish: () => void;
  // Called while the watercolor is still fully covering the screen — safe to navigate here
  onBeforeFade?: () => void;
}

export function SplashAnimation({ onFinish, onBeforeFade }: Props) {
  const pillHeight = useRef(new Animated.Value(180)).current;
  const pillWidth = useRef(new Animated.Value(PILL_W)).current;
  const pillRadius = useRef(new Animated.Value(PILL_W / 2)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const arrowOpacity = useRef(new Animated.Value(1)).current;
  const rootOpacity = useRef(new Animated.Value(1)).current;

  // Keeps the full-screen image centered horizontally as the pill width expands
  const imageLeft = pillWidth.interpolate({
    inputRange: [PILL_W, W],
    outputRange: [(PILL_W - W) / 2, 0],
    extrapolate: 'clamp',
  });

  // Tracks the top edge of the pill so the arrow stays aligned without being inside overflow:hidden
  const arrowTop = pillHeight.interpolate({
    inputRange: [180, H + 200],
    outputRange: [H - 180 + ARROW_OFFSET, -(200 + ARROW_OFFSET)],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const ease = Easing.bezier(0.4, 0, 0.2, 1);

    Animated.sequence([
      Animated.delay(600),

      // Splash2 → Splash3: pill grows upward, title fades
      Animated.parallel([
        Animated.timing(pillHeight, {
          toValue: H + 200,
          duration: 1400,
          easing: ease,
          useNativeDriver: false,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),

      // Splash3 → Splash4: pill expands to full width, arrow fades
      Animated.parallel([
        Animated.timing(pillWidth, {
          toValue: W,
          duration: 700,
          easing: ease,
          useNativeDriver: false,
        }),
        Animated.timing(pillRadius, {
          toValue: 0,
          duration: 700,
          easing: ease,
          useNativeDriver: false,
        }),
        Animated.timing(arrowOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),

      // Hold on watercolor
      Animated.delay(700),
    ]).start(({ finished }) => {
      if (!finished) return;
      // Navigate while the watercolor still covers the screen — no flash
      onBeforeFade?.();
      // Now fade out to reveal the destination screen
      Animated.timing(rootOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(({ finished: fadeDone }) => {
        if (fadeDone) onFinish();
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: rootOpacity }]}>
      {/* Blue background fills screen */}
      <View style={StyleSheet.absoluteFill} />

      {/* Trustpay wordmark */}
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Trustpay
        </Animated.Text>
      </View>

      {/* Pill anchored at bottom-center */}
      <View style={styles.pillAnchor}>
        <Animated.View
          style={[
            styles.pill,
            {
              width: pillWidth,
              height: pillHeight,
              borderRadius: pillRadius,
            },
          ]}
        >
          {/* Image is full screen size, anchored to bottom — pill reveals it from dark-blue
              bottom upward toward pink top as it grows */}
          <Animated.View style={{ position: 'absolute', bottom: 0, width: W, height: H, left: imageLeft }}>
            <Image
              source={require('../../assets/images/watercolor-bg.png')}
              style={{ width: W, height: H }}
              contentFit="fill"
            />
          </Animated.View>
        </Animated.View>
      </View>

      {/* Arrow lives OUTSIDE the pill — overflow:hidden can no longer flip or corrupt it */}
      <Animated.View
        style={[styles.arrowWrap, { top: arrowTop, opacity: arrowOpacity }]}
      >
        <ArrowCircle />
      </Animated.View>
    </Animated.View>
  );
}

function ArrowCircle() {
  return (
    <Svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox="0 0 93 93" fill="none">
      <Rect width="93" height="93" rx="46.5" fill="#2667FF" />
      <Path
        d="M48.8319 21.5566C49.5315 22.2562 49.7647 22.9558 49.7647 23.8886L49.7647 70.5275C49.7647 72.3931 48.3656 73.7922 46.5 73.7922C44.6344 73.7922 43.2353 72.3931 43.2353 70.5275L43.2353 23.8886C43.2353 22.023 44.6344 20.6238 46.5 20.6238C47.4328 20.6238 48.1324 20.857 48.8319 21.5566Z"
        fill="white"
      />
      <Path
        d="M48.8319 21.5564L69.8195 42.544C71.2186 43.9431 71.2186 45.8087 69.8195 47.2079C68.4203 48.607 66.5547 48.607 65.1556 47.2079L46.5 28.5523L27.8444 47.2079C26.4452 48.607 24.5797 48.607 23.1805 47.2079C21.7814 45.8087 21.7814 43.9431 23.1805 42.544L44.168 21.5564C45.5672 20.1573 47.4328 20.1573 48.8319 21.5564Z"
        fill="white"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: BLUE,
    zIndex: 1000,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  pillAnchor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: H + 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pill: {
    overflow: 'hidden',
  },
  arrowWrap: {
    position: 'absolute',
    left: (W - ARROW_SIZE) / 2,
  },
});
