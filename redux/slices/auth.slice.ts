import { IAuth } from './../../interfaces/account.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: IAuth = {
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<IAuth>) => {
      state.accessToken = action.payload.accessToken;
    },
    removeAccessToken: (state) => {
      state.accessToken = '';
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
