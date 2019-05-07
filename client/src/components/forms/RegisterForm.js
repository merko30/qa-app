import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextField from "../TextField";
import FileField from "../FileField";

const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  username: Yup.string()
    .min(8, "Too short")
    .required("Required"),
  name: Yup.string().required("Required"),
  avatar: Yup.object()
    .shape({
      file: Yup.mixed().required("Avatar is required field")
    })
    .nullable()
});

export class RegisterForm extends React.Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{
          password: "",
          email: "",
          username: "",
          name: "",
          avatar: {}
        }}
        validationSchema={registerSchema}
        onSubmit={values => {
          onSubmit(values);
        }}
        render={({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Your username"
                component={TextField}
              />

              <Field
                name="avatar"
                component={FileField}
                data-testid="avatar"
                className="py-2"
              />

              <Field
                type="text"
                name="name"
                placeholder="Your name"
                component={TextField}
              />

              <Field
                type="text"
                name="email"
                placeholder="Email Address"
                component={TextField}
              />

              <Field
                type="password"
                name="password"
                placeholder="Type a password"
                component={TextField}
              />

              <Button variant="success" type="submit">
                Sign Up
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

export default RegisterForm;
