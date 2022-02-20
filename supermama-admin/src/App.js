import "./App.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard";
import VerifyPro from "./components/verifyPro";
import VerifySeller from "./components/verifySeller";



function App() {
  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
    <Container>
    <Navbar.Brand href="/dashboard">Supermama</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      <Nav className="me-auto">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/verifyPro">Verification Professional</Nav.Link>
      <Nav.Link href="/verifySeller"> Verification Seller</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Container>
      </Navbar>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/verifyPro" element={<VerifyPro />}></Route>
         <Route exact path="/verifySeller" element={<VerifySeller />}></Route>
      </Routes>
    </div>
  );
}

export default App;
