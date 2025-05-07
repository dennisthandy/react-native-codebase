// src/components/forms/FormInput.js
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
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
  ...rest
}: Props<T>) => {
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
              style={[styles.input, error && styles.errorInput]}
              secureTextEntry={secureTextEntry}
              {...rest}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
