import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { Button } from "react-bootstrap";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be longer than 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirm is required")
});

class ResetPasswordForm extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit, token } = this.props;
    return (
      <Formik
        initialValues={{ confirmPassword: "", password: "" }}
        validationSchema={schema}
        onSubmit={values => {
          onSubmit(token, { password: values.password });
        }}
      >
        <Form>
          <Field
            name="password"
            type="password"
            placeholder="New password"
            component={TextField}
          />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            component={TextField}
          />
          <Button variant="light" type="submit">
            Reset password
          </Button>
        </Form>
      </Formik>
    );
  }
}

export default ResetPasswordForm;
