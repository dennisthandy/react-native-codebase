// src/components/forms/FormInput.js
import { useThemeColor } from '@/src/hooks/useThemeColor';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';
import Text from '../../commons/Text';
import View from '../../commons/View';
import styles from './TextInput.styles';

type Props<T extends FieldValues> = TextInputProps &
  FieldProps &
  UseControllerProps<T>;

export const FormInput = <T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  lightColor,
  darkColor,
  ...rest
}: Props<T>) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[{ color }, styles.input, error && styles.errorInput]}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={color}
              {...rest}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
