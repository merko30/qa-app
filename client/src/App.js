import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import { Container } from "react-bootstrap";

import Routes from "./routes";
import Header from "./layout/Header";

function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <Routes />
      </Container>
    </div>
  );
}

export default App;
