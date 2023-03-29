/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */

/**
 * @description selector in login state
 * @param {string} name
 * @returns entry of state for name element in login state
 */
export const selectInputLogin = (name) => {
  return (state) => state.login[name];
};
/**
 * @description selectors in login state
 * @param {*} state
 * @returns data in login state
 */
export const selectLoginData = (state) => [
  state.login.username,
  state.login.password,
  state.login.remember,
  state.login.isSubmit,
];
export const selectFetchLoginData = (state) => [
  state.login.fetchData.status,
  state.login.fetchData.token,
];
export const selectFetchToken = (state) => state.login.fetchData.token;
/**
 * @description selectors in profile state
 * @param {*} state
 * @returns data in profile state
 */
export const selectProfileData = (state) => [
  state.profile.firstNameHeader,
  state.profile.lastNameHeader,
];
export const selectFetchProfileStatus = (state) =>
  state.profile.fetchData.status;
/**
 * @description selector in edit profile
 * @param {string} name
 * @returns entry of state for name element in edit profile state
 */
export const selectInputEditProfile = (name) => {
  return (state) => state.editProfile[name];
};
/**
 * @description selectors in edit profile
 * @param {*} state
 * @returns data in edit profile state
 */
export const selectEditBox = (state) => state.editProfile.editBox;
export const selectEditProfileData = (state) => [
  state.editProfile.firstName,
  state.editProfile.lastName,
];
export const selectFetchEditProfileStatus = (state) =>
  state.editProfile.fetchData.status;
