import React, { ReactElement } from "react";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TopNav(): ReactElement {
  const { state, dispatch } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        ProtoCommerce
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="topNav" />
      <Navbar.Collapse id="topNav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/items">
            Items
          </Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          {state.currentUser ? (
            <>
              <NavDropdown
                title={`Welcome, ${state.currentUser.name}`}
                id="topNav"
              >
                <NavDropdown.Item as={Link} to="/">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch({ type: "logout" })}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}

          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
