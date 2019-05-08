import React from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextField from "../TextField";
import AvatarField from "../AvatarField";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const FILE_SIZE = 1024 * 1024 * 5;

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
  avatar: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
});

export class RegisterForm extends React.Component {
  state = {
    src: ""
  };

  setSrc = src => this.setState({ src });

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
        render={({ errors, setFieldValue }) => {
          return (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Your username"
                component={TextField}
              />

              <AvatarField
                src={this.state.src}
                onChange={this.setSrc}
                errors={errors}
                setFieldValue={setFieldValue}
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
