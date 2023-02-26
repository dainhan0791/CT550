import { IProfile } from '../../interfaces/account.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: IProfile = {
  profile: null,
};

export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload.profile;
    },
  },
});

export const { setProfile } = accountSlice.actions;

export default accountSlice.reducer;
