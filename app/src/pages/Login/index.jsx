/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postData from "../../utils/postData";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState("");
  const [fieldError, setFieldError] = useState({
    username: "Username is required",
    password: "Password is required",
  });

  function handleFieldChange(event) {
    console.log(remember);
    if (event.target.value !== "") {
      const property = event.target.name === "username" ? "email" : "password";
      event.target.classList.remove("is-invalid");
      setLogin({ ...login, [property]: event.target.value });
      setFieldError({ ...fieldError, [event.target.name]: "" });
      event.target.nextElementSibling.classList.add("is-hidden");
    } else {
      event.target.classList.add("is-invalid");
      const missingInput =
        event.target.name === "username"
          ? "Username is required"
          : "Password is required";
      setFieldError({ ...fieldError, [event.target.name]: missingInput });
      event.target.nextElementSibling.classList.remove("is-hidden");
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (!fieldError.password && !fieldError.username) {
            const data = await postData(
              "http://localhost:3001/api/v1/user/login",
              login
            );
            if (data.status === 200) {
              localStorage.setItem("login", JSON.stringify(data.body));
              navigate("/profile");
            } else {
              const property = data.message.includes("User")
                ? "username"
                : "password";
              const input = document.getElementById(property);
              setFieldError({ ...fieldError, [property]: data.message });
              input.classList.add("is-invalid");
              input.nextElementSibling.classList.remove("is-hidden");
            }
          } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in fieldError) {
              if (fieldError[key]) {
                const input = document.getElementById(`${key}`);
                input.classList.add("is-invalid");
                input.nextElementSibling.classList.remove("is-hidden");
              }
            }
          }
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            // value={remember === "on" ? login.username : ""}
            onChange={handleFieldChange}
            required
          />
          <span className="is-hidden">{fieldError.username}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            // value={remember === "on" ? login.password : ""}
            onChange={handleFieldChange}
            required
          />
          <span className="is-hidden">{fieldError.password}</span>
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            onChange={(event) => setRemember(event.target.value)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Login;
