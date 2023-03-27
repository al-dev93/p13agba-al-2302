/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

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

export const {
  disconnect,
  input,
  toggleEditBox,
  toggleSubmit,
  updateInputEditBox,
} = actions;
export const sliceActions = actions;
export default reducer;
