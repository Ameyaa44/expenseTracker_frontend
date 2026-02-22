import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "https://expensetracker-server-gn3l.onrender.com";
const API = "https://expensetracker-server-gn3l.onrender.com/transactions";
// const API = "http://localhost:3000/transactions";

// GET
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get(API);
    console.log("API RESPONSE:", response.data);
    return response.data;
  }
);

// POST
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction) => {
    const response = await axios.post(API, transaction);
    return response.data;
  }
);

// DELETE
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

// PUT
export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transaction) => {
    const response = await axios.put(
      `${API}/${transaction.id}`,
      transaction
    );
    return response.data;
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
      .addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })

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