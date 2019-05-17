import React from "react";
import PropTypes from "prop-types";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextField from "../TextField";
import AvatarField from "../AvatarField";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const FILE_SIZE = 1024 * 1024 * 5;

const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Your password should be longer than 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  username: Yup.string()
    .min(6, "Your username should be longer than 6 characters")
    .required("Required"),
  name: Yup.string()
    .min(6, "Your name should be longer than 6 characters")
    .required("Required")
  // avatar: Yup.mixed()
  //   .test("fileSize", "File is too large", value => {
  //     return value && value.size >= FILE_SIZE;
  //   })
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     value => value && SUPPORTED_FORMATS.includes(value.type)
  //   )
});

export class RegisterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

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
            <div className="jumbotron">
              <h1 className="display-6">Sign up today</h1>
              <hr className="my-3" />
              <Form>
                <AvatarField
                  src={this.state.src}
                  onChange={this.setSrc}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />

                <Field
                  type="text"
                  name="username"
                  placeholder="Your username"
                  component={TextField}
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
            </div>
          );
        }}
      />
    );
  }
}

export default RegisterForm;
