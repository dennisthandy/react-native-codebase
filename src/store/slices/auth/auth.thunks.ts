import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// Async thunks
export const loginUser = createAsyncThunk<
  unknown,
  { email: string; password: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    // In a real app, replace with actual API call
    // const response = await authApi.login(email, password);

    // For demo purposes, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful login
    const userData = {
      id: '123',
      email: payload.email,
      name: 'Demo User',
    };
    const token = 'demo-auth-token';
    // Store token in secure storage
    await SecureStore.setItemAsync('userToken', token);
    return { user: userData, token };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await SecureStore.getItemAsync('userToken');

      if (!token) {
        return { isAuthenticated: false };
      }

      // In a real app, validate token with the server
      // const user = await authApi.validateToken(token);

      // For demo purposes
      const user = { id: '123', name: 'Demo User', email: 'user@example.com' };

      return { isAuthenticated: true, user, token };
    } catch (error) {
      await SecureStore.deleteItemAsync('userToken');
      return rejectWithValue(error);
    }
  }
);
