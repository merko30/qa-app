import React, { Component } from "react";
import { connect } from "react-redux";

import Password from "../components/Password";
import RemoveAccount from "../components/RemoveAccount";
import Email from "../components/Email";
import Message from "../components/Message";
import UserInfo from "../components/UserInfo";
import Error from "../components/Error";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import CenterWrapper from "../layout/CenterWrapper";
import {
  getUser,
  sendResetLink,
  editUser,
  changeAvatar,
  changeEmail,
  deleteUser,
  changePassword
} from "../actions/auth";
import { Tabs, Tab } from "react-bootstrap";

class ProfilePage extends Component {
  state = {
    editable: false,
    avatarEditable: false,
    emailEditable: false,
    deleteEditable: false,
    passwordEditable: false
  };

  handleToggle = () => {
    this.setState({ editable: !this.state.editable });
  };

  handleDeleteEditable = () => {
    this.setState({ deleteEditable: !this.state.deleteEditable });
  };

  handlePasswordEditable = () => {
    this.setState({ passwordEditable: !this.state.passwordEditable });
  };

  handleAvatar = () => {
    this.setState({ avatarEditable: !this.state.avatarEditable });
  };

  handleToggleEmail = () => {
    this.setState({ emailEditable: !this.state.emailEditable });
  };

  componentDidMount() {
    const userID = localStorage.getItem("userId");
    const { getUser } = this.props;
    getUser(userID);
  }

  render() {
    const {
      user,
      loading,
      error,
      changePassword,
      editUser,
      changeAvatar,
      changeEmail,
      message,
      deleteUser
    } = this.props;
    const {
      editable,
      avatarEditable,
      emailEditable,
      deleteEditable,
      passwordEditable
    } = this.state;
    return (
      <div className="row mt-5">
        {loading && (
          <CenterWrapper>
            <Loading />
          </CenterWrapper>
        )}
        {user && (
          <div className="mx-auto col-sm-12 col-md-10 offset-md-1">
            <div className="text-center">
              <Avatar
                src={user.avatar}
                alt={user.name}
                onEdit={changeAvatar}
                handleToggle={this.handleAvatar}
                editable={avatarEditable}
              />
              <h3 className="text-uppercase my-2">{user.name}</h3>
            </div>
            {message && <Message message={message} />}
            {error && <Error error={error} />}

            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >
              <Tab eventKey="basic" title="Basic Information">
                <div className="mt-4">
                  <UserInfo
                    data={{
                      name: user.name,
                      username: user.username
                    }}
                    handleToggle={this.handleToggle}
                    editable={editable}
                    onEdit={editUser}
                  />
                </div>
              </Tab>
              <Tab eventKey="privacy" title="Security settings">
                <div className="mt-4">
                  <label>Change your email</label>
                  <Email
                    editable={emailEditable}
                    onSubmit={changeEmail}
                    email={user.email}
                    handleToggle={this.handleToggleEmail}
                  />
                  <hr />
                  <label>Change your password</label>
                  <Password
                    editable={passwordEditable}
                    onSubmit={changePassword}
                    handleToggle={this.handlePasswordEditable}
                  />
                  <hr />
                  <label>Remove your account</label>
                  <RemoveAccount
                    onSubmit={deleteUser}
                    editable={deleteEditable}
                    handleToggle={this.handleDeleteEditable}
                  />
                </div>
              </Tab>
              <Tab eventKey="questions" title="Your questions">
                <div className="mt-4">
                  <h4>Your questions</h4>
                  <ul className="list-group my-3">
                    {user.questions.length === 0 && (
                      <p>You have no questions!</p>
                    )}
                    {user.questions.map(question => {
                      return (
                        <li className="list-group-item" key={question.id}>
                          {question.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ auth: { user, loading, error, message } }) => ({
    user,
    loading,
    error,
    message
  }),
  {
    getUser,
    sendResetLink,
    editUser,
    changeAvatar,
    changeEmail,
    deleteUser,
    changePassword
  }
)(ProfilePage);
