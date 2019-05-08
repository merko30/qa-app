import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Message from "../components/Message";
import Error from "../components/Error";
import { verifyEmail, verifyEmailChange } from "../actions/auth";

class VerificationPage extends React.Component {
  componentDidMount() {
    const {
      location: { search },
      verifyEmail,
      verifyEmailChange
    } = this.props;
    const queryParams = queryString.parse(search);
    if (queryParams.status.toString() === "change") {
      verifyEmailChange(queryParams.token, queryParams.email);
    } else {
      verifyEmail(queryParams.token, queryParams.email);
    }
  }
  render() {
    const { error, message } = this.props;
    return (
      <div>
        {error && <Error error={error} />}
        {message && <Message message={message} />}
      </div>
    );
  }
}

export default connect(
  ({ auth: { error, message } }) => ({ message, error }),
  { verifyEmail, verifyEmailChange }
)(VerificationPage);
