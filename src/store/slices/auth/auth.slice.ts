// src/store/slices/authSlice.js
import { defaultState } from '@/src/constants/state.constants';
import { clearState, extraReducersBuilder } from '@/src/utils/store.utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as thunks from './auth.thunks';

type AuthState = {
  login: ApiResponse<LoginResponse | null>;
  logout: ApiResponse<unknown>;
};

const initialState: AuthState = {
  login: defaultState,
  logout: defaultState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (
      state,
      action: PayloadAction<ClearState<keyof typeof state>>
    ) => {
      clearState(state, action);
    },
  },
  extraReducers: (builder) => {
    extraReducersBuilder({
      builder,
      key: 'login',
      asyncThunk: thunks.loginUser,
    });
    extraReducersBuilder({
      builder,
      key: 'logout',
      asyncThunk: thunks.logoutUser,
    });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
