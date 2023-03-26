import "./index.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginAction from "../LoginAction";
import logo from "../../assets/images/argentBankLogo.png";
import { disconnect as disconnectLogin } from "../../features/login";
import { disconnect as disconnectProfil } from "../../features/profile";
import { disconnect as disconnectEditBox } from "../../features/editProfile";
import { selectProfileData } from "../../utils/selectors";

const Layout = () => {
  const dispatch = useDispatch();
  const [firstNameHeader] = useSelector(selectProfileData);
  const locate = useLocation().pathname;

  function handleDisconnect() {
    dispatch(disconnectProfil());
    dispatch(disconnectLogin());
    dispatch(disconnectEditBox());
  }

  return (
    <div className="layout-wrapper">
      <nav className="main-nav">
        <Link
          className="main-nav-logo"
          to="/"
          onClick={() => handleDisconnect()}
        >
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <LoginAction
          user={firstNameHeader && firstNameHeader}
          disconnect={() => handleDisconnect()}
        />
      </nav>
      <main className={locate === "/" ? null : "main bg-dark"}>
        <Outlet />
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default Layout;
