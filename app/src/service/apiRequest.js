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

  // Détermine la méthode et le corps selon la slice
  let method = "GET";
  let body = null;
  switch (slice) {
    case "login":
      method = "POST";
      body = JSON.stringify(state.login.input);
      break;
    case "profile":
      method = "POST";
      body = JSON.stringify(state.login.input);
      break;
    case "editProfile":
      method = "PUT";
      body = JSON.stringify(state.editProfile.input);
      break;
    default:
  }

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    method,
    headers,
    ...(body && { body }),
  };
}

export default getApiRequest;
