import { feedsSlice } from './slices/feeds.slice';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/auth.slice';
import accountReducer from './slices/account.slice';
import feedsReducer from './slices/feeds.slice';
import currentVideoReducer from './slices/currentVideo.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    account: accountReducer,
    feeds: feedsReducer,
    currentVideo: currentVideoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
