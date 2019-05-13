import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import TextField from "../TextField";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be longer than 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

export class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{
          password: "",
          email: ""
        }}
        validationSchema={loginSchema}
        onSubmit={values => {
          onSubmit(values);
        }}
        render={({ isSubmitting }) => {
          return (
            <Form>
              <Field
                type="text"
                name="email"
                placeholder="Email address"
                component={TextField}
              />

              <Field
                type="password"
                name="password"
                placeholder="Your password"
                component={TextField}
              />

              <Button variant="success" type="submit">
                Sign In
              </Button>
              <Link to="/forgot" className="ml-2">
                Forgot the password ?
              </Link>
            </Form>
          );
        }}
      />
    );
  }
}

export default LoginForm;
