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

export default function IDPhotoScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const [frontUri, setFrontUri] = useState<string | null>(null);
  const [backUri, setBackUri] = useState<string | null>(null);
  const [pickerTarget, setPickerTarget] = useState<'front' | 'back' | null>(null);

  const canProceed = frontUri !== null && backUri !== null;
  const cardBorderColor = isDark ? '#424242' : '#E0E0E0';
  const iconColor = isDark ? '#FFFFFF' : '#0F172A';

  const openPicker = async (source: 'camera' | 'gallery') => {
    const target = pickerTarget;
    setPickerTarget(null);

    try {
      if (source === 'camera') {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (perm.status !== 'granted') {
          Alert.alert('Permission Required', 'Camera access is needed to take photos of your ID.');
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.85,
        });
        if (!result.canceled && result.assets.length > 0) {
          const asset = result.assets[0];
          if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
            Alert.alert('File Too Large', 'Please capture an image under 5MB.');
            return;
          }
          if (target === 'front') setFrontUri(asset.uri);
          else setBackUri(asset.uri);
        }
      } else {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (perm.status !== 'granted') {
          Alert.alert('Permission Required', 'Photo library access is needed to upload documents.');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.85,
        });
        if (!result.canceled && result.assets.length > 0) {
          const asset = result.assets[0];
          if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
            Alert.alert('File Too Large', 'Please select an image under 5MB.');
            return;
          }
          if (target === 'front') setFrontUri(asset.uri);
          else setBackUri(asset.uri);
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

        <ProgressBar progress={2 / 8} />

        {/* Title + subtitle */}
        <View className="px-6 pt-2 gap-2">
          <Text className="font-inter-bold text-fg" style={{ fontSize: 26, lineHeight: 36 }}>
            Take Photo of Your ID
          </Text>
          <Text className="font-inter-regular text-fg-2" style={{ fontSize: 15, lineHeight: 24 }}>
            Take a clear photo of your government issued ID.
          </Text>
        </View>

        {/* Front card */}
        <View className="px-6 pt-6">
          <Text className="font-inter-semibold text-fg" style={{ fontSize: 15 }}>Front</Text>
          <View style={{ position: 'relative', paddingBottom: 5 }}>
            <View style={{borderRadius: 12, overflow: 'hidden', aspectRatio: 1.6,}}>
              
              <Image
  source={
    frontUri
      ? { uri: frontUri }
      : isDark
      ? require('../../../../assets/images/front-dark.png')
      : require('../../../../assets/images/front.png')
  }
  style={{ flex: 1, width: '100%' }}
  contentFit="cover"
/>
            </View>
            <Pressable
              onPress={() => setPickerTarget('front')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: -2,
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#2667FF',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: isDark ? '#0F172A' : '#FFFFFF',
              }}
            >
              <CameraIcon size={20} />
            </Pressable>
          </View>
        </View>

        {/* Back card */}
        <View className="px-6 pt-5">
          <Text className="font-inter-semibold text-fg" style={{ fontSize: 15 }}>Back</Text>
          <View style={{ position: 'relative', paddingBottom: 5 }}>
            <View style={{borderRadius: 12, overflow: 'hidden', aspectRatio: 1.6 }}>
              
                <Image
  source={
    backUri
      ? { uri: backUri }
      : isDark
      ? require('../../../../assets/images/back-dark.png')
      : require('../../../../assets/images/back.png')
  }
  style={{ flex: 1, width: '100%' }}
  contentFit="cover"
/>
            </View>
            <Pressable
              onPress={() => setPickerTarget('back')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: -2,
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#2667FF',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: isDark ? '#0F172A' : '#FFFFFF',
              }}
            >
              <CameraIcon size={20} />
            </Pressable>
          </View>
        </View>

        <View className="flex-1 min-h-6" />

        {/* Next button */}
        <View className="px-6 pb-2">
          <Button
            title="Next"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!canProceed}
            onPress={() => router.push('/(auth)/register/selfie')}
          />
        </View>

      </View>

      {/* Photo source action sheet */}
      <Modal
        visible={pickerTarget !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerTarget(null)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' }}
          onPress={() => setPickerTarget(null)}
        >
          <Pressable onPress={() => {}}>
            <View className="bg-white dark:bg-dark rounded-t-3xl pt-3 pb-8">
              {/* Handle */}
              <View className="items-center mb-4">
                <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
              </View>

              <Text className="font-inter-semibold text-fg px-5 mb-4" style={{ fontSize: 17 }}>
                {pickerTarget === 'front' ? 'Front of ID' : 'Back of ID'}
              </Text>

              {/* Take Photo */}
              <Pressable
                onPress={() => openPicker('camera')}
                className="flex-row items-center px-5 py-4 gap-3.5 active:bg-black-5 dark:active:bg-dark-card"
              >
                <View
                  className="items-center justify-center rounded-xl bg-black-10 dark:bg-dark-card"
                  style={{ width: 44, height: 44 }}
                >
                  <CameraIcon color={iconColor} size={20} />
                </View>
                <Text className="font-inter-medium text-fg" style={{ fontSize: 15 }}>Take Photo</Text>
              </Pressable>

              {/* Upload from Gallery */}
              <Pressable
                onPress={() => openPicker('gallery')}
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
                onPress={() => setPickerTarget(null)}
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
