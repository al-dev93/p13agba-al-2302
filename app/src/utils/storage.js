/* eslint-disable prettier/prettier */
export function getSavedLogin() {
  return JSON.parse(sessionStorage.getItem("userLogin"));
}

export function saveLogin(username, token, remember) {
  sessionStorage.setItem(
    "userLogin",
    JSON.stringify({
      username: `${username}`,
      token: `${token}`,
      remember: `${remember}`,
      password: "xxxxxxxxxxx",
    })
  );
}

export function eraseSavedLogin() {
  sessionStorage.removeItem("userLogin");
}
