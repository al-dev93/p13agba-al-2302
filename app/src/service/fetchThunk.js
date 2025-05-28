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

/**
 * @description custom thunk for fetching data of the API
 * @param {*} slice
 */
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
      // data = await (await fetch(url, getApiRequest(slice, getState))).json();
      const response = await fetch(url, getApiRequest(slice, getState));
      data = await response.json();

      if (!response.ok) {
        if (slice === "login") {
          let name = "";
          if (data.message.includes("User")) name = "username";
          else if (data.message.includes("Password")) name = "password";
          dispatch(loginActions.rejected(name, new Error(data.message), data));
        } else {
          dispatch(actions.rejected(data.message));
        }
        return;
      }

      // Stocke le token JWT après login
      if (slice === "login" && data.body?.token) {
        sessionStorage.setItem("authToken", data.body.token);
      }

      dispatch(actions.resolved(data.body));
    } catch (error) {
      if (slice === "login") {
        let name = "";
        if (data.message.includes("User")) name = "username";
        else if (data.message.includes("Password")) name = "password";
        dispatch(loginActions.rejected(name, error, data));
      } else dispatch(actions.rejected(error.message));
    }
  };
}

export default fetchThunk;
