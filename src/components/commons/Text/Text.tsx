import {
  FONTS,
  LINE_HEIGHTS,
  TEXT_VARIANTS,
  TextVariant,
} from '@/src/constants/typography.constants';
import { useResponsiveTypography } from '@/src/hooks/useResponsiveTypography';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Text as RNText, type TextProps } from 'react-native';

type Props = TextProps &
  ComponentProps & {
    variant?: TextVariant;
  };

export function Text({
  style,
  lightColor,
  darkColor,
  variant = 'body',
  children,
  ...props
}: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontSizes = useResponsiveTypography();

  const variantStyles: Record<
    keyof typeof TEXT_VARIANTS,
    { fontFamily: string; fontSize: number; lineHeight: number }
  > = {
    h1: {
      fontFamily: FONTS.bold,
      fontSize: fontSizes.xxl,
      lineHeight: fontSizes.xxl * LINE_HEIGHTS.tight,
    },
    h2: {
      fontFamily: FONTS.bold,
      fontSize: fontSizes.xl,
      lineHeight: fontSizes.xl * LINE_HEIGHTS.tight,
    },
    h3: {
      fontFamily: FONTS.medium,
      fontSize: fontSizes.lg,
      lineHeight: fontSizes.lg * LINE_HEIGHTS.tight,
    },
    body: {
      fontFamily: FONTS.regular,
      fontSize: fontSizes.base,
      lineHeight: fontSizes.base * LINE_HEIGHTS.normal,
    },
    bodyBold: {
      fontFamily: FONTS.bold,
      fontSize: fontSizes.base,
      lineHeight: fontSizes.base * LINE_HEIGHTS.normal,
    },
    bodySemiBold: {
      fontFamily: FONTS.semibold,
      fontSize: fontSizes.base,
      lineHeight: fontSizes.base * LINE_HEIGHTS.normal,
    },
    bodySmall: {
      fontFamily: FONTS.regular,
      fontSize: fontSizes.sm,
      lineHeight: fontSizes.sm * LINE_HEIGHTS.normal,
    },
    caption: {
      fontFamily: FONTS.regular,
      fontSize: fontSizes.xs,
      lineHeight: fontSizes.xs * LINE_HEIGHTS.normal,
    },
    button: {
      fontFamily: FONTS.medium,
      fontSize: fontSizes.base,
      lineHeight: fontSizes.base * LINE_HEIGHTS.tight,
    },
  };

  return (
    <RNText {...props} style={[{ color }, variantStyles[variant], style]}>
      {children}
    </RNText>
  );
}
