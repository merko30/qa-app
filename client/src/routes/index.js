import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  DetailPage,
  NotFound,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerificationPage
} from "../pages";

export default class Routes extends Component {
  render() {
    return (
      <Container fluid>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/questions/:id" component={DetailPage} />
          <GuestRoute path="/login" component={LoginPage} />
          <GuestRoute path="/register" component={RegisterPage} />
          <GuestRoute path="/forgot" component={ForgotPasswordPage} />
          <Route path="/reset/:token" component={ResetPasswordPage} />
          <Route path="/verification" component={VerificationPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <GuestRoute path="*" component={NotFound} />
        </Switch>
      </Container>
    );
  }
}
