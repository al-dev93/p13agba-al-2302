/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import { defineLoginForm } from "../../utils/defineForm";
import postData from "../../utils/postData";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
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

  function connectToProfile(body, nav) {
    localStorage.setItem("login", body);
    nav("/profile");
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (!checkErrorForm(loginState)) {
            const data = await postData(
              "http://localhost:3001/api/v1/user/login",
              getDataToPost(loginState)
            );
            if (data.status === 200)
              connectToProfile(JSON.stringify(data.body), navigate);
            else setInputFormError(data.message, loginState, setLoginState);
          }
        }}
      >
        {/* eslint-disable-next-line array-callback-return */}
        {defineLoginForm.map((input) => (
          <InputForm
            key={`${input.name}`}
            state={loginState}
            setState={setLoginState}
            name={input.name}
            type={input.type}
            controlledInput={input.controlledInput}
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
