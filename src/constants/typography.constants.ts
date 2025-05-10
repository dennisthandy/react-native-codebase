import { isSmallDevice, scaleFont } from '@/src/utils/dimension.utils';

export const FONTS = {
  regular: 'Poppins-Regular', // Replace 'System' with your custom font
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
  // e.g. customFont: 'CustomFont-Regular',
};

export const FONT_SIZES = {
  xs: scaleFont(isSmallDevice ? 10 : 12),
  sm: scaleFont(isSmallDevice ? 12 : 14),
  base: scaleFont(isSmallDevice ? 14 : 16),
  md: scaleFont(isSmallDevice ? 16 : 18),
  lg: scaleFont(isSmallDevice ? 18 : 20),
  xl: scaleFont(isSmallDevice ? 22 : 24),
  xxl: scaleFont(isSmallDevice ? 26 : 30),
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
};

export const TEXT_VARIANTS = {
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xxl,
    lineHeight: FONT_SIZES.xxl * LINE_HEIGHTS.tight,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xl,
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.tight,
  },
  h3: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.lg,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.tight,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
  },
  bodySemiBold: {
    fontFamily: FONTS.semibold,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
  },
  bodyBold: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
  },
  bodySmall: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xs,
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
  },
  button: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.tight,
  },
};

export type TextVariant = keyof typeof TEXT_VARIANTS;
