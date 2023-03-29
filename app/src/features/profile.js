/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstNameHeader: null,
  lastNameHeader: null,
  fetchData: { status: "void", error: null },
};

/**
 * @description slice used for profile
 */
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
    disconnect: () => initialState,
    /**
     * @descrition actions fectch data for profile
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
        draft.firstNameHeader = action.payload.firstName;
        draft.lastNameHeader = action.payload.lastName;
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

export const { disconnect, updateProfileData } = actions;
export const sliceActions = actions;
export default reducer;
