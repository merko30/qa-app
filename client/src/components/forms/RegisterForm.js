import React from "react";
import PropTypes from "prop-types";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import "../../app.css";

import MyModal from "../../layout/Modal";
import TextField from "../TextField";
import AvatarField from "../AvatarField";

import getBase64 from "../../utils/getBase64";

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
});

export class RegisterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    imageSrc: null,
    crop: { x: 0, y: 0 },
    showCropModal: false,
    croppedImage: null
  };

  setCroppedImage = croppedImage => {
    this.setState({ croppedImage });
  };

  toggleModal = () => {
    this.setState({ showCropModal: !this.state.showCropModal });
  };

  setImage = imageSrc => {
    this.setState({ imageSrc });
  };

  handleChange = e => {
    if (e.target.files.length > 0) {
      getBase64(e.target.files[0], this.setImage);
      this.setState({ showCropModal: true });
      // allows to use change to same image
      e.target.value = "";
    }
  };

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
        render={({ errors, setFieldValue, values: { avatar } }) => {
          return (
            <div>
              <h1 className="display-6">Sign up today</h1>
              <hr className="my-3" />
              <Form>
                {this.state.croppedImage && (
                  <img
                    src={URL.createObjectURL(this.state.croppedImage)}
                    alt="example"
                    className="rounded-circle my-3"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={this.handleChange}
                />

                <MyModal
                  handleClose={this.toggleModal}
                  show={this.state.showCropModal}
                >
                  <AvatarField
                    setFieldValue={setFieldValue}
                    src={this.state.imageSrc}
                    setImage={this.setImage}
                    setCroppedImage={this.setCroppedImage}
                  />
                </MyModal>

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
