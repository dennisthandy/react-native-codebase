// app/_layout.js
import PoppinsBold from '@/src/assets/fonts/Poppins-Bold.otf';
import PoppinsMedium from '@/src/assets/fonts/Poppins-Medium.otf';
import PoppinsRegular from '@/src/assets/fonts/Poppins-Regular.otf';
import PoppinsSemiBold from '@/src/assets/fonts/Poppins-SemiBold.otf';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { store } from '@/src/store';
import * as Font from 'expo-font'; // For Expo projects
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': PoppinsRegular,
          'Poppins-Medium': PoppinsMedium,
          'Poppins-Bold': PoppinsBold,
          'Poppins-SemiBold': PoppinsSemiBold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hide();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={backgroundColor} />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
