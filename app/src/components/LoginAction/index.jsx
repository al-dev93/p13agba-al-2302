/* eslint-disable prettier/prettier */
import propTypes from "prop-types";
import { NavLink } from "react-router-dom";
import style from "./index.module.css";

const LoginAction = ({ user, disconnect }) => {
  return (
    (user && (
      <div className={style["sign-out-wrapper"]}>
        <i className={`fa fa-user-circle ${style["sign-icon"]}`} />
        {user}
        <NavLink
          className={style["main-nav-item"]}
          to="/"
          onClick={() => disconnect()}
        >
          <i
            className={`fas fas fa-arrow-right-from-bracket ${style["sign-icon"]}`}
          />
          Sign Out
        </NavLink>
      </div>
    )) || (
      <NavLink className={style["main-nav-item"]} to="/login">
        <i className={`fa fa-user-circle ${style["sign-icon"]}`} />
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
