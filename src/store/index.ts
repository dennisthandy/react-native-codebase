// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/auth/auth.slice';
import ui from './slices/ui/ui.slice';
import user from './slices/user/user.slice';

export const store = configureStore({
  reducer: { auth, user, ui },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
