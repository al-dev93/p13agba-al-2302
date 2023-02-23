import "./style.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.png";

const Layout = () => (
  <>
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <NavLink className="main-nav-item" to="./sign-in.html">
          <i className="fa fa-user-circle" />
          Sign In
        </NavLink>
      </div>
    </nav>
    <div>
      <Outlet />
    </div>
    <footer className="footer">
      <p className="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
  </>
);

export default Layout;
