import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

const Menu = () => {
  const loginLinks = [
    { label: "Register", path: "/register" },
    { label: "Login", path: "/login" },
  ];
  return (
    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {loginLinks.map((link, index) => (
          <Nav.Link key={index}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </Nav.Link>
        ))}
        <NavDropdown title="UserName" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/ptofile">Progile</Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Link to="/logout">Logout</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    </div>
  );
};

export default Menu;
