import { configureStore } from '@reduxjs/toolkit';
import codingStatsReducer from './slices/codingStatsSlice';

export const store = configureStore({
  reducer: {
    codingStats: codingStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;