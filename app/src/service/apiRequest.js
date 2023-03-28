/* eslint-disable prettier/prettier */
import {
  selectEditProfileData,
  selectFetchToken,
  selectLoginData,
} from "../utils/selectors";
import { getSavedLogin } from "../utils/storage";

function getApiRequest(slice, getState) {
  const login = getSavedLogin();
  const [username, password] = selectLoginData(getState());
  const [firstName, lastName] = selectEditProfileData(getState());
  const token = selectFetchToken(getState()) || login?.token || "";
  let apiBody;
  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  apiHeaders.append("Content-Type", "application/json");

  if (slice !== "login") apiHeaders.append("Authorization", `Bearer ${token}`);
  if (slice === "login")
    apiBody = { email: `${username.value}`, password: `${password.value}` };
  if (slice === "editProfile")
    apiBody = { firstName: `${firstName}`, lastName: `${lastName}` };
  return {
    method: slice === "editProfile" ? "PUT" : "POST",
    headers: apiHeaders,
    body: apiBody && JSON.stringify(apiBody),
  };
}

export default getApiRequest;
