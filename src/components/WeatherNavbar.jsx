import React, { useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

function WheatherNavbar(props) {
  const [theme, setTheme] = useState("dark");

  let dark = "Dark Theme";
  return (
    <div>
      <Navbar bg={theme} expand="lg">
        <Navbar.Brand href="weather">Herolo-wheather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline>
              <Button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="outline-success"
              >
                {theme === "dark" ? "Light" : dark}
              </Button>
            </Form>
            <Nav.Link href="weather">Weather details</Nav.Link>
            <Nav.Link href="favorites">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default WheatherNavbar;
