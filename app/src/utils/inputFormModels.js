/**
 * @description definition of the input elements of the login page
 */
export const loginInputModel = [
  { name: "username", type: "text", label: "Username", required: true },
  { name: "password", type: "password", label: "Password", required: true },
  { name: "remember", type: "checkbox", label: "Remember me" },
];
/**
 * @description definition of the input elements of the profile page
 */
export const profileInputModel = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
];
