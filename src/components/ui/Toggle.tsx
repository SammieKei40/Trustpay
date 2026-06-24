import React, { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

export type ToggleSize = "sm" | "md";

interface ToggleProps {
  value: boolean;
  onValueChange?: (val: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
}

const SIZES: Record<ToggleSize, { trackW: number; trackH: number; thumbD: number }> = {
  md: { trackW: 52, trackH: 28, thumbD: 22 },
  sm: { trackW: 40, trackH: 22, thumbD: 17 },
};

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const { trackW, trackH, thumbD } = SIZES[size];
  const pad = (trackH - thumbD) / 2;
  const offX = pad;
  const onX = trackW - thumbD - pad;

  const tx = useRef(new Animated.Value(value ? onX : offX)).current;

  useEffect(() => {
    Animated.spring(tx, {
      toValue: value ? onX : offX,
      stiffness: 220,
      damping: 18,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const trackColor = disabled ? "#BDBDBD" : value ? "#2667FF" : "#BDBDBD";

  return (
    <Pressable
      onPress={() => !disabled && onValueChange?.(!value)}
      style={{
        width: trackW,
        height: trackH,
        borderRadius: trackH / 2,
        backgroundColor: trackColor,
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
      }}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: tx }],
          width: thumbD,
          height: thumbD,
          borderRadius: thumbD / 2,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.18,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </Pressable>
  );
}
