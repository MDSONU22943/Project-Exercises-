import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['transactions/addTransaction'],
      },
    }),
});

export default store;
