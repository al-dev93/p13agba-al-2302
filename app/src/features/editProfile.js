/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  editBox: false,
  fetchData: { status: "void", error: null },
};

/**
 * @description slice used for editing profile
 */
const { actions, reducer } = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    disconnect: () => initialState,
    input: {
      prepare: (name, value) => ({
        payload: { name, value },
      }),
      reducer: (draft, action) => {
        draft[action.payload.name] = action.payload.value;
      },
    },
    toggleEditBox: (draft) => {
      draft.editBox = !draft.editBox;
    },
    updateInputEditBox: {
      prepare: (firstNameHeader, lastNameHeader) => ({
        payload: { firstNameHeader, lastNameHeader },
      }),
      reducer: (draft, action) => {
        draft.firstName = action.payload.firstNameHeader;
        draft.lastName = action.payload.lastNameHeader;
      },
    },
    /**
     * @descrition actions fectch data for editing profile
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
        draft.firstName = action.payload.firstName;
        draft.lastName = action.payload.lastName;
      }
    },
    // rejected action & reducer
    rejected: (draft, action) => {
      // if request is in progress
      if (
        draft.fetchData.status === "pending" ||
        draft.fetchData.status === "updating"
      ) {
        // rejected and saving error
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
