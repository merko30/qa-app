import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextField from "./components/TextField";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

export default class MyForm extends React.Component {
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
            </Form>
          );
        }}
      />
    );
  }
}
