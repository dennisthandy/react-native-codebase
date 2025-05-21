type FieldProps = Partial<{
  label: ReactNode;
  lightColor: string;
  darkColor: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  isLoading: boolean;
  leftLabel: string;
  rightLabel: string;
  mask: string;
  formatter: (value: string) => string;
  onClear: () => void;
}>;
