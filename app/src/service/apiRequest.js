/* eslint-disable prettier/prettier */
// import {
//   selectEditProfileData,
//   selectFetchToken,
//   selectLoginData,
// } from "../utils/selectors";
// import { getSavedLogin } from "../utils/storage";

/**
 *
 * @param {*} slice
 * @param {*} getState
 * @returns
 */
function getApiRequest(slice, getState) {
  // const login = getSavedLogin();
  // const [username, password] = selectLoginData(getState());
  // const [firstName, lastName] = selectEditProfileData(getState());
  // const token = selectFetchToken(getState()) || login?.token || "";
  // let apiBody;
  // const apiHeaders = new Headers();
  // apiHeaders.append("accept", "application/json");
  // apiHeaders.append("Content-Type", "application/json");

  // if (slice !== "login") apiHeaders.append("Authorization", `Bearer ${token}`);
  // if (slice === "login")
  //   apiBody = { email: `${username.value}`, password: `${password.value}` };
  // if (slice === "editProfile")
  //   apiBody = { firstName: `${firstName}`, lastName: `${lastName}` };
  // return {
  //   method: slice === "editProfile" ? "PUT" : "POST",
  //   headers: apiHeaders,
  //   body: apiBody && JSON.stringify(apiBody),
  // };
  const state = getState();
  const token = sessionStorage.getItem("authToken");
  const headers = { "Content-Type": "application/json" };

  if (token && slice !== "login") {
    headers.Authorization = `Bearer ${token}`;
  }

  let method = "GET";
  let body;

  switch (slice) {
    case "login":
      {
        method = "POST";
        const { email, password } = state.login.input;
        body = JSON.stringify({ email, password });
      }
      break;
    case "profile":
      method = "POST";
      body = undefined;
      break;
    case "editProfile":
      {
        method = "PUT";
        const { firstName, lastName } = state.editProfile.input;
        body = JSON.stringify({ firstName, lastName });
      }
      break;
    default:
      throw new Error(`Unknown slice "${slice}" in getApiRequest`);
  }

  return {
    method,
    headers,
    ...(body && { body }),
  };
}

export default getApiRequest;
