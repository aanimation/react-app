import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import LoginPage from "./components/auth/login";
import EditUser from "./components/user/edit";
import ListUser from "./components/user/list";
import CreateUser from "./components/user/create";

import TokenService from './services/tokenService';


export default function App() {
  const { token, setToken } = TokenService();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            {process.env.REACT_APP_NAME}
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/create" element={<CreateUser />} />
              <Route path="/edit/:id" element={<EditUser />} />
              <Route exact path='/' element={<ListUser />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}