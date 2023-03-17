/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import inputLoginReducer from "../features/inputLogin";

export default configureStore({
  reducer: {
    inputLogin: inputLoginReducer,
  },
});
