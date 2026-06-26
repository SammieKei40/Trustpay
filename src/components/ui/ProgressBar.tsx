import { View } from 'react-native';

export function ProgressBar({ progress }: { progress: number }) {
  const pct = `${Math.min(Math.max(progress, 0), 1) * 100}%` as `${number}%`;
  return (
    <View className="mx-6 mt-2 mb-3">
      <View className="h-1.5 rounded-full bg-ui-border overflow-hidden">
        <View className="h-full bg-primary rounded-full" style={{ width: pct }} />
      </View>
    </View>
  );
}
