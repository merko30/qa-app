import React, { Component } from "react";
import { LoginForm } from "../components/forms";

import { connect } from "react-redux";

import { login } from "../actions/auth";
import Error from "../components/ui/Error";
import Loading from "../components/ui/Loading";
import FormWrapper from "../components/layout/FormWrapper";

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
