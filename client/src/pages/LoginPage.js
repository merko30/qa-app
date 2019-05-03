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
    const { error, loading } = this.props;
    return (
      <FormWrapper>
        <h4 className="text-warning text-weight-bold">Sign In</h4>
        {error && <Error error={error} />}
        {loading && <Loading />}
        <LoginForm onSubmit={this.onSubmit} />
      </FormWrapper>
    );
  }
}

export default connect(
  ({ auth: { loading, error } }) => ({
    loading,
    error
  }),
  { login }
)(LoginPage);
