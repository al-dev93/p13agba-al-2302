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
      default:
        throw new Error(`Unknown slice: ${slice}`);
    }
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(actions.fetching());
    try {
      const options = getApiRequest(slice, getState);
      // eslint-disable-next-line no-console
      // console.log("📤 [DEBUG fetchThunk]", slice, url, options);
      const response = await fetch(url, options);

      let json;
      try {
        json = await response.json();
      } catch (parseError) {
        throw new Error("Invalid JSON response");
      }
      data = json;

      if (!response.ok) {
        const errMsg =
          data?.message || `Request failed with status ${response.status}`;
        if (slice === "login") {
          let name = "";
          if (errMsg.includes("User")) name = "username";
          else if (errMsg.includes("Password")) name = "password";
          dispatch(loginActions.rejected(name, new Error(errMsg), data));
        } else {
          dispatch(actions.rejected(errMsg));
        }
        return;
      }

      if (slice === "login" && data.body?.token) {
        sessionStorage.setItem("authToken", data.body.token);
      }

      dispatch(actions.resolved(data.body));
    } catch (error) {
      const errMsg = error?.message || "Unknown error occurred";
      if (slice === "login") {
        dispatch(loginActions.rejected("", error, data));
      } else dispatch(actions.rejected(errMsg));
    }
  };
}

export default fetchThunk;
