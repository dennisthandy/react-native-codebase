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
  sheetHeight?: number | string; // Height of the sheet (can be number or percentage string)
  enableBackdropDismiss?: boolean;
  backdropOpacity?: number;
  handleIndicatorStyle?: StyleProp<ViewProps>;
  contentContainerStyle?: StyleProp<ViewProps>;
  animationDuration?: number;
};

const calculateSheetPosition = (sheetHeight?: number | string) => {
  if (typeof sheetHeight === 'string' && sheetHeight.endsWith('%')) {
    const percentage = parseFloat(sheetHeight) / 100;
    return dimensions.height * (1 - percentage);
  }
  return dimensions.height - Number(sheetHeight);
};

export const BottomSheet = ({
  visible,
  onClose,
  children,
  style,
  sheetHeight = '50%', // Default to 50% of screen height
  enableBackdropDismiss = true,
  backdropOpacity = 0.5,
  handleIndicatorStyle = {},
  contentContainerStyle = {},
  animationDuration = 300,
  ...props
}: Props) => {
  const backgroundColor = useThemeColor({}, 'background');
  const translateY = useRef(new Animated.Value(dimensions.height)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [isAtTop, setIsAtTop] = useState(false);

  const sheetPosition = calculateSheetPosition(sheetHeight);

  // Pan responder to handle dragging of bottom sheet
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        // Only allow dragging down or if at top and dragging up
        if (dy > 0 || (isAtTop && dy < 0)) {
          translateY.setValue(sheetPosition + dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;

        // Close if dragged down more than threshold or with significant velocity
        if (dy > 100 || vy > 0.5) {
          closeSheet();
        } else {
          // Snap back to open position
          Animated.spring(translateY, {
            toValue: sheetPosition,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      translateY.setValue(dimensions.height);
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: backdropOpacity,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: sheetPosition,
          useNativeDriver: true,
          bounciness: 4,
        }),
      ]).start();
    }
  }, [visible, sheetPosition, backdropOpacity, animationDuration, translateY, backdropOpacityAnim]);

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
    ]).start(onClose);
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
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacityAnim, backgroundColor: 'rgba(0,0,0,0.5)' },
            ]}
          />
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
              minHeight: 100,
            },
          ]}
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
            <View style={[styles.dragHandle, handleIndicatorStyle]} />
          </View>

          {/* Content */}
          <Animated.ScrollView
            style={[styles.contentContainer, { height: contentHeight }, contentContainerStyle]}
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
