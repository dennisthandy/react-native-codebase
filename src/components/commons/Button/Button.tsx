import { colors } from '@/src/constants/colors.constants';
import { TextVariant } from '@/src/constants/typography.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  View,
} from 'react-native';
import Text from '../Text';

type Props = TouchableOpacityProps &
  ComponentProps & { textProps?: TextProps & { variants?: TextVariant }; variants?: ButtonVariant };

export const Button: FC<Props> = ({
  style,
  isLoading,
  disabled,
  children,
  textProps,
  variants = 'fill',
  leftIcon,
  rightIcon,
  loadingPosition = 'center',
  ...props
}) => {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'background');
  const outlineColor = variants === 'outlined' ? backgroundColor : color;
  const textColor =
    variants === 'text' ? colors.primary[theme as keyof typeof colors.primary] : outlineColor;

  const content =
    typeof children === 'string' ? (
      <Text {...textProps} variant="button" darkColor={textColor} lightColor={textColor}>
        {children}
      </Text>
    ) : (
      children
    );

  const isDisabled = isLoading || disabled;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor, borderColor: variants === 'outlined' ? backgroundColor : '' },
        styles[variants as keyof typeof styles],
        style,
        { opacity: isDisabled ? 0.75 : 1 },
      ]}
      disabled={isDisabled}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLoading && loadingPosition === 'left' && (
          <ActivityIndicator style={{ marginRight: 6 }} color={textColor} />
        )}
        {leftIcon && !isLoading && <View style={{ marginRight: 6 }}>{leftIcon}</View>}
        {isLoading && loadingPosition === 'center' ? (
          <ActivityIndicator color={textColor} />
        ) : (
          content
        )}
        {rightIcon && !isLoading && <View style={{ marginLeft: 6 }}>{rightIcon}</View>}
        {isLoading && loadingPosition === 'right' && (
          <ActivityIndicator style={{ marginLeft: 6 }} color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 11,
  },
  text: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    height: 'auto',
  },
  icon: {
    padding: 0,
    borderRadius: 8,
    minHeight: 44,
    minWidth: 44,
    width: 44,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
