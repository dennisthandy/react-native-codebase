// src/store/slices/uiSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: number;
  message: string;
  type: string;
}

type UIState = {
  isLoading: boolean;
  toasts: Toast[];
  modalVisible: boolean;
  modalContent: any;
  drawer: { title: string };
};

const initialState: UIState = {
  isLoading: false,
  toasts: [],
  modalVisible: false,
  modalContent: null,
  drawer: { title: 'Home' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    showModal: (state, action) => {
      state.modalVisible = true;
      state.modalContent = action.payload;
    },
    hideModal: state => {
      state.modalVisible = false;
      state.modalContent = null;
    },
    setDrawerTitle: (state, action: PayloadAction<string>) => {
      state.drawer.title = action.payload;
    },
  },
});

export const { setDrawerTitle, setLoading, showToast, removeToast, showModal, hideModal } =
  uiSlice.actions;

export default uiSlice.reducer;
