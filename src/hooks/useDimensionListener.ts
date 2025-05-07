import { useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

// Listen for dimension changes (e.g., rotation)
export const useDimensionsListener = (
  callback: ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => void
) => {
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, [callback]);
};
