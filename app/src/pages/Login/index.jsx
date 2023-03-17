/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import { loginInputModel } from "../../utils/inputFormModels";
import callApi from "../../service/api/callApi";
import { LOGIN } from "../../utils/urlApi";
import "./index.css";

const Login = () => {
  const login = JSON.parse(localStorage.getItem("userLogin"));
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
    "remember-me": !!login,
  });

  function isLoginInput() {
    return loginState.username.value && loginState.password.value;
  }

  function getDataToPost(state) {
    return {
      email: state.username.value,
      password: state.password.value,
    };
  }

  function setInputFormError(message) {
    const postDataError = message.includes("User") ? "username" : "password";
    setLoginState({
      ...loginState,
      [postDataError]: { ...loginState[postDataError], error: message },
    });
  }

  function connectToProfile(body, remember, nav) {
    if (remember) localStorage.setItem("userLogin", JSON.stringify(remember));
    else localStorage.removeItem("userLogin");
    localStorage.setItem("login", JSON.stringify(body));
    nav("/profile");
  }

  function getPlaceHolder(key) {
    switch (key) {
      case "username":
        return login.username;
      case "password":
        return "***********";
      default:
        return undefined;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (login) {
      if (!loginState["remember-me"]) localStorage.removeItem("userLogin");
      navigate("/profile");
    }
    if (!login && !isLoginInput()) {
      setLoginState({
        ...loginState,
        username: {
          ...loginState.username,
          error: loginState.username.value ? "" : "Username is required",
        },
        password: {
          ...loginState.password,
          error: loginState.password.value ? "" : "Password is required",
        },
      });
      return;
    }
    const data = await callApi(LOGIN, getDataToPost(loginState), "POST");
    if (data.status === 200) {
      connectToProfile(
        data.body,
        loginState["remember-me"]
          ? {
              username: loginState.username.value,
            }
          : undefined,
        navigate
      );
    } else setInputFormError(data.message);
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form noValidate onSubmit={(event) => handleSubmit(event)}>
        {/* eslint-disable-next-line array-callback-return */}
        {loginInputModel.map((input) => (
          <InputForm
            key={`${input.name}`}
            // state={loginState}
            // setState={setLoginState}
            name={input.name}
            type={input.type}
            label={input.label}
            placeHolder={login ? getPlaceHolder(input.name) : undefined}
            required={input.required ? "true" : undefined}
          />
        ))}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
