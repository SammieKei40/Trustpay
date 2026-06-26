import "../../global.css";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Screen } from '../../../components/ui/Screen';
import { useScreenLayout } from '../../../hooks/useScreenLayout';

function GreenCheck({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Circle cx={14} cy={14} r={14} fill="#12D18E" />
      <Path d="M8 14.5l4 4 8-9" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function PhoneIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.62 10.5 19.79 19.79 0 01.56 1.9 2 2 0 012.53 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.5a16 16 0 006.59 6.59l.86-.86a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="#2667FF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

function DocumentIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="#2667FF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#2667FF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PhotoIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={2} stroke="#2667FF" strokeWidth={1.8} />
      <Circle cx={8.5} cy={8.5} r={1.5} fill="#2667FF" />
      <Path d="M21 15l-5-5L5 21" stroke="#2667FF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CloudIllustration({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220">
      {/* Background circle */}
      <Circle cx={110} cy={110} r={100} fill="#EAF7F4" />

      {/* Decorative: green hollow circle */}
      <Circle cx={38} cy={74} r={13} fill="none" stroke="#00C389" strokeWidth={2.5} />

      {/* Decorative: small grey circle */}
      <Circle cx={28} cy={148} r={5} fill="none" stroke="#9E9E9E" strokeWidth={1.5} />

      {/* Floating photo card (rotated) */}
      <G transform="rotate(-10, 110, 64) translate(62, 24)">
        <Rect width={88} height={66} rx={7} fill="white" />
        <Rect width={88} height={15} rx={5} fill="#2667FF" />
        <Rect x={6} y={20} width={24} height={34} rx={4} fill="#7EB8D6" />
        {/* Mountain shape inside photo */}
        <Path d="M6 44 L14 30 L22 38 L28 52 L6 52z" fill="#F5A050" />
        <Circle cx={24} cy={26} r={5} fill="#FBCC5C" />
        <Rect x={36} y={22} width={44} height={6} rx={3} fill="#E0E0E0" />
        <Rect x={36} y={33} width={34} height={6} rx={3} fill="#E0E0E0" />
        <Rect x={36} y={44} width={38} height={6} rx={3} fill="#E0E0E0" />
      </G>

      {/* Green plus badge */}
      <Circle cx={150} cy={34} r={11} fill="#12D18E" />
      <Path d="M145 34 H155 M150 29 V39" stroke="white" strokeWidth={2.5} strokeLinecap="round" />

      {/* Blue cloud */}
      <Path
        d="M62 158 C62 141 78 132 92 136 C96 117 118 110 133 122 C150 117 163 130 160 144 C170 141 180 151 177 162 C175 174 163 180 151 178 H78 C64 178 56 168 62 158 Z"
        fill="#2667FF"
      />

      {/* Upload tray */}
      <Rect x={88} y={165} width={44} height={9} rx={3} fill="rgba(255,255,255,0.85)" />

      {/* Upload arrow */}
      <Path d="M110 157 L110 142" stroke="white" strokeWidth={3} strokeLinecap="round" />
      <Path d="M102 150 L110 142 L118 150" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

const STATUS_ITEMS = [
  { key: 'phone', label: 'Phone verified', icon: <PhoneIcon /> },
  { key: 'doc', label: 'Checking up document ID', icon: <DocumentIcon /> },
  { key: 'photo', label: 'Verifying photo', icon: <PhotoIcon /> },
];

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { W } = useScreenLayout();
  const illustrationSize = Math.min(W * 0.62, 230);

  const [docDone, setDocDone] = useState(false);
  const [photoDone, setPhotoDone] = useState(false);

  const allDone = docDone && photoDone;

  useEffect(() => {
    const t1 = setTimeout(() => setDocDone(true), 2000);
    const t2 = setTimeout(() => setPhotoDone(true), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const isDone = (key: string) => {
    if (key === 'phone') return true;
    if (key === 'doc') return docDone;
    if (key === 'photo') return photoDone;
    return false;
  };

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

        <ProgressBar progress={7 / 8} />

        {/* Title + subtitle */}
        <View className="px-6 pt-2 gap-2">
          <Text className="font-inter-bold text-fg" style={{ fontSize: 26, lineHeight: 36 }}>
            Hold on a moment
          </Text>
          <Text className="font-inter-regular text-fg-2" style={{ fontSize: 15, lineHeight: 24 }}>
            We are reviewing your profile verification.
          </Text>
        </View>

        {/* Cloud illustration */}
        <View className="items-center pt-8">
          <CloudIllustration size={illustrationSize} />
        </View>

        {/* Status card */}
        <View
          className="mx-6 mt-6 rounded-2xl bg-surface dark:bg-dark-card"
          style={{ borderWidth: 1, borderColor: '#EEEEEE', overflow: 'hidden' }}
        >
          <View className="px-4 py-3.5">
            <Text className="font-inter-semibold text-fg" style={{ fontSize: 15 }}>Setting up your account</Text>
          </View>
          <View className="h-px bg-black-20" />

          {STATUS_ITEMS.map((item, index) => (
            <View key={item.key}>
              <View className="flex-row items-center px-4 py-4 gap-3.5">
                {/* Icon background */}
                <View
                  className="items-center justify-center rounded-xl"
                  style={{ width: 44, height: 44, backgroundColor: 'rgba(38,103,255,0.08)' }}
                >
                  {item.icon}
                </View>

                {/* Label */}
                <Text className="flex-1 font-inter-medium text-fg" style={{ fontSize: 14 }}>
                  {item.label}
                </Text>

                {/* Status indicator */}
                {isDone(item.key) ? (
                  <GreenCheck size={28} />
                ) : (
                  <ActivityIndicator size="small" color="#2667FF" />
                )}
              </View>
              {index < STATUS_ITEMS.length - 1 && <View className="h-px bg-black-20 mx-4" />}
            </View>
          ))}
        </View>

        <View className="flex-1" />

        {/* Complete verification button */}
        <View className="px-6 pb-2">
          <Button
            title="Complete verification"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!allDone}
            onPress={() => router.replace('/(tabs)')}
          />
        </View>

      </View>
    </Screen>
  );
}
