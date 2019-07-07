import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './app.css';

import Routes from "./routes";
import Header from "./layout/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
