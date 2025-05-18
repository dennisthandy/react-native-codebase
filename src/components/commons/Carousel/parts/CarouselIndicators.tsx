import { StyleSheet, TouchableOpacity } from 'react-native';
import View from '../../View';

type Props<T> = {
  data: T[];

  currentIndex: number;
  color: { active: string; inactive: string };
  scrollToIndex: (index: number, animated?: boolean) => void;
};

export default function CarouselIndicator<T>({
  data,
  color,
  scrollToIndex,
  currentIndex,
}: Props<T>) {
  return (
    <View style={styles.container}>
      {data.map((_, index) => (
        <TouchableOpacity
          key={`indicator-${index}`}
          style={[
            styles.indicator,
            {
              backgroundColor: index === currentIndex ? color.active : color.inactive,
              width: index === currentIndex ? 20 : 10,
            },
          ]}
          onPress={() => scrollToIndex(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
