import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./config/history";

import store from "./config/store";
import checkUser from "./config/checkUser";

checkUser(store);

function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
