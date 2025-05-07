import { scaleFont } from '@/src/utils/dimension.utils';
import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export const useResponsiveTypography = () => {
  const [fontSizes, setFontSizes] = useState(() => {
    const { width } = Dimensions.get('window');
    const smallDevice = width < 375;

    return {
      xs: scaleFont(smallDevice ? 10 : 12),
      sm: scaleFont(smallDevice ? 12 : 14),
      base: scaleFont(smallDevice ? 14 : 16),
      md: scaleFont(smallDevice ? 16 : 18),
      lg: scaleFont(smallDevice ? 18 : 20),
      xl: scaleFont(smallDevice ? 22 : 24),
      xxl: scaleFont(smallDevice ? 26 : 30),
    };
  });

  useEffect(() => {
    const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
      const { width } = window;
      const smallDevice = width < 375;

      setFontSizes({
        xs: scaleFont(smallDevice ? 10 : 12),
        sm: scaleFont(smallDevice ? 12 : 14),
        base: scaleFont(smallDevice ? 14 : 16),
        md: scaleFont(smallDevice ? 16 : 18),
        lg: scaleFont(smallDevice ? 18 : 20),
        xl: scaleFont(smallDevice ? 22 : 24),
        xxl: scaleFont(smallDevice ? 26 : 30),
      });
    };

    const subscription = Dimensions.addEventListener(
      'change',
      handleDimensionChange
    );
    return () => subscription?.remove();
  }, []);

  return fontSizes;
};
