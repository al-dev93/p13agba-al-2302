/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: {},
  password: {},
  remember: undefined,
  isSubmit: false,
  fetchData: { status: "void", error: null, token: null },
};

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
      // si la requête est en cours
      if (
        draft.fetchData.status === "pending" ||
        draft.fetchData.status === "updating"
      ) {
        // on passe en resolved et on sauvegarde les données
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
        // si la requête est en cours
        if (
          draft.fetchData.status === "pending" ||
          draft.fetchData.status === "updating"
        ) {
          // on passe en rejected, on sauvegarde l'erreur et on supprime les données
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
