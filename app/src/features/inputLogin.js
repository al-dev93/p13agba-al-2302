/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const login = JSON.parse(localStorage.getItem("userLogin"));
const initialState = {
  username: {},
  password: {},
  "remember-me": !!login,
};

const { actions, reducer } = createSlice({
  name: "inputLogin",
  initialState,
  reducers: {
    input: (draft, action) => {
      if (!action.payload.type) {
        draft[action.payload.name].value = action.payload.value;
        draft[action.payload.name].error = action.payload.error;
      } else draft[action.payload.name] = action.payload.checked;
    },
  },
});

export const { input } = actions;

export default reducer;
