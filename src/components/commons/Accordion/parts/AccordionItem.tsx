import { useThemeColor } from '@/src/hooks/useThemeColor';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Text from '../../Text';

type Props = ViewProps & {
  title: string;
  content: string | React.ReactNode;
  isExpanded?: boolean;
  onPress?: () => void;
  titleStyle?: TextStyle;
  headerStyle?: ViewStyle;
  iconStyle?: TextStyle;
  contentStyle?: TextStyle;
};

// Single Accordion Item Component
const AccordionItem: React.FC<Props> = ({
  title,
  content,
  isExpanded = false,
  onPress,
  titleStyle,
  style,
  contentStyle,
  headerStyle,
  iconStyle,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  const [expanded, setExpanded] = useState(isExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentMeasured, setContentMeasured] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const contentRef = useRef<View>(null);
  const hiddenContentRef = useRef<View>(null);

  // Measure the content in a hidden view first to get accurate height
  useEffect(() => {
    if (hiddenContentRef.current && !contentMeasured) {
      // Use a timeout to ensure the hidden content has been rendered
      setTimeout(() => {
        hiddenContentRef.current?.measure((x, y, width, height) => {
          if (height > 0) {
            setContentHeight(height);
            setContentMeasured(true);
          }
        });
      }, 100);
    }
  }, [contentMeasured]);

  const toggleAccordion = () => {
    const newExpanded = !expanded;

    // Custom layout animation
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });

    // Rotate icon animation
    Animated.timing(rotateAnimation, {
      toValue: newExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Height animation
    Animated.timing(heightAnimation, {
      toValue: newExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();

    setExpanded(newExpanded);
    if (onPress) onPress();
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = heightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const animatedIconStyles = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const animatedContentStyles = {
    height: heightInterpolate,
    opacity: heightAnimation,
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && !contentHeight) {
      setContentHeight(height);
      setContentMeasured(true);
    }
  };

  return (
    <View
      {...props}
      accessibilityRole="button"
      accessibilityState={{ expanded: expanded }}
      accessibilityHint="Toggle to expand or collapse this section"
      style={[styles.container, { borderColor: color }, style]}
    >
      {/* Hidden View to measure content */}
      <View ref={hiddenContentRef} style={styles.hiddenContent} pointerEvents="none">
        <View style={styles.contentContainer}>
          {typeof content === 'string' ? (
            <Text variant="bodySmall" style={contentStyle}>
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleAccordion}
        style={[styles.header, { backgroundColor }, headerStyle]}
      >
        <Text style={titleStyle}>{title}</Text>
        <Animated.Text style={[{ color }, iconStyle, animatedIconStyles]}>▼</Animated.Text>
      </TouchableOpacity>

      <Animated.View style={[{ overflow: 'hidden' }, animatedContentStyles]}>
        <View ref={contentRef} style={styles.contentContainer} onLayout={handleContentLayout}>
          {typeof content === 'string' ? (
            <Text variant="bodySmall" style={[contentStyle]}>
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 8,
  },
  hiddenContent: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
});
