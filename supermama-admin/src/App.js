import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom"; //Router show warning may ignore cause without it no function
import Dashboard from "./components/dashboard";
import VerifyPro from "./components/verifyPro";
import VerifySeller from "./components/verifySeller";
import VerifyFeed from "./components/verifyFeed";
import VerifyPost from "./components/verifyPost";
import Login from "./components/login";
import Logout from "./components/logout";

function App() {
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

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
              <Nav.Link href="/verifyFeed">Verification Feed</Nav.Link>
              <Nav.Link href="/verifyPost">Verification Post</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/verifyPro" element={<VerifyPro />}></Route>
        <Route exact path="/verifySeller" element={<VerifySeller />}></Route>
        <Route exact path="/verifyFeed" element={<VerifyFeed />}></Route>
        <Route exact path="/verifyPost" element={<VerifyPost />}></Route>
      </Routes>
    </div>
  );
}

export default App;
