/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../Custom/UseLocalStorage";
const NavbarComponent: React.FC = () => {
  const [token, setToken] = useLocalStorage("token", "");
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/employee">
            Employee
          </Nav.Link>
          <Nav.Link as={Link} to="/user">
            User
          </Nav.Link>
        </Nav>

        <Form>
          <Button
            onClick={() => {
              setToken("");
            }}
            variant="outline-success"
          >
            <Link to="/login">Logout</Link>
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
