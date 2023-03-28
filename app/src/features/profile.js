/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstNameHeader: null,
  lastNameHeader: null,
  fetchData: { status: "void", error: null },
};

const { actions, reducer } = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileData: {
      prepare: (firstName, lastName) => ({
        payload: { firstName, lastName },
      }),
      reducer: (draft, action) => {
        draft.firstNameHeader = action.payload.firstName;
        draft.lastNameHeader = action.payload.lastName;
      },
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

export const { disconnect, updateProfileData } = actions;
export const sliceActions = actions;
export default reducer;
