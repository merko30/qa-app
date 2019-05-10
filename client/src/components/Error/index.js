import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default function Error({ error }) {
  return (
    <Alert variant="danger" className="my-2">
      {error}
    </Alert>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired
};
