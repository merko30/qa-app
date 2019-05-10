import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { Button } from "react-bootstrap";

class ForgotPasswordForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={{
          email: Yup.string()
            .email("Invalid email")
            .required("Required")
        }}
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
