import { colors } from '@/src/constants/colors.constants';
import React, { FC } from 'react';
import { StyleSheet, TextProps, View, ViewProps } from 'react-native';
import Text from '../Text';

type Props = ViewProps & {
  value: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  variant?: 'filled' | 'outlined';
  size?: 'medium' | 'small' | 'large';
  visible?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  textStyle?: TextProps['style'];
};

// Color schemes based on type
const colorSchemes = {
  primary: {
    filled: { background: colors.primary.main, text: '#FFFFFF', border: colors.primary.main },
    outlined: { background: 'transparent', text: colors.primary.main, border: colors.primary.main },
  },
  success: {
    filled: { background: '#28A745', text: '#FFFFFF', border: '#28A745' },
    outlined: { background: 'transparent', text: '#28A745', border: '#28A745' },
  },
  warning: {
    filled: { background: '#FFC107', text: '#212529', border: '#FFC107' },
    outlined: { background: 'transparent', text: '#FFC107', border: '#FFC107' },
  },
  danger: {
    filled: { background: '#DC3545', text: '#FFFFFF', border: '#DC3545' },
    outlined: { background: 'transparent', text: '#DC3545', border: '#DC3545' },
  },
  info: {
    filled: { background: '#17A2B8', text: '#FFFFFF', border: '#17A2B8' },
    outlined: { background: 'transparent', text: '#17A2B8', border: '#17A2B8' },
  },
  neutral: {
    filled: { background: '#6C757D', text: '#FFFFFF', border: '#6C757D' },
    outlined: { background: 'transparent', text: '#6C757D', border: '#6C757D' },
  },
};

// Size configurations
const sizeConfigs = {
  small: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    fontSize: 10,
    borderRadius: 8,
  },
  medium: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    fontSize: 12,
    borderRadius: 10,
  },
  large: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 12,
  },
};

export const Badge: FC<Props> = ({
  value,
  type = 'primary',
  variant = 'filled',
  size = 'medium',
  visible = true,
  position = null,
  textStyle,
  style,
  ...props
}) => {
  if (!visible) {
    return null;
  }

  // Position styles
  const getPositionStyle = () => {
    if (!position) return {};

    const positionStyles = {
      'top-right': { position: 'absolute', top: -8, right: -8 },
      'top-left': { position: 'absolute', top: -8, left: -8 },
      'bottom-right': { position: 'absolute', bottom: -8, right: -8 },
      'bottom-left': { position: 'absolute', bottom: -8, left: -8 },
    };

    return positionStyles[position] || {};
  };

  // Get color scheme
  const colorScheme = colorSchemes[type]?.[variant] || colorSchemes.primary[variant];
  const sizeConfig = sizeConfigs[size] || sizeConfigs.medium;

  // Special case for dot style (when value is empty)
  const isDot = value === '' || value === null || value === undefined;

  return (
    <View
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.background,
          borderColor: colorScheme.border,
          borderWidth: variant === 'outlined' ? 1 : 0,
          minWidth: isDot ? sizeConfig.height : sizeConfig.minWidth,
          height: sizeConfig.height,
          borderRadius: sizeConfig.borderRadius,
          paddingHorizontal: isDot ? 0 : sizeConfig.paddingHorizontal,
        },
        getPositionStyle(),
        style,
      ]}
    >
      {!isDot && (
        <Text
          style={[
            styles.text,
            {
              color: colorScheme.text,
              fontSize: sizeConfig.fontSize,
            },
            textStyle,
          ]}
          numberOfLines={1}
          variant="bodyBold"
        >
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  text: {
    textAlign: 'center',
  },
});
