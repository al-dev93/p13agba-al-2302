/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchThunk from "../../service/fetchThunk";
import {
  selectLoginData,
  selectInputLogin,
  selectFetchLoginData,
} from "../../utils/selectors";
import {
  input,
  setInputError,
  setInputSaved,
  setTokenInStore,
  submit,
} from "../../features/login";
import InputForm from "../../components/InputForm";
import { loginInputModel } from "../../utils/inputFormModels";
import "./index.css";
import { eraseSavedLogin, getSavedLogin, saveLogin } from "../../utils/storage";

/**
 * @description component used for login page
 * @returns render login page in outlet of layout
 */
const Login = () => {
  const login = getSavedLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, password, remember, isSubmit] = useSelector(selectLoginData);
  const [status, token] = useSelector(selectFetchLoginData);
  const isResolved = status === "resolved";

  useEffect(() => {
    if (login) {
      dispatch(setInputSaved(login));
    }
  }, []);

  useEffect(() => {
    if (isSubmit && !isResolved && !token) dispatch(fetchThunk("login"));
    if (isResolved || (isSubmit && token)) {
      if (remember) saveLogin(username.value, token, remember);
      else eraseSavedLogin();
      navigate("/profile");
    }
  }, [isSubmit, isResolved]);

  /**
   * @description handle function on submit form
   * @param {object} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    if (!username.value || !password.value) {
      if (!username.value)
        dispatch(setInputError("username", "Username is required"));
      if (!password.value)
        dispatch(setInputError("password", "Password is required"));
      return;
    }
    if (login) {
      const usernameInput = login.username;
      const passwordInput = login.password;
      if (
        usernameInput === username.value &&
        passwordInput === password.value
      ) {
        dispatch(setTokenInStore(login));
      }
    }
    dispatch(submit());
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form noValidate onSubmit={(event) => handleSubmit(event)}>
        {loginInputModel.map((element) => {
          const item = useSelector(selectInputLogin(element.name)) || undefined;
          return (
            <InputForm
              key={`${element.name}`}
              selector={selectInputLogin}
              input={input}
              name={element.name}
              type={element.type}
              label={element.label}
              required={element.required ? true : undefined}
              inChecked={
                element.type === "checkbox" && login && !item
                  ? login[element.name] === "true"
                  : undefined
              }
              inValue={
                element.type !== "checkbox" && login && !item.value
                  ? login[element.name] || "xxxxxxxxxxx"
                  : undefined
              }
            />
          );
        })}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
