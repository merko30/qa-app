import React, { Component } from "react";
import { connect } from "react-redux";

import LoginForm from "../components/forms/LoginForm";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Message from "../components/Message";

import { login } from "../actions/auth";

import FormWrapper from "../layout/FormWrapper";

class LoginPage extends Component {
  onSubmit = data => {
    const { login } = this.props;

    login(data);
  };

  render() {
    const { error, loading, message } = this.props;
    return (
      <div className="container my-5">
        <FormWrapper>
        {error && <Error error={error} />}
        {message && <Message message={message} />}
        {loading && <Loading />}
        <LoginForm onSubmit={this.onSubmit} />
        </FormWrapper>
        </div>
    );
  }
}

export default connect(
  ({ auth: { loading, error, message } }) => ({
    loading,
    error,
    message
  }),
  { login }
)(LoginPage);
