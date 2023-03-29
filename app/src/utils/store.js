/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login";
import profileReducer from "../features/profile";
import editProfileReducer from "../features/editProfile";

/**
 */
export default configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    editProfile: editProfileReducer,
  },
});
