import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold">
          <Link to="/">Cool Blog</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Search />
          <Nav className="ms-auto">
            <Menu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
