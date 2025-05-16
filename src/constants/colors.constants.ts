/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: {
    main: '#FF4D8D',
    light: '#FF80AB',
    dark: '#C60055',
  },
  secondary: {
    main: '#7E57C2',
    light: '#B085F5',
    dark: '#4D2C91',
  },
  neutral: {
    background: '#FFFFFF',
    surface: '#F9F0F5',
    textPrimary: '#212121',
    textSecondary: '#757575',
  },
  support: {
    success: {
      100: '#E8F5E9',
      200: '#C8E6C9',
      300: '#A5D6A7',
      400: '#81C784',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
    },
    warning: {
      100: '#FFF8E1',
      200: '#FFECB3',
      300: '#FFE082',
      400: '#FFD54F',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
    },
    error: {
      100: '#FFEBEE',
      200: '#FFCDD2',
      300: '#EF9A9A',
      400: '#E57373',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
    },
    info: {
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
      400: '#64B5F6',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
    },
  },
  gray: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
  },
};
