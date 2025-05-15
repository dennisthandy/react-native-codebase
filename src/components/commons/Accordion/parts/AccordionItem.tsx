import { useThemeColor } from '@/src/hooks/useThemeColor';
import { useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Text from '../../Text';
import View from '../../View';

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
  const rotateAnimation = useRef(new Animated.Value(0)).current;

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
      duration: 300,
      useNativeDriver: true,
    }).start();

    setExpanded(newExpanded);
    if (onPress) onPress();
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyles = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View {...props} style={[styles.container, { borderColor: color }, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleAccordion}
        style={[styles.header, { backgroundColor }, headerStyle]}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Animated.Text style={[{ color }, iconStyle, animatedStyles]}>▼</Animated.Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.contentContainer}>
          {typeof content === 'string' ? (
            <Text variant="bodySmall" style={[contentStyle]}>
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      )}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 8,
  },
});
