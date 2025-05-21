import { View as RNView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export function View({ style, lightColor, direction = 'column', darkColor, ...props }: Props) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <RNView style={[{ backgroundColor, flexDirection: direction }, style]} {...props} />;
}
