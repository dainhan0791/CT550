import { ICurrentVideo } from './../../interfaces/video.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: ICurrentVideo = {
  video: null,
};

export const currentVideoSlice = createSlice({
  name: 'feeds',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<ICurrentVideo>) => {
      state.video = action.payload.video;
    },
  },
});

export const { setCurrentVideo } = currentVideoSlice.actions;

export default currentVideoSlice.reducer;
