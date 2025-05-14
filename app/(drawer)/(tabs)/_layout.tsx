import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[theme as keyof typeof colors.primary],
        tabBarInactiveTintColor: color,
        headerShown: false,
        tabBarStyle: { backgroundColor },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="adjust" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
