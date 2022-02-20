import "./App.css";
import React from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard";
import VerifyPro from "./components/verifyPro";
import VerifySeller from "./components/verifySeller";

function App() {
  return (
    <div className="App">
      <Nav className="ml-auto">

        <NavItem>
          <Link className="nav-link" to="/dashboard">
           Dashboard
          </Link>
        </NavItem>

        <NavItem>
          <Link className="nav-link" to="/verifyPro">
           Verification Professional
          </Link>
        </NavItem>

         <NavItem>
          <Link className="nav-link" to="/verifySeller">
           Verification Seller
          </Link>
        </NavItem>

      </Nav>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/verifyPro" element={<VerifyPro />}></Route>
         <Route exact path="/verifySeller" element={<VerifySeller />}></Route>
      </Routes>
    </div>
  );
}

export default App;
