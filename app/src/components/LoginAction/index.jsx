/* eslint-disable prettier/prettier */
import propTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./style.css";

const LoginAction = ({ user, disconnect }) => {
  return (
    (user && (
      <div className="sign-out-wrapper">
        <i className="fa fa-user-circle sign-icon" />
        {user}
        <NavLink className="main-nav-item" to="/" onClick={() => disconnect()}>
          <i className="fas fa-arrow-right-from-bracket sign-icon" />
          Sign out
        </NavLink>
      </div>
    )) || (
      <NavLink className="main-nav-item" to="/login">
        <i className="fa fa-user-circle sign-icon" />
        Sign In
      </NavLink>
    )
  );
};

export default LoginAction;

LoginAction.propTypes = {
  user: propTypes.string,
  disconnect: propTypes.func,
};

LoginAction.defaultProps = {
  user: undefined,
  disconnect: undefined,
};
