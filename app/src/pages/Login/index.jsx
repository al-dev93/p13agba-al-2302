/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import { defineLoginForm } from "../../utils/defineForm";
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

  function checkErrorForm(state) {
    for (const key in state) {
      if (state[key].error) return true;
    }
    return false;
  }

  function getDataToPost(state) {
    return {
      email: state.username.value,
      password: state.password.value,
    };
  }

  function setInputFormError(message, state, setState) {
    const postDataError = message.includes("User") ? "username" : "password";
    setState({
      ...state,
      [postDataError]: { ...state[postDataError], error: message },
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

  async function apiRequest(event) {
    event.preventDefault();
    if (login && (!loginState.username.value || !loginState.password.value)) {
      navigate("/profile");
      if (!loginState["remember-me"]) localStorage.removeItem("userLogin");
    }
    if (!checkErrorForm(loginState)) {
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
      } else setInputFormError(data.message, loginState, setLoginState);
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form noValidate onSubmit={(event) => apiRequest(event)}>
        {/* eslint-disable-next-line array-callback-return */}
        {defineLoginForm.map((input) => (
          <InputForm
            key={`${input.name}`}
            state={loginState}
            setState={setLoginState}
            name={input.name}
            type={input.type}
            placeHolder={login ? getPlaceHolder(input.name) : undefined}
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
