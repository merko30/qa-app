import React, { Component } from "react";
import { connect } from "react-redux";

import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import {
  getUser,
  sendResetLink,
  editUser,
  changeAvatar
} from "../actions/auth";
import UserInfo from "../components/UserInfo";
import Error from "../components/Error";
import Avatar from "../components/Avatar";

class ProfilePage extends Component {
  state = {
    editable: false,
    avatarEditable: false
  };

  handleToggle = () => {
    this.setState({ editable: !this.state.editable });
  };

  handleAvatar = () => {
    this.setState({ avatarEditable: !this.state.avatarEditable });
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
      sendResetLink,
      editUser,
      changeAvatar
    } = this.props;
    const { editable, avatarEditable } = this.state;
    return (
      <div className="row mt-5">
        {loading && <p>loading...</p>}
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
            <div className="mt-4">
              {error && <Error error={error} />}
              <UserInfo
                data={{
                  name: user.name,
                  username: user.username,
                  email: user.email
                }}
                handleToggle={this.handleToggle}
                editable={editable}
                onEdit={editUser}
              />
              <div className="my-2">
                <p className="my-0">
                  If you want to reset your password type your email here
                </p>
                <ForgotPasswordForm onSubmit={sendResetLink} />
              </div>
              <h4>Your questions</h4>
              <ul className="list-group my-3">
                {user.questions.length === 0 && <p>You have no questions!</p>}
                {user.questions.map(question => {
                  return (
                    <li className="list-group-item" key={question.id}>
                      {question.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ auth: { user, loading, error } }) => ({
    user,
    loading,
    error
  }),
  { getUser, sendResetLink, editUser, changeAvatar }
)(ProfilePage);
