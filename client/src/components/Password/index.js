import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextField from "../TextField";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be longer than 8 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, "New password should be longer than 8 characters")
    .required("Password is required")
});

class Password extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit, editable, handleToggle } = this.props;
    return (
      <Formik
        initialValues={{
          password: "",
          newPassword: ""
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.resetForm();
          handleToggle();
        }}
        render={({ isSubmitting }) => {
          return (
            <div className="my-2">
              {editable ? (
                <Form>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Your password"
                    component={TextField}
                  />
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    component={TextField}
                  />
                  <Button variant="warning" type="submit" className="mr-2">
                    Reset password
                  </Button>
                  <Button variant="info" onClick={handleToggle}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <div>
                  <Button onClick={handleToggle}>Update password</Button>
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }
}

export default Password;
