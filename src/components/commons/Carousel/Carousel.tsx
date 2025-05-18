import { colors } from '@/src/constants/colors.constants';
import { dimensions } from '@/src/utils/dimension.utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import CarouselArrows from './parts/CarouselArrows';
import CarouselIndicators from './parts/CarouselIndicators';

type Props<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  height?: number;
  showIndicators?: boolean;
  activeIndicatorColor?: string;
  inactiveIndicatorColor?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  showArrows?: boolean;
  initialIndex?: number;
};

export function Carousel<T>({
  data,
  renderItem,
  itemWidth = dimensions.width,
  height = 200,
  showIndicators = true,
  activeIndicatorColor = colors.primary.main,
  inactiveIndicatorColor = colors.gray[300],
  autoPlay = false,
  autoPlayInterval = 3000,
  loop = false,
  onSlideChange,
  style,
  showArrows = false,
  initialIndex = 0,
}: Props<T>) {
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayRef = useRef<boolean>(autoPlay);
  const autoPlayIntervalRef = useRef<number>(autoPlayInterval);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [containerWidth, setContainerWidth] = useState(itemWidth);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMounted, setIsMounted] = useState(false);

  // Calculate item dimensions
  const actualItemWidth = itemWidth || containerWidth;

  // Calculate total width of all slides
  useEffect(() => {
    setContentWidth(actualItemWidth * data.length);
  }, [actualItemWidth, data.length]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle scroll events
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  // Handle measurement of the container
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Handle end of scroll to snap to nearest slide
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isMounted) return;

    const position = event.nativeEvent.contentOffset.x;
    const slideWidth = actualItemWidth;

    // Calculate closest slide index
    let newIndex = Math.round(position / slideWidth);

    // Handle edge cases
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= data.length) newIndex = data.length - 1;

    // If the index has changed, update the state
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (onSlideChange) {
        onSlideChange(newIndex);
      }
    } else {
      // If the user didn't scroll enough to change index, snap back to the current slide
      scrollToIndex(currentIndex, true);
    }
  };

  // Scroll to specified index
  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      if (!scrollViewRef.current) return;
      if (!isMounted || !scrollViewRef.current) return;
      if (index < 0) {
        index = loop ? data.length - 1 : 0;
      } else if (index >= data.length) {
        index = loop ? 0 : data.length - 1;
      }
      scrollViewRef.current.scrollTo({
        x: index * actualItemWidth,
        y: 0,
        animated,
      });
      // Update current index immediately for better UX
      if (index !== currentIndex) {
        setCurrentIndex(index);
        if (onSlideChange) {
          onSlideChange(index);
        }
      }
    },
    [actualItemWidth, currentIndex, data.length, isMounted, loop, onSlideChange],
  );

  const goToPrevious = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  const goToNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const handleTouchStart = useCallback(() => {
    if (autoPlayRef.current) {
      setIsAutoPlaying(false);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (autoPlayRef.current) {
      setIsAutoPlaying(true);
    }
  }, []);

  useEffect(() => {
    autoPlayRef.current = autoPlay;
    autoPlayIntervalRef.current = autoPlayInterval;
  }, [autoPlay, autoPlayInterval]);

  useEffect(() => {
    // Store the interval ID for cleanup
    let intervalId: NodeJS.Timeout | null | number = null;

    // Function to handle auto-play ticks
    const runAutoPlay = () => {
      if (!autoPlayRef.current || !scrollViewRef.current) return;

      const nextIndex = currentIndex === data.length - 1 && !loop ? 0 : currentIndex + 1;
      scrollToIndex(nextIndex);
    };

    // Setup and clear the interval on changes
    if (autoPlayRef.current && isMounted) {
      intervalId = setInterval(runAutoPlay, autoPlayIntervalRef.current);
    }

    // Cleanup interval on unmount or dependencies change
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentIndex, data.length, loop, scrollToIndex, isMounted]);

  return (
    <View style={[styles.container, { height }, style]} onLayout={handleLayout}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        contentContainerStyle={{ width: contentWidth }}
        decelerationRate="fast"
        bounces={false}
        snapToInterval={actualItemWidth}
        snapToAlignment="start"
        contentOffset={{ x: initialIndex * actualItemWidth, y: 0 }}
      >
        {data.map((item, index) => (
          <View key={`carousel-item-${index}`} style={{ width: actualItemWidth }}>
            {renderItem(item, index)}
          </View>
        ))}
      </Animated.ScrollView>

      {showIndicators && (
        <CarouselIndicators
          color={{ active: activeIndicatorColor, inactive: inactiveIndicatorColor }}
          currentIndex={currentIndex}
          data={data}
          scrollToIndex={scrollToIndex}
        />
      )}
      {showArrows && (
        <CarouselArrows
          disabled={{ previous: currentIndex <= 0, next: currentIndex === data.length - 1 }}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
});
