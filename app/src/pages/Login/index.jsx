/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
    remember: "",
  });
  function handleFieldChange(event) {
    setLogin({ ...login, [event.target.name]: event.target.value });
  }
  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          localStorage.setItem("login", JSON.stringify(login));
          navigate("/profile");
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={login.username}
            onChange={handleFieldChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleFieldChange}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            onChange={handleFieldChange}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
