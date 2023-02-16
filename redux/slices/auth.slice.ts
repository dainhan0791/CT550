import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface authState {
  user: object;
}

// Define the initial state using that type
const initialState: authState = {
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
