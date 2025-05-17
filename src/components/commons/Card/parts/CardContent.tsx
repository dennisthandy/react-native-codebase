import { colors } from '@/src/constants/colors.constants';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Text from '../../Text';
import View from '../../View';
import getShadowStyle from './getShadowStyle';

type Props = ViewProps & {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  imageSource?: string | { uri: string };
  imageHeight?: number;
  footer?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  shadowIntensity?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: CardVariant;
};

export default function CardContent({
  style,
  imageHeight,
  imageSource,
  imageStyle,
  contentStyle,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  footer,
  footerStyle,
  children,
  shadowIntensity = 1,
  variant = 'default',
  ...props
}: Props) {
  const shadowStyle = getShadowStyle(shadowIntensity);
  const color = useThemeColor({}, 'text');
  return (
    <View
      {...props}
      style={[
        styles.container,
        shadowStyle,
        { borderColor: color, borderWidth: variant === 'outlined' ? 1 : 0 },
        style,
      ]}
    >
      {/* Image */}
      {imageSource && (
        <Image
          source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
          style={[styles.image, { height: imageHeight }, imageStyle]}
          resizeMode="cover"
        />
      )}

      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text variant="h4" style={[{ marginBottom: 4 }, titleStyle]}>
              {title}
            </Text>
          )}
          {subtitle && <Text style={[{ opacity: 0.75 }, subtitleStyle]}>{subtitle}</Text>}
        </View>
      )}

      {/* Content */}
      <View style={[styles.content, contentStyle]}>{children}</View>

      {/* Footer */}
      {footer && <View style={[styles.footer, footerStyle]}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  image: {
    width: '100%',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 4,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  footer: {
    padding: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray[300],
  },
});
