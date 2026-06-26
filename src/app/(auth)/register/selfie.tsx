import "../../global.css";
import { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import Svg, { Circle, Path } from 'react-native-svg';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Screen } from '../../../components/ui/Screen';
import { useScreenLayout } from '../../../hooks/useScreenLayout';
import { useTheme } from '../../../context/ThemeContext';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function CameraIcon({ color = 'white', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Circle cx={12} cy={13} r={4} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function GalleryIcon({ color = '#0F172A', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Circle cx={8.5} cy={8.5} r={1.5} fill={color} />
      <Path d="M21 15l-5-5L5 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function SelfieScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { W } = useScreenLayout();
  const circleSize = Math.min(W * 0.62, 260);

  const iconColor = isDark ? '#FFFFFF' : '#0F172A';

  const openSelfie = async (source: 'camera' | 'gallery') => {
    setShowPicker(false);

    try {
      if (source === 'camera') {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (perm.status !== 'granted') {
          Alert.alert('Permission Required', 'Camera access is needed to take your selfie.');
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.85,
          cameraType: ImagePicker.CameraType.front,
        });
        if (!result.canceled && result.assets.length > 0) {
          const asset = result.assets[0];
          if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
            Alert.alert('File Too Large', 'Please capture an image under 5MB.');
            return;
          }
          setSelfieUri(asset.uri);
        }
      } else {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (perm.status !== 'granted') {
          Alert.alert('Permission Required', 'Photo library access is needed to upload your photo.');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.85,
        });
        if (!result.canceled && result.assets.length > 0) {
          const asset = result.assets[0];
          if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
            Alert.alert('File Too Large', 'Please select an image under 5MB.');
            return;
          }
          setSelfieUri(asset.uri);
        }
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <Screen scroll>
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

        <ProgressBar progress={3 / 8} />

        {/* Title + subtitle */}
        <View className="px-6 pt-2 gap-2">
          <Text className="font-inter-bold text-fg" style={{ fontSize: 26, lineHeight: 36 }}>
            Take a selfie to verify ID
          </Text>
          <Text className="font-inter-regular text-fg-2" style={{ fontSize: 15, lineHeight: 24 }}>
            If any information is incorrect, please retake the ID photo.
          </Text>
        </View>

        {/* Selfie circle + camera button */}
        <View className="items-center pt-8">
          <View style={{ position: 'relative', width: circleSize, height: circleSize }}>
            <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, overflow: 'hidden' }}>
              
                            <Image
                source={
                  selfieUri
                    ? { uri: selfieUri }
                    : isDark
                    ? require('../../../../assets/images/selfie-dark.png')
                    : require('../../../../assets/images/selfie.png')
                }
                style={{ width: circleSize, height: circleSize }}
                contentFit="cover"
              />
            </View>
            {/* Camera button at bottom-right */}
            <Pressable
              onPress={() => setShowPicker(true)}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#2667FF',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: isDark ? '#0F172A' : '#FFFFFF',
              }}
            >
              <CameraIcon size={18} />
            </Pressable>
          </View>
        </View>

        {/* Info box */}
        <View
          className="mx-6 mt-7 rounded-xl"
          style={{ backgroundColor: 'rgba(38,103,255,0.08)', borderWidth: 1, borderColor: 'rgba(38,103,255,0.18)', padding: 16, gap: 10 }}
        >
          <Text className="font-inter-semibold text-fg" style={{ fontSize: 14 }}>Make sure that:</Text>
          {[
            'Face forward, make sure your face is clearly visible',
            'Ensure clear lighting, with no glare',
            'Remove your glasses, if necessary',
          ].map((tip, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              <View style={{ marginTop: 2 }}>
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Circle cx={12} cy={12} r={12} fill="#2667FF" />
                  <Path d="M7 12.5l3.5 3.5L17 9" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </Svg>
              </View>
              <Text className="font-inter-regular text-fg flex-1" style={{ fontSize: 14, lineHeight: 21 }}>{tip}</Text>
            </View>
          ))}
        </View>

        <View className="flex-1 min-h-6" />

        {/* Next / Upload button */}
        <View className="px-6 pb-2">
          {selfieUri ? (
            <Button
              title="Next"
              variant="filled"
              color="primary"
              size="lg"
              fullWidth
              onPress={() => router.push('/(auth)/register/confirm-pin')}
            />
          ) : (
            <Button
              title="Upload Your Photo"
              variant="filled"
              color="primary"
              size="lg"
              fullWidth
              disabled
              onPress={() => {}}
            />
          )}
        </View>

      </View>

      {/* Photo source action sheet */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' }}
          onPress={() => setShowPicker(false)}
        >
          <Pressable onPress={() => {}}>
            <View className="bg-white dark:bg-dark rounded-t-3xl pt-3 pb-8">
              {/* Handle */}
              <View className="items-center mb-4">
                <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
              </View>

              <Text className="font-inter-semibold text-fg px-5 mb-4" style={{ fontSize: 17 }}>
                Take a Selfie
              </Text>

              {/* Take Selfie */}
              <Pressable
                onPress={() => openSelfie('camera')}
                className="flex-row items-center px-5 py-4 gap-3.5 active:bg-black-5 dark:active:bg-dark-card"
              >
                <View
                  className="items-center justify-center rounded-xl bg-black-10 dark:bg-dark-card"
                  style={{ width: 44, height: 44 }}
                >
                  <CameraIcon color={iconColor} size={20} />
                </View>
                <Text className="font-inter-medium text-fg" style={{ fontSize: 15 }}>Take Selfie</Text>
              </Pressable>

              {/* Upload from Gallery */}
              <Pressable
                onPress={() => openSelfie('gallery')}
                className="flex-row items-center px-5 py-4 gap-3.5 active:bg-black-5 dark:active:bg-dark-card"
              >
                <View
                  className="items-center justify-center rounded-xl bg-black-10 dark:bg-dark-card"
                  style={{ width: 44, height: 44 }}
                >
                  <GalleryIcon color={iconColor} size={20} />
                </View>
                <Text className="font-inter-medium text-fg" style={{ fontSize: 15 }}>Upload from Gallery</Text>
              </Pressable>

              {/* Cancel */}
              <Pressable
                onPress={() => setShowPicker(false)}
                className="mx-5 mt-3 rounded-xl bg-black-10 dark:bg-dark-card py-3.5 items-center active:opacity-70"
              >
                <Text className="font-inter-semibold text-fg" style={{ fontSize: 15 }}>Cancel</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

    </Screen>
  );
}
