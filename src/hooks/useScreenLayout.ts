import { useWindowDimensions } from 'react-native';

/**
 * Shared layout values used across onboarding and get-started screens.
 * Centralising here means both screens always render with identical proportions.
 */
export function useScreenLayout() {
  const { width: W, height: H } = useWindowDimensions();

  // Image carousel height — capped so small screens keep room for text + button
  const imageH = Math.min(H * 0.48, 552);

  // Illustration circle for get-started — scales with width, capped by height on short screens
  const circleSize = Math.min(W * 0.82, H * 0.43, 340);

  return { W, H, imageH, circleSize };
}
