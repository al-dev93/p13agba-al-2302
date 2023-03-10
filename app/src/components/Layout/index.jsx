import "./index.css";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import LoginAction from "../LoginAction";
import logo from "../../assets/images/argentBankLogo.png";

const Layout = () => {
  const locate = useLocation().pathname;
  const [userData, setUserData] = useState(undefined);

  function handleDisconnect() {
    setUserData(undefined);
    if (!localStorage.getItem("userLogin")) localStorage.removeItem("login");
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
          user={userData && userData.firstName}
          disconnect={() => handleDisconnect()}
        />
      </nav>
      <main className={locate === "/" ? null : "main bg-dark"}>
        <Outlet context={[userData, setUserData]} />
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default Layout;
