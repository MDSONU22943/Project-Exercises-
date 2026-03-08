import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for simulating database save
export const saveTransactionToDatabase = createAsyncThunk(
  'transactions/saveTransactionToDatabase',
  async (transaction, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful save to database
      console.log('Transaction saved to database:', transaction);
      return transaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  balance: 0,
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const transaction = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      
      state.transactions.push(transaction);
      
      // Update balance
      if (transaction.type === 'credit') {
        state.balance += transaction.amount;
      } else {
        state.balance -= transaction.amount;
      }
    },
    
    removeTransaction: (state, action) => {
      const transactionId = action.payload;
      const transaction = state.transactions.find(t => t.id === transactionId);
      
      if (transaction) {
        // Reverse the balance change
        if (transaction.type === 'credit') {
          state.balance -= transaction.amount;
        } else {
          state.balance += transaction.amount;
        }
        
        state.transactions = state.transactions.filter(t => t.id !== transactionId);
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTransactionToDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTransactionToDatabase.fulfilled, (state, action) => {
        state.loading = false;
        // Transaction is already added via addTransaction reducer
      })
      .addCase(saveTransactionToDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTransaction, removeTransaction, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
