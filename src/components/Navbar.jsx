import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

const CustomNavbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand={false}>
        <button className="navbar-toggler" type="button" onClick={handleShow}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar.Brand className="mx-auto" as={Link} to="/">
          Meal App
        </Navbar.Brand>
      </Navbar>

      <div className={`sidebar ${show ? "active" : ""}`}>
        <button className="closebtn" onClick={handleClose}>
          &times;
        </button>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" onClick={handleClose}>
            Homepage
          </Nav.Link>
          <Nav.Link as={Link} to="/menu" onClick={handleClose}>
            Menu
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites" onClick={handleClose}>
            My Favorites
          </Nav.Link>
          <Nav.Link as={Link} to="/random-meal" onClick={handleClose}>
            Random Meal
          </Nav.Link>
        </Nav>
        <Nav className="flex-column about-link">
          <Nav.Link as={Link} to="/about" onClick={handleClose}>
            About Me
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default CustomNavbar;
