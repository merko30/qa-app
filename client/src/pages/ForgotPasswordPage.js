import React, { Component } from "react";
import { connect } from "react-redux";

import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

import { sendResetLink } from "../actions/auth";

class ForgotPasswordPage extends Component {
  render() {
    const { sendResetLink, error, message } = this.props;

    return (
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2 col-sm-12">
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          <ForgotPasswordForm onSubmit={sendResetLink} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth: { error, message } }) => ({ error, message }),
  {
    sendResetLink
  }
)(ForgotPasswordPage);
