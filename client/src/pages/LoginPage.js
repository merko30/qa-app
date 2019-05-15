import React, { Component } from "react";
import { connect } from "react-redux";

import LoginForm from "../components/forms/LoginForm";
import FormWrapper from "../layout/FormWrapper";
import Error from "../components/Error";
import Loading from "../components/Loading";

import { login } from "../actions/auth";

class LoginPage extends Component {
  onSubmit = data => {
    const { login } = this.props;

    login(data);
  };

  render() {
    const { error, loading, message } = this.props;
    return (
      <FormWrapper>
        {error && <Error error={error} />}
        {message && <p>{message}</p>}
        {loading && <Loading />}
        <LoginForm onSubmit={this.onSubmit} />
      </FormWrapper>
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
