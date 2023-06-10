import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useState } from "react";

export default function Header({ prop }) {
  const [state, setState] = useState(prop);
  let navigate = useNavigate();
  let expand = "sm";

  let handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  let handleClick = (val) => {
    navigate(`/${val}`);
  };

  return (
    <>
      <div>
        <h3 className="text-center mt-3 mb-3">ABC BANK</h3>
      </div>
      <Navbar key={expand} bg="white" expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Toggle
            style={{ marginLeft: "auto" }}
            aria-controls={`offcanvasNavbar-expand-${expand}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                ABC BANK
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="header">
                <Nav>
                  <Nav.Link
                    style={state === "home" ? { color: "#467ed0" } : {}}
                    onClick={() => handleClick("home")}
                  >
                    <i className="fa fa-home"></i> Home
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link
                    style={state === "deposit" ? { color: "#467ed0" } : {}}
                    onClick={() => handleClick("deposit")}
                  >
                    <i className="fa fa-cloud-arrow-up"></i> Deposit
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link
                    style={state === "withdraw" ? { color: "#467ed0" } : {}}
                    onClick={() => handleClick("withdraw")}
                  >
                    <i className="fa fa-cloud-arrow-down"></i> Withdraw
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link
                    style={state === "transfer" ? { color: "#467ed0" } : {}}
                    onClick={() => handleClick("transfer")}
                  >
                    <i className="fa fa-money-bill-transfer"></i> Transfer
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link
                    style={state === "statement" ? { color: "#467ed0" } : {}}
                    onClick={() => handleClick("statement")}
                  >
                    <i className="fa fa-file-lines"></i> Statement
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/" onClick={handleLogout}>
                    <i class="fa fa-arrow-right-from-bracket"></i> Logout
                  </Nav.Link>
                </Nav>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
