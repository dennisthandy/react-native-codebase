// app/(auth)/login.js
import Text from '@/src/components/commons/Text';
import View from '@/src/components/commons/View';
import { FormInput } from '@/src/components/forms/TextInput/TextInput';
import { useScreenOptions } from '@/src/hooks/useHeaderOptions';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useStore';
import { clearAuth } from '@/src/store/slices/auth/auth.slice';
import { loginUser } from '@/src/store/slices/auth/auth.thunks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Href, router } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const defaultValues = {
  email: '',
  password: '',
};

export default function Login() {
  useScreenOptions({ title: 'Sign In' });
  const dispatch = useAppDispatch();
  const {
    login: { isSuccess, isLoading, isError, message, data },
  } = useAppSelector((state) => state.auth);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  useEffect(() => {
    // Redirect if already authenticated
    if (isSuccess) {
      router.replace('/(app)' as Href);
    }

    // Clear errors when component mounts
    dispatch(clearAuth({ key: 'login' }));
  }, [isSuccess]);

  const onSubmit = async (data: typeof defaultValues) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {isError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{message}</Text>
        </View>
      )}

      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push('/(auth)/forgot-password' as Href)}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&apos;t have an account? </Text>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/register' as Href)}
        >
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  footerText: {
    color: '#666',
  },
});
