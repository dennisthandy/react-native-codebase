type AsyncThunkState<S> = {
  action?: PayloadAction<unknown, string, never>;
  key: keyof S | keyof Draft<S>;
  state: S | Draft<S>;
  type: 'fulfilled' | 'pending' | 'rejected';
};

type ClearState<S> = { key: S; withData?: boolean };
