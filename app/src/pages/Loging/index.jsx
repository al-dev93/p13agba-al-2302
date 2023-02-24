/* eslint-disable jsx-a11y/label-has-associated-control */
import "./style.css";

const Loging = () => (
  <section className="sign-in-content">
    <i className="fa fa-user-circle sign-in-icon" />
    <h1>Sign In</h1>
    <form>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" name="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  </section>
);

export default Loging;
