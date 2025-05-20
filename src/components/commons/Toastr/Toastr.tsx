import { colors } from '@/src/constants/colors.constants';
import { Portal } from '@/src/contexts/PortalContext/PortalContext';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { generateUniqeId } from '@/src/utils/common.utils';
import { dimensions } from '@/src/utils/dimension.utils';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import getTypeStyles from './parts/getTypeStyles';

type ToastTypeArgs = { message: string; options?: Partial<Toast> };

export const ToastManager = (() => {
  let toasts: Toast[] = [];
  let setToastsFunction: Function | null = null;

  const registerSetToasts = (setToasts: Function | null) => {
    setToastsFunction = setToasts;
  };

  const showToast = (toast: Toast) => {
    console.log('ToastManager', toast);
    const id = generateUniqeId('toast');
    const newToast = {
      id,
      message: toast.message || '',
      type: toast.type || 'default',
      duration: toast.duration || 2000,
      position: toast.position || 'bottom',
      onPress: toast.onPress,
      actionText: toast.actionText,
      animationDuration: toast.animationDuration || 300,
    };

    toasts = [...toasts, newToast];

    if (setToastsFunction) {
      setToastsFunction([...toasts]);
    }

    // Auto dismiss
    if (newToast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const dismissToast = (id?: string) => {
    toasts = toasts.filter(toast => toast.id !== id);

    if (setToastsFunction) {
      setToastsFunction([...toasts]);
    }
  };

  return {
    registerSetToasts,
    showToast,
    dismissToast,
    // Helper functions for different types of toasts
    success: ({ message, options }: ToastTypeArgs) =>
      showToast({ ...options, message, type: 'success' }),
    error: ({ message, options }: ToastTypeArgs) =>
      showToast({ ...options, message, type: 'error' }),
    info: ({ message, options }: ToastTypeArgs) => showToast({ ...options, message, type: 'info' }),
    warning: ({ message, options }: ToastTypeArgs) =>
      showToast({ ...options, message, type: 'warning' }),
  };
})();

type Props = ViewProps & Toast;

const Toast: FC<Props> = ({
  id,
  message,
  type = 'default',
  position = 'bottom',
  onPress,
  actionText,
  animationDuration = 300,
  style,
  ...props
}) => {
  const color = useThemeColor({}, 'text');
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dismissToast = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      ToastManager.dismissToast(id);
    });
  };

  const handlePress = () => {
    if (onPress) onPress();
    if (actionText) dismissToast();
  };

  const typeStyle = getTypeStyles(type);

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topContainer : styles.bottomContainer,
        {
          backgroundColor: typeStyle.backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.contentContainer, style]}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Ionicons
          name={typeStyle.iconName as (typeof Ionicons.defaultProps)['name']}
          color={color}
          size={16}
        />
        <Text variant="bodySmall" style={styles.message}>
          {message}
        </Text>
        {actionText ? (
          <Text variant="bodySmall" style={styles.actionText}>
            {actionText}
          </Text>
        ) : (
          <Button
            variants="icon"
            style={{ backgroundColor: 'transparent', marginRight: -16 }}
            onPress={dismissToast}
          >
            <Ionicons name="close-circle" color={color} size={24} />
          </Button>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  console.log('ToastContainer', toasts);

  useEffect(() => {
    ToastManager.registerSetToasts(setToasts);
    return () => ToastManager.registerSetToasts(null);
  }, []);

  return toasts.map(toast => (
    <Portal key={toast.id} id={toast.id || ''}>
      <Toast {...toast} />
    </Portal>
  ));
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    maxWidth: dimensions.width * 0.9,
    width: dimensions.width * 0.9,
    borderRadius: 8,
    margin: 16,
  },
  topContainer: {
    position: 'absolute',
    top: 32,
    alignSelf: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    flex: 1,
    marginLeft: 4,
  },
  actionText: {
    color: colors.primary.main,
    marginLeft: 16,
  },
});

export { Toast, ToastContainer };
