import { colors } from '@/src/constants/colors.constants';
import { TEXT_VARIANTS } from '@/src/constants/typography.constants';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useStore';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { setDrawerTitle } from '@/src/store/slices/ui/ui.slice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useCallback } from 'react';
import { StatusBar, StyleProp, useColorScheme, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type DrawerContentProps = {
  setTitle: (title: string) => void;
};

const DrawerContent = ({ setTitle }: DrawerContentProps) => {
  const pathname = usePathname();
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');

  const getActiveStyle = useCallback(
    (path: string): StyleProp<ViewStyle> => {
      return pathname === path
        ? { backgroundColor: colors.primary[theme as keyof typeof colors.primary] }
        : { backgroundColor: 'transparent' };
    },
    [pathname, theme],
  );

  return (
    <DrawerContentScrollView style={{ backgroundColor }}>
      <DrawerItem
        style={getActiveStyle('/')}
        label={'Home'}
        labelStyle={{ ...TEXT_VARIANTS.body, color }}
        onPress={() => {
          router.navigate('/(drawer)/(tabs)');
          setTitle('Home');
        }}
        icon={() => <MaterialCommunityIcons name="home" size={24} color={color} />}
      />
      <DrawerItem
        label={'Components'}
        style={getActiveStyle('/components')}
        labelStyle={{ ...TEXT_VARIANTS.body, color }}
        onPress={() => {
          router.navigate('/(drawer)/(tabs)/components');
          setTitle('Components');
        }}
        icon={() => <MaterialCommunityIcons name="box-shadow" size={24} color={color} />}
      />
      <DrawerItem
        style={getActiveStyle('/settings')}
        label={'Settings'}
        labelStyle={{ ...TEXT_VARIANTS.body, color }}
        onPress={() => {
          router.navigate('/(drawer)/(tabs)/settings');
          setTitle('Settings');
        }}
        icon={() => <MaterialCommunityIcons name="adjust" size={24} color={color} />}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  const dispatch = useAppDispatch();
  const { title } = useAppSelector(state => state.ui.drawer);
  const setTitle = (title: string) => dispatch(setDrawerTitle(title));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={backgroundColor} />
      <Drawer
        screenOptions={{
          title,
          headerStyle: {
            backgroundColor,
            borderBottomWidth: 0.5,
            height: 52,
          },
          headerTintColor: color,
        }}
        drawerContent={() => <DrawerContent setTitle={setTitle} />}
      />
    </GestureHandlerRootView>
  );
}
