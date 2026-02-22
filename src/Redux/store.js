import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./Slice/transactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export default store;