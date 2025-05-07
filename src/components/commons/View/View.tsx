import { View as RNView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function View({ style, lightColor, darkColor, ...props }: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <RNView style={[{ backgroundColor }, style]} {...props} />;
}
