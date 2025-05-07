// src/store/slices/userSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreState } from '../..';

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { state: StoreState }
>('user/fetchProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    if (!auth.login.data?.token) {
      return rejectWithValue('Authentication required');
    }

    // In a real app, make API call with token
    // const userData = await userApi.getProfile(auth.token);

    // For demo purposes
    await new Promise((resolve) => setTimeout(resolve, 800));
    const userData = {
      id: '123',
      name: 'Demo User',
      email: 'user@example.com',
      bio: 'React Native Developer',
      location: 'New York',
      phone: '+1234567890',
      profileImage: null,
    };

    return userData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUserProfile = createAsyncThunk<
  unknown,
  User,
  { state: StoreState }
>('user/updateProfile', async (payload, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    if (!auth.login.data?.token) {
      return rejectWithValue('Authentication required');
    }

    // In a real app, make API call with token
    // const updatedData = await userApi.updateProfile(profileData, auth.token);

    // For demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedData = {
      ...payload,
      id: '123', // Maintain existing ID
    };

    return updatedData;
  } catch (error) {
    return rejectWithValue(error);
  }
});
