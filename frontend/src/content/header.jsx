import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = (e) => {
    console.log("logged out");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/store">
            <Navbar.Brand>Online Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, c) => (acc += c.quantity), 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.Fname} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser />
                    Log In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
