import { defaultState } from '@/src/constants/state.constants';
import { USER_DATA, USER_TOKEN } from '@/src/constants/storage.constants';
import { clearAllStorage, getStorage, removeStorage, setStorage } from '@/src/utils/storage.utils';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const loginUser = createAsyncThunk<ApiResponse<User>, { email: string; password: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const token = 'demo-auth-token';
      await setStorage(USER_TOKEN, token);

      return {
        ...defaultState,
        isSuccess: true,
        code: 200,
        data: {
          id: 'demo-id',
          name: 'Demo User',
          email: payload.email,
          bio: 'demo bio',
          location: 'demo location',
          phone: '082312321212',
          profileImage: 'string',
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk<ApiResponse<unknown>, unknown>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await clearAllStorage();
      return { ...defaultState, isSuccess: true, code: 200 };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkAuthStatus = createAsyncThunk<ApiResponse<{ isAuthenticated: boolean }>, unknown>(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getStorage<string>(USER_TOKEN);

      if (!token) {
        return {
          ...defaultState,
          code: 401,
          error: true,
          message: 'token expired',
          data: { isAuthenticated: false },
        };
      }

      return { ...defaultState, code: 200, isSuccess: true, data: { isAuthenticated: true } };
    } catch (error) {
      await removeStorage(USER_DATA);
      return rejectWithValue(error);
    }
  },
);
