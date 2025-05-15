import { colors } from '@/src/constants/colors.constants';
import { useAppDispatch } from '@/src/hooks/useStore';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { setDrawerTitle } from '@/src/store/slices/ui/ui.slice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  const dispatch = useAppDispatch();

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
        listeners={{ tabPress: () => dispatch(setDrawerTitle('Home')) }}
      />
      <Tabs.Screen
        name="components/index"
        options={{
          title: 'Components',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="box-shadow" size={size} color={color} />
          ),
        }}
        listeners={{ tabPress: () => dispatch(setDrawerTitle('Components')) }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="adjust" size={size} color={color} />
          ),
        }}
        listeners={{ tabPress: () => dispatch(setDrawerTitle('Settings')) }}
      />
    </Tabs>
  );
}
