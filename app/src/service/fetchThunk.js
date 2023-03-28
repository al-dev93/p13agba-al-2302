/* eslint-disable prettier/prettier */
import {
  selectFetchEditProfileStatus,
  selectFetchLoginData,
  selectFetchProfileStatus,
} from "../utils/selectors";
import { sliceActions as loginActions } from "../features/login";
import { sliceActions as profileActions } from "../features/profile";
import { sliceActions as editProfileActions } from "../features/editProfile";
import { LOGIN, PROFILE } from "./urlApi";
import getApiRequest from "./apiRequest";

function fetchThunk(slice) {
  return async (dispatch, getState) => {
    let data;
    let status;
    let actions;
    const url = slice === "login" ? LOGIN : PROFILE;
    switch (slice) {
      case "login":
        [status] = selectFetchLoginData(getState());
        actions = loginActions;
        break;
      case "profile":
        status = selectFetchProfileStatus(getState());
        actions = profileActions;
        break;
      case "editProfile":
        status = selectFetchEditProfileStatus(getState());
        actions = editProfileActions;
        break;
      // no default
    }
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(actions.fetching());
    try {
      data = await (await fetch(url, getApiRequest(slice, getState))).json();
      dispatch(actions.resolved(data.body));
    } catch (error) {
      if (slice === "login") {
        let name = "";
        if (data.message.includes("User")) name = "username";
        else if (data.message.includes("Password")) name = "password";
        dispatch(actions.rejected(name, error, data));
      } else dispatch(actions.rejected(error.message));
    }
  };
}

export default fetchThunk;
