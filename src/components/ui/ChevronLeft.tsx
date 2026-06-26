import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

export function ChevronLeft() {
  const { isDark } = useTheme();
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
