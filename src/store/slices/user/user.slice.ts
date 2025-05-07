// src/store/slices/authSlice.js
import { defaultState } from '@/src/constants/state.constants';
import { clearState, extraReducersBuilder } from '@/src/utils/store.utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as thunks from './user.thunks';

type UserState = {
  profile: ApiResponse<User | null>;
  update: ApiResponse<unknown>;
};

const initialState: UserState = {
  profile: defaultState,
  update: defaultState,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (
      state,
      action: PayloadAction<ClearState<keyof typeof state>>
    ) => {
      clearState(state, action);
    },
  },
  extraReducers: (builder) => {
    extraReducersBuilder({
      builder,
      key: 'profile',
      asyncThunk: thunks.fetchUserProfile,
    });
    extraReducersBuilder({
      builder,
      key: 'update',
      asyncThunk: thunks.updateUserProfile,
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
