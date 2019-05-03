import React, { Component } from "react";
import { connect } from "react-redux";

import { Navbar, Nav, Button } from "react-bootstrap";
import "./header.css";

import QuestionForm from "../../components/forms/QuestionForm";
import MyModal from "../Modal";
import NavItem from "./NavItem";

import { addQuestion } from "../../actions/questions";

import { logout } from "../../actions/auth";

class Header extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { addQuestion, loggedIn } = this.props;
    const { show } = this.state;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <NavItem to="/">AppName</NavItem>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {!loggedIn && <NavItem to="/login">Login</NavItem>}
            {!loggedIn && <NavItem to="/register">Register</NavItem>}

            {loggedIn && (
              <Button onClick={this.handleShow} variant="info" className="my-1">
                Add Question
              </Button>
            )}
            <MyModal show={show} handleClose={this.handleClose}>
              <QuestionForm mode="add" onSubmit={addQuestion} />
            </MyModal>
            {loggedIn && (
              <Button variant="light" className="m-1" onClick={this.logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  ({ auth: { loading, loggedIn } }) => ({ loading, loggedIn }),
  { addQuestion, logout }
)(Header);
