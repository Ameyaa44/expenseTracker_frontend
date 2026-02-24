import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://expensetracker-server-gn3l.onrender.com/transactions";

// Fetch
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);

// Add
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, { rejectWithValue }) => {
    try {
      const response = await axios.post(API, transaction);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add");
    }
  }
);

// Delete
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete");
    }
  }
);

// Edit
export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transaction, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/${transaction.id}`,
        transaction
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })

      // Edit
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default transactionSlice.reducer;