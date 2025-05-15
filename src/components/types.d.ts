type ComponentProps = Partial<{
  isLoading: boolean;
  lightColor: string;
  darkColor: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  loadingPosition: 'center' | 'left' | 'right';
}>;

type ButtonVariant = 'fill' | 'outline' | 'text' | 'icon';

type MansoryItem = {
  id: string;
  title: string;
  image: string;
  height: number;
  color: string;
  index?: number;
};
