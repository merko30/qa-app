import React, { Component } from "react";
import { connect } from "react-redux";


import Icon from "../../components/Icon";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { Button } from "react-bootstrap";
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
      <nav className="navbar navbar-expand-lg bg">
        <div className="container">

      <NavItem to="/">QAPP</NavItem>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <Icon icon={faBars} classes="navbar-toggler-icon" />
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            {!loggedIn && <NavItem to="/login">Login</NavItem>}
            {!loggedIn && <NavItem to="/register">Register</NavItem>}
            {loggedIn && <NavItem to="/profile">Profile</NavItem>}
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
          </ul>
        </div>
            </div>
      </nav>
    );
  }
}

export default connect(
  ({ auth: { loading, loggedIn } }) => ({ loading, loggedIn }),
  { addQuestion, logout }
)(Header);
