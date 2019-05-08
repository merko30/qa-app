import React from "react";
import Alert from "react-bootstrap/Alert";

export default function Message({ message }) {
  return (
    <Alert variant="info" className="my-2">
      {message}
    </Alert>
  );
}
