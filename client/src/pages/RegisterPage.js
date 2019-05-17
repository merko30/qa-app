import React, { Component } from "react";
import { connect } from "react-redux";

import { register } from "../actions/auth";

import RegisterForm from "../components/forms/RegisterForm";
import FormWrapper from "../layout/FormWrapper";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Message from "../components/Message";

class RegisterPage extends Component {
  onSubmit = data => {
    const { register } = this.props;
    register(data);
  };

  render() {
    const { error, loading, message } = this.props;
    return (
      <FormWrapper>
        {error && <Error error={error} />}
        {message && <Message message={message} />}
        {loading && <Loading />}
        <RegisterForm onSubmit={this.onSubmit} />
      </FormWrapper>
    );
  }
}

export default connect(
  ({ auth: { loading, error, message } }) => ({ loading, error, message }),
  { register }
)(RegisterPage);
