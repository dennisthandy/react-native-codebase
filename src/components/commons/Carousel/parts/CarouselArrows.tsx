import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, useColorScheme } from 'react-native';
import Button from '../../Button';

type Props = {
  goToPrevious: () => void;
  goToNext: () => void;
  disabled: { previous: boolean; next: boolean };
};

export default function CarouselArrows({ goToNext, goToPrevious, disabled }: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const theme = useColorScheme();
  return (
    <>
      <Button
        disabled={disabled.previous}
        variants="icon"
        style={[styles.arrowButton, { backgroundColor: `${backgroundColor}75` }, styles.leftArrow]}
        onPress={goToPrevious}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={colors.primary[theme === 'dark' ? 'light' : 'dark']}
        />
      </Button>

      <Button
        disabled={disabled.next}
        style={[styles.arrowButton, { backgroundColor: `${backgroundColor}75` }, styles.rightArrow]}
        onPress={goToNext}
        variants="icon"
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={colors.primary[theme === 'dark' ? 'light' : 'dark']}
        />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 100,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  arrow: {
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.gray[800],
  },
  arrowLeft: {
    transform: [{ rotate: '-45deg' }],
    marginLeft: 5,
  },
  arrowRight: {
    transform: [{ rotate: '135deg' }],
    marginRight: 5,
  },
});
