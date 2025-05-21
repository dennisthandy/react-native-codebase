// src/components/forms/FormInput.js
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import Button from '../../commons/Button';
import Text from '../../commons/Text';
import View from '../../commons/View';
import styles from '../forms.styles';

type Props<T extends FieldValues> = TextInputProps & FieldProps & UseControllerProps<T>;

export const TextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  label,
  lightColor,
  darkColor,
  leftIcon,
  rightIcon,
  rightLabel,
  leftLabel,
  editable = true,
  multiline = false,
  formatter,
  ...rest
}: Props<T>) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const [inputWidth, setInputWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState({ left: 0, right: 0 });
  const [showTextEntry, setShowTextEntry] = useState(secureTextEntry);

  const maxWidth = (() => {
    if (rightLabel && leftLabel) return inputWidth / 2 + (labelWidth.left + labelWidth.right) / 3.2;
    if (rightLabel) {
      return labelWidth.right < 100 ? 'auto' : inputWidth / 1.9 + labelWidth.right - 8;
    }
    if (leftLabel) {
      return labelWidth.right < 100 ? 'auto' : inputWidth / 1.9 + labelWidth.left - 16;
    }
    return inputWidth;
  })();

  const defineValue = useCallback(
    (value: string) => (formatter ? formatter(value) : value),
    [formatter],
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
          return (
            <View>
              <View
                direction="row"
                style={[styles.inputContainer, !editable ? styles.disabled : {}]}
              >
                {leftLabel && (
                  <Text
                    onLayout={event =>
                      setLabelWidth({ ...labelWidth, left: event.nativeEvent.layout.width })
                    }
                    variant="bodySmall"
                    style={[styles.leftLabel, { backgroundColor: color, color: backgroundColor }]}
                  >
                    {leftLabel}
                  </Text>
                )}
                {leftIcon && <View style={{ marginRight: 2 }}>{leftIcon}</View>}
                <RNTextInput
                  multiline={multiline}
                  onLayout={event => setInputWidth(event.nativeEvent.layout.width)}
                  value={value}
                  onChangeText={val => onChange(defineValue(val))}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  style={[
                    styles.input,
                    {
                      color,
                      maxWidth: rightLabel || leftLabel ? maxWidth : 'auto',
                      width: rightIcon ? '86%' : '100%',
                      height: multiline ? 100 : 'auto',
                      textAlignVertical: multiline ? 'top' : 'center',
                    },
                  ]}
                  secureTextEntry={showTextEntry}
                  placeholderTextColor={color}
                  {...rest}
                />
                {secureTextEntry && value && (
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      right: 20,
                      top: 1.5,
                    }}
                    onPress={() => setShowTextEntry(!showTextEntry)}
                  >
                    <Ionicons name={showTextEntry ? 'eye' : 'eye-off'} color={color} size={16} />
                  </Button>
                )}
                {rightIcon && !secureTextEntry && (
                  <View style={{ position: 'absolute', right: 8, backgroundColor: 'transparent' }}>
                    {rightIcon}
                  </View>
                )}
                {rightLabel && (
                  <Text
                    onLayout={event =>
                      setLabelWidth({ ...labelWidth, right: event.nativeEvent.layout.width })
                    }
                    variant="bodySmall"
                    style={[styles.rightLabel, { backgroundColor: color, color: backgroundColor }]}
                  >
                    {rightLabel}
                  </Text>
                )}
                {value && (
                  <Button
                    variants="icon"
                    style={[
                      {
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        right: rightLabel ? labelWidth.right - 8 : rightIcon ? 16 : 0,
                      },
                    ]}
                    onPress={() => {
                      onChange('');
                      if (secureTextEntry) setShowTextEntry(true);
                    }}
                  >
                    <Ionicons name="close-circle" color={color} size={16} />
                  </Button>
                )}
              </View>
              {error && editable && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {error.message}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};
