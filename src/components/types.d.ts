type ComponentProps = Partial<{
  isLoading: boolean;
  lightColor: string;
  darkColor: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
}>;

type ButtonVariant = 'fill' | 'outline' | 'text' | 'icon';
