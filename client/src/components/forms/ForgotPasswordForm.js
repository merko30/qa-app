import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { Button } from "react-bootstrap";

class ForgotPasswordForm extends Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{ email: "" }}
        onSubmit={values => {
          onSubmit(values.email);
        }}
      >
        <Form>
          <Field
            name="email"
            placeholder="Email to send reset password link"
            component={TextField}
          />
          <Button variant="light" type="submit">
            Send link
          </Button>
        </Form>
      </Formik>
    );
  }
}

export default ForgotPasswordForm;
