/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit";
import {
  selectEditProfileData,
  selectFetchEditProfileStatus,
  selectFetchToken,
} from "../utils/selectors";
import { PROFILE } from "../service/urlApi";

const login = JSON.parse(localStorage.getItem("userLogin"));

const initialState = {
  firstName: "",
  lastName: "",
  editBox: false,
  fetchData: { status: "void", error: null },
};

const { actions, reducer } = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    disconnect: () => initialState,
    input: (draft, action) => {
      draft[action.payload.name] = action.payload.value;
    },
    toggleEditBox: (draft) => {
      draft.editBox = !draft.editBox;
    },
    updateInputEditBox: (draft, action) => {
      draft.firstName = action.payload.firstNameHeader;
      draft.lastName = action.payload.lastNameHeader;
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
        draft.firstName = action.payload.firstName;
        draft.lastName = action.payload.lastName;
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
  },
});

export async function updateProfile(dispatch, getState) {
  const status = selectFetchEditProfileStatus(getState());
  const token =
    (selectFetchToken(getState())
      ? selectFetchToken(getState())
      : login?.token) || "";

  const [firstName, lastName] = selectEditProfileData(getState());
  let data;

  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  apiHeaders.append("Content-Type", "application/json");
  apiHeaders.append("Authorization", `Bearer ${token}`);
  const apiBody = JSON.stringify({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });
  if (status === "pending" || status === "updating") {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return;
  }
  dispatch(actions.fetching());
  try {
    data = await (
      await fetch(PROFILE, {
        method: "PUT",
        headers: apiHeaders,
        body: apiBody,
      })
    ).json();
    dispatch(actions.resolved(data.body));
  } catch (error) {
    dispatch(actions.rejected(error.message));
  }
}

export const {
  disconnect,
  input,
  toggleEditBox,
  toggleSubmit,
  updateInputEditBox,
} = actions;
export default reducer;
