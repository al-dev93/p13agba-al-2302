/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: {},
  password: {},
  remember: undefined,
  isSubmit: false,
  fetchData: { status: "void", error: null, token: null },
};

/**
 * @description slice used for login
 */
const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearLoginInStore: (draft) => {
      draft.username = {};
      draft.password = {};
      draft.isSubmit = false;
    },
    disconnect: () => initialState,
    input: {
      prepare: (name, value, error) => ({
        payload:
          name === "remember"
            ? { name, checked: value }
            : { name, value, error },
      }),
      reducer: (draft, action) => {
        if (action.payload.name === "remember")
          draft[action.payload.name] = action.payload.checked;
        else {
          draft[action.payload.name].value = action.payload.value;
          draft[action.payload.name].error = action.payload.error;
        }
      },
    },
    setInputError: {
      prepare: (name, error) => ({
        payload: { name, error },
      }),
      reducer: (draft, action) => {
        draft[action.payload.name].error = action.payload.error;
      },
    },
    setTokenInStore: {
      prepare: (login) => ({
        payload: { token: login.token },
      }),
      reducer: (draft, action) => {
        draft.fetchData.token = action.payload.token;
      },
    },
    setInputSaved: {
      prepare: (login) => ({
        payload: {
          username: login.username,
          remember: login.remember === "true",
          password: login.password,
        },
      }),
      reducer: (draft, action) => {
        draft.username.value = action.payload.username;
        draft.password.value = action.payload.password;
        draft.remember = action.payload.remember;
      },
    },
    submit: (draft) => {
      draft.isSubmit = true;
    },
    /**
     * @descrition actions fectch data for login
     * @param {*} draft (copy of state)
     * @param {*} action for update state
     */
    // fetching action & reducer
    fetching: (draft) => {
      switch (draft.fetchData.status) {
        case "void":
          draft.fetchData.status = "pending";
          return;
        case "rejected":
          draft.fetchData.error = null;
          draft.fetchData.status = "pending";
          return;
        case "resolved":
          draft.fetchData.status = "updating";
          break;
        default:
      }
    },
    // resolved action & reducer
    resolved: (draft, action) => {
      // if request is in progress
      if (
        draft.fetchData.status === "pending" ||
        draft.fetchData.status === "updating"
      ) {
        // resolved and saving data
        draft.fetchData.status = "resolved";
        draft.fetchData.token = action.payload.token;
      }
    },
    // rejected action & reducer
    rejected: {
      prepare: (name, error, data) => ({
        payload: { name, error: error.message, fetchError: data.message },
      }),
      reducer: (draft, action) => {
        // if request is in progress
        if (
          draft.fetchData.status === "pending" ||
          draft.fetchData.status === "updating"
        ) {
          // rejected, saving error, disable isSubmit
          draft.fetchData.status = "rejected";
          draft.isSubmit = false;
          draft.fetchData.error = action.payload.error;
          if (action.payload.name)
            draft[action.payload.name].error = action.payload.fetchError;
        }
      },
    },
  },
});

export const {
  input,
  disconnect,
  clearLoginInStore,
  setInputError,
  setInputSaved,
  setTokenInStore,
  submit,
} = actions;
export const sliceActions = actions;
export default reducer;
