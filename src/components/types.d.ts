type ComponentProps = Partial<{
  isLoading: boolean;
  lightColor: string;
  darkColor: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  loadingPosition: 'center' | 'left' | 'right';
}>;

type ButtonVariant = 'fill' | 'outlined' | 'text' | 'icon';

type MansoryItem = {
  id: string;
  title: string;
  image: string;
  height: number;
  color: string;
  index?: number;
};

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'default';

type CardVariant = 'default' | 'outlined';

type Toast = {
  id?: string;
  message: string;
  type?: 'default' | 'success' | 'info' | 'warning' | 'error';
  position?: 'bottom' | 'top';
  onPress?: () => void;
  actionText?: string;
  animationDuration?: number;
  duration?: number;
};
