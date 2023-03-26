/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import { selectFetchLoginData, selectLoginData } from "../utils/selectors";
import { LOGIN } from "../service/urlApi";

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
    input: (draft, action) => {
      if (!action.payload.type) {
        draft[action.payload.name].value = action.payload.value;
        draft[action.payload.name].error = action.payload.error;
      } else draft[action.payload.name] = action.payload.checked;
    },
    setInputError: (draft, action) => {
      draft[action.payload.name].error = action.payload.error;
    },
    setTokenInStore: (draft, action) => {
      draft.fetchData.token = action.payload;
    },
    setInputSaved: (draft, action) => {
      draft.username.value = action.payload.username;
      draft.password.value = action.payload.password;
      draft.remember = action.payload.remember;
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
    rejected: (draft, action) => {
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
});

export async function fetchLogin(dispatch, getState) {
  const { status } = selectFetchLoginData(getState());
  const [username, password] = selectLoginData(getState());
  let data;

  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  apiHeaders.append("Content-Type", "application/json");
  const apiBody = JSON.stringify({
    email: `${username.value}`,
    password: `${password.value}`,
  });
  if (status === "pending" || status === "updating") {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return;
  }
  dispatch(actions.fetching());
  try {
    data = await (
      await fetch(LOGIN, { method: "POST", headers: apiHeaders, body: apiBody })
    ).json();
    dispatch(actions.resolved(data.body));
  } catch (error) {
    let name = "";
    if (data.message.includes("User")) name = "username";
    else if (data.message.includes("Password")) name = "password";
    dispatch(
      actions.rejected({ name, error: error.message, fetchError: data.message })
    );
  }
}

export const {
  input,
  disconnect,
  clearLoginInStore,
  setInputError,
  setInputSaved,
  setTokenInStore,
  submit,
} = actions;

export default reducer;
