import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { Button } from "react-bootstrap";

class Email extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit, editable, email, handleToggle } = this.props;
    if (editable) {
      return (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={{
            email: Yup.string()
              .email("Invalid email")
              .required("Required")
          }}
          onSubmit={values => {
            onSubmit(values);
            handleToggle();
          }}
        >
          <Form>
            <Field
              name="email"
              placeholder="Type new email"
              component={TextField}
            />
            <Button variant="light" type="submit">
              Change email
            </Button>
          </Form>
        </Formik>
      );
    } else {
      return (
        <div>
          <p className="text-uppercase">email</p>
          <li className="list-group-item">{email}</li>
          <Button variant="info" className="m-2" onClick={handleToggle}>
            Update email
          </Button>
        </div>
      );
    }
  }
}

export default Email;
