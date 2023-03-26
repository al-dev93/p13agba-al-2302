/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit";
import { selectFetchProfileStatus, selectFetchToken } from "../utils/selectors";
import { PROFILE } from "../service/urlApi";

const login = JSON.parse(localStorage.getItem("userLogin"));

const initialState = {
  firstNameHeader: null,
  lastNameHeader: null,
  fetchData: { status: "void", error: null },
};

const { actions, reducer } = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileData: (draft, action) => {
      draft.firstNameHeader = action.payload.firstName;
      draft.lastNameHeader = action.payload.lastName;
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
        draft.firstNameHeader = action.payload.firstName;
        draft.lastNameHeader = action.payload.lastName;
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
        draft.fetchData.error = action.payload;
      }
    },
    disconnect: () => initialState,
  },
});

export async function fetchProfile(dispatch, getState) {
  const status = selectFetchProfileStatus(getState());
  const token =
    (selectFetchToken(getState())
      ? selectFetchToken(getState())
      : login?.token) || "";
  let data;

  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  apiHeaders.append("Content-Type", "application/json");
  apiHeaders.append("Authorization", `Bearer ${token}`);

  if (status === "pending" || status === "updating") {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return;
  }
  dispatch(actions.fetching());
  try {
    data = await (
      await fetch(PROFILE, { method: "POST", headers: apiHeaders })
    ).json();
    dispatch(actions.resolved(data.body));
  } catch (error) {
    dispatch(actions.rejected(error.message));
  }
}

export const { disconnect, updateProfileData } = actions;
export default reducer;
