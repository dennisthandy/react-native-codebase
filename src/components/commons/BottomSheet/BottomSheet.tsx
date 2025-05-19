import { Portal } from '@/src/contexts/PortalContext/PortalContext';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { generateUniqeId } from '@/src/utils/common.utils';
import { dimensions } from '@/src/utils/dimension.utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import View from '../View';

type Props = ViewProps & {
  visible: boolean;
  onClose: () => void;
  snapPoints?: number[];
  initialSnapIndex?: number;
  enableBackdropDismiss?: boolean;
  backdropOpacity?: number;
  handleIndicatorStyle?: StyleProp<ViewProps>;
  contentContainerStyle?: StyleProp<ViewProps>;
  animationDuration?: number;
};

export const BottomSheet = ({
  visible,
  onClose,
  children,
  style,
  snapPoints = [0.5], // Array of values between 0-1 representing percentage of screen height
  initialSnapIndex = 0,
  enableBackdropDismiss = true,
  backdropOpacity = 0.5,
  handleIndicatorStyle = {},
  contentContainerStyle = {},
  animationDuration = 300,
  ...props
}: Props) => {
  const color = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const translateY = useRef(new Animated.Value(dimensions.height)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  const [sheetHeight, setSheetHeight] = useState(0);
  const [isAtTop, setIsAtTop] = useState(false);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);

  // Calculate absolute snap points based on percentages
  const absoluteSnapPoints = snapPoints.map(point =>
    typeof point === 'number' ? dimensions.height * (1 - point) : point,
  );

  // Pan responder to handle dragging of bottom sheet
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        // Only move if dragging down or if at top and dragging up
        if (dy > 0 || (isAtTop && dy < 0)) {
          translateY.setValue(absoluteSnapPoints[currentSnapIndex] + dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;

        // Determine which snap point to go to based on velocity and position
        let nextSnapIndex = currentSnapIndex;

        // If dragging down with enough velocity or distance, go to next lower snap point
        if (dy > 50 || vy > 0.5) {
          nextSnapIndex = Math.min(absoluteSnapPoints.length - 1, currentSnapIndex + 1);
        }
        // If dragging up with enough velocity or distance, go to next higher snap point
        else if (dy < -50 || vy < -0.5) {
          nextSnapIndex = Math.max(0, currentSnapIndex - 1);
        }

        // If next snap point is beyond the end, close the sheet
        if (nextSnapIndex >= absoluteSnapPoints.length) {
          closeSheet();
        } else {
          snapToIndex(nextSnapIndex);
        }
      },
    }),
  ).current;

  // Function to snap to a specific index
  const snapToIndex = (index: number) => {
    if (index >= absoluteSnapPoints.length) {
      closeSheet();
      return;
    }

    setCurrentSnapIndex(index);
    Animated.spring(translateY, {
      toValue: absoluteSnapPoints[index],
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  // Open the sheet when visible changes to true
  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();

      // Start with the sheet fully down
      translateY.setValue(dimensions.height);

      // Then animate up to initial snap point
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: backdropOpacity,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: absoluteSnapPoints[initialSnapIndex],
          useNativeDriver: true,
          bounciness: 4,
        }),
      ]).start();

      setCurrentSnapIndex(initialSnapIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Close the sheet
  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(backdropOpacityAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: dimensions.height,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // Handle scroll events to determine if at top or not
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y <= 0);
  };

  if (!visible) return null;

  return (
    <Portal id={generateUniqeId('bottom-sheet')}>
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={enableBackdropDismiss ? closeSheet : undefined}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacityAnim }]} />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet */}
        <Animated.View
          {...props}
          style={[
            styles.sheetContainer,
            { backgroundColor },
            style,
            {
              transform: [{ translateY }],
              maxHeight: dimensions.height * 0.9, // Limit max height to 90% of screen
              minHeight: 100, // Minimum height for the sheet
            },
          ]}
          onLayout={e => setSheetHeight(e.nativeEvent.layout.height)}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
            <View style={[styles.dragHandle, handleIndicatorStyle]} />
          </View>

          {/* Content */}
          <Animated.ScrollView
            style={[styles.contentContainer, { height: sheetHeight }, contentContainerStyle]}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </Animated.ScrollView>
        </Animated.View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  dragHandleContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#D3D3D3',
    borderRadius: 3,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20, // Add extra padding for iOS
  },
});
