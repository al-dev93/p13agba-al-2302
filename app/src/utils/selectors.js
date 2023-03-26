/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */

export const selectInputLogin = (name) => {
  return (state) => state.login[name];
};
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
// **********************
export const selectProfileData = (state) => [
  state.profile.firstNameHeader,
  state.profile.lastNameHeader,
];
export const selectFetchProfileStatus = (state) =>
  state.profile.fetchData.status;
// ***********************
export const selectEditBox = (state) => state.editProfile.editBox;
export const selectInputEditProfile = (name) => {
  return (state) => state.editProfile[name];
};
export const selectEditProfileData = (state) => [
  state.editProfile.firstName,
  state.editProfile.lastName,
];
export const selectFetchEditProfileStatus = (state) =>
  state.editProfile.fetchData.status;
