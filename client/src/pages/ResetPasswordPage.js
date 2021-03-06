import React, { Component } from "react";
import { connect } from "react-redux";

import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import Message from "../components/Message";
import Error from "../components/Error";

import { resetPassword } from "../actions/auth";

class ResetPasswordPage extends Component {
  render() {
    const token = this.props.match.params.token;
    const { resetPassword, error, message } = this.props;
    return (
      <div class="mt-5 row">
        <div className="col-md-8 offset-md-2 col-sm-12">
          {message && <Message message={message} />}
          {error && <Error error={error} />}
          <ResetPasswordForm onSubmit={resetPassword} token={token} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth: { error, message } }) => ({ error, message }),
  {
    resetPassword
  }
)(ResetPasswordPage);
