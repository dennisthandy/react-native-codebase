import React from 'react';
import {
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import CardContent from './parts/CardContent';

export type CardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  shadowIntensity?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: CardVariant;
  title?: string;
  subtitle?: string;
  imageSource?: string | { uri: string };
  imageHeight?: number;
  footer?: React.ReactNode;
};

type Props = CardProps & {
  onPress?: () => void;
};

export const Card: React.FC<Props> = ({ onPress, ...props }) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={{ borderRadius: 8 }} activeOpacity={0.75}>
        <CardContent {...props} />
      </TouchableOpacity>
    );
  }

  return <CardContent {...props} />;
};
