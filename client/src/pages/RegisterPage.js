import React, { Component } from "react";
import { connect } from "react-redux";

import RegisterForm from "../components/forms/RegisterForm";
import Error from "../components/ui/Error";

import { register } from "../actions/auth";
import FormWrapper from "../components/layout/FormWrapper";
import Loading from "../components/ui/Loading";

class RegisterPage extends Component {
  onSubmit = data => {
    const { register } = this.props;
    register(data);
  };

  render() {
    const { error, loading } = this.props;
    return (
      <FormWrapper>
        <h4 className="text-warning text-weight-bold">Sign In</h4>
        {error && <Error error={error} />}
        {loading && <Loading />}
        <RegisterForm onSubmit={this.onSubmit} />
      </FormWrapper>
    );
  }
}

export default connect(
  ({ auth: { loading, error } }) => ({ loading, error }),
  { register }
)(RegisterPage);
