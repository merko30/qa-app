import React, { Component } from "react";
import { connect } from "react-redux";

import { register } from "../actions/auth";

import RegisterForm from "../components/forms/RegisterForm";
import FormWrapper from "../layout/FormWrapper";
import Error from "../components/Error";
import Loading from "../components/Loading";

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
