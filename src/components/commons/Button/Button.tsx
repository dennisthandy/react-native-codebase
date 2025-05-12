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
  ...props
}) => {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'background');
  const outlineColor = variants === 'outline' ? backgroundColor : color;
  const textColor =
    variants === 'text' ? colors.primary[theme as keyof typeof colors.primary] : outlineColor;

  const content =
    typeof children === 'string' ? (
      <Text {...textProps} darkColor={textColor} lightColor={textColor}>
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor, borderColor: variants === 'outline' ? backgroundColor : '' },
        styles[variants as keyof typeof styles],
        style,
      ]}
      disabled={isLoading || disabled}
    >
      {isLoading ? <ActivityIndicator color={color} /> : content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  text: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    height: 44,
    minWidth: 44,
    width: 44,
  },
});
