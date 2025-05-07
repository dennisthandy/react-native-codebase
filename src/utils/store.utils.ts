import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';

export const clearState = <S extends string>(
  state: Draft<Record<S, ApiResponse<unknown>>>,
  action: PayloadAction<ClearState<S>>
) => {
  const nextState = state as Record<S, ApiResponse<unknown>>;
  const { key, withData } = action.payload;

  if (withData) nextState[key].data = null;
  nextState[key].isError = false;
  nextState[key].message = '';
  nextState[key].isSuccess = false;
  nextState[key].isLoading = false;
};

export const asyncThunkCreators = <S, T>({
  state,
  action,
  type,
  key,
}: AsyncThunkState<S>) => {
  const payload = action ? (action.payload as ApiResponse<T>) : null;

  if (type === 'fulfilled' && payload) {
    state[key] = {
      ...payload,
      isLoading: false,
      isError: false,
      isSuccess: true,
    };
  }

  if (type === 'pending') {
    state[key] = {
      ...state[key],
      isSuccess: false,
      isLoading: true,
      isError: false,
      message: '',
    };
  }

  if (type === 'rejected' && payload) {
    const { message, code } = payload;
    state[key] = {
      ...state[key],
      code,
      isLoading: false,
      isError: true,
      isSuccess: false,
      message,
    };
  }
  return state;
};

export const extraReducersBuilder = <S, T, P>({
  builder,
  asyncThunk,
  key,
}: {
  builder: ActionReducerMapBuilder<S>;
  key: keyof Draft<S>;
  asyncThunk: AsyncThunk<T, P, object>;
}) => {
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    const nextState = asyncThunkCreators<S, T>({
      action,
      key,
      state,
      type: 'fulfilled',
    });
    console.log(state[key], nextState[key], key);
    state[key] = nextState[key];
  });
  builder.addCase(asyncThunk.pending, (state) => {
    const nextState = asyncThunkCreators<S, T>({
      key,
      state,
      type: 'pending',
    });
    state[key] = nextState[key];
  });
  builder.addCase(asyncThunk.rejected, (state, action) => {
    const nextState = asyncThunkCreators<S, T>({
      action,
      key,
      state,
      type: 'rejected',
    });
    state[key] = nextState[key];
  });
};
