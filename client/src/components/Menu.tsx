import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const loginLinks = [
    { label: "Register", path: "/register" },
    { label: "Login", path: "/login" },
  ];
  return (
    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {loginLinks.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link className="nav-link" to={link.path}>
              {link.label}
            </Link>
          </li>
        ))}
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            UserName
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
