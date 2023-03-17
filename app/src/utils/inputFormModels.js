/* eslint-disable prettier/prettier */
export const loginInputModel = [
  { name: "username", type: "text", label: "Username", required: true },
  { name: "password", type: "password", label: "Password", required: true },
  { name: "remember-me", type: "checkbox", label: "Remember me" },
];

export const profileInputModel = [
  { name: "first-name", type: "text" },
  { name: "last-name", type: "text" },
];
