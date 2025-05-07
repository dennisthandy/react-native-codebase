// app/(auth)/_layout.js
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTintColor: color,
      }}
    >
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
      <Stack.Screen name="forgot-password/index" />
    </Stack>
  );
}
