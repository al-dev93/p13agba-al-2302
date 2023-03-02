import "./style.css";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.png";
import LoginAction from "../LoginAction";

const Layout = () => {
  const locate = useLocation().pathname;
  const [user, setUser] = useState(undefined);

  function handleDisconnect() {
    setUser(undefined);
    localStorage.removeItem("login");
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
        <LoginAction user={user} disconnect={() => handleDisconnect()} />
      </nav>
      <main className={locate === "/" ? null : "main bg-dark"}>
        <Outlet context={[user, setUser]} />
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default Layout;
