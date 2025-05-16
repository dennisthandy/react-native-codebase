import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo; if not, use a different icon library
import React, { ReactNode, useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Text from '../Text';
import View from '../View';

type Props = ViewProps & {
  message: string;
  description?: string;
  variant?: AlertVariant;
  closeable?: boolean;
  onClose?: () => void;
  autoCloseDuration?: number;
  icon?: ReactNode;
};

export const Alert: React.FC<Props> = ({
  message,
  description,
  variant = 'default',
  closeable = true,
  onClose,
  autoCloseDuration,
  style,
  icon,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const { iconName, backgroundColor, borderColor, textColor } = useGetVariantStyles(variant);

  // Handle automatic closing if autoCloseDuration is provided
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null | number = null;

    if (autoCloseDuration && visible) {
      timeoutId = setTimeout(() => {
        handleClose();
      }, autoCloseDuration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [autoCloseDuration, visible]);

  // Handle closing animation and callbacks
  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onClose) onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      {...props}
      style={[styles.container, { backgroundColor, borderColor, opacity: fadeAnim }, style]}
    >
      <View style={[styles.contentContainer, { backgroundColor }]}>
        <View style={{ backgroundColor, marginRight: 4 }}>
          {icon || (
            <Ionicons
              name={iconName as (typeof Ionicons.defaultProps)['name']}
              size={24}
              color={textColor}
            />
          )}
        </View>

        <View style={{ flex: 1, backgroundColor }}>
          <Text style={{ color: textColor }}>{message}</Text>
          {description && (
            <Text variant="bodySmall" style={[styles.description, { color: textColor }]}>
              {description}
            </Text>
          )}
        </View>
      </View>

      {closeable && (
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={textColor} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

// Helper function to get styling based on variant
const useGetVariantStyles = (
  variant: AlertVariant,
): {
  iconName: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
} => {
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');
  switch (variant) {
    case 'success':
      return {
        iconName: 'checkmark-circle',
        backgroundColor: colors.support.success[200],
        borderColor: colors.support.success[400],
        textColor: colors.support.success[800],
      };
    case 'warning':
      return {
        iconName: 'warning',
        backgroundColor: colors.support.warning[200],
        borderColor: colors.support.warning[400],
        textColor: colors.support.warning[800],
      };
    case 'error':
      return {
        iconName: 'alert-circle',
        backgroundColor: colors.support.error[200],
        borderColor: colors.support.error[400],
        textColor: colors.support.error[800],
      };
    case 'info':
      return {
        iconName: 'information-circle',
        backgroundColor: colors.support.info[200],
        borderColor: colors.support.info[400],
        textColor: colors.support.info[800],
      };
    default:
      return {
        iconName: 'information-circle',
        backgroundColor,
        borderColor: color,
        textColor: color,
      };
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    marginTop: 4,
  },
  closeButton: {
    marginLeft: 4,
  },
});
