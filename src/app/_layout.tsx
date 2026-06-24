import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { SplashAnimation } from "../components/SplashAnimation";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide native splash — custom animation takes over seamlessly (same blue bg)
      SplashScreen.hideAsync();
      setShowSplash(true);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
      {showSplash && (
        <SplashAnimation onFinish={() => setShowSplash(false)} />
      )}
    </ThemeProvider>
  );
}
