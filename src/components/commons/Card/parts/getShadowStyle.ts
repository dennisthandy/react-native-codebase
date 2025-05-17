import { colors } from '@/src/constants/colors.constants';

const getShadowStyle = (intensity: number) => {
  if (intensity === 0) return {};
  return {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: intensity,
    },
    shadowOpacity: 0.1 + intensity * 0.05,
    shadowRadius: intensity * 2,
    elevation: intensity * 2,
  };
};

export default getShadowStyle;
