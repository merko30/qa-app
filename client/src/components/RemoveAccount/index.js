import React from "react";
import { Button } from "react-bootstrap";
import TextField from "../TextField";
import { Field, Formik, Form } from "formik";

import * as Yup from "yup";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Required")
});

export default function RemoveAccount({ handleToggle, editable, onSubmit }) {
  return (
    <div className="mt-3 mb-2">
      {!editable ? (
        <Button variant="danger" onClick={handleToggle}>
          Delete account
        </Button>
      ) : (
        <Formik
          initialValues={{
            password: ""
          }}
          validationSchema={schema}
          onSubmit={values => {
            onSubmit(values);
            handleToggle();
          }}
          render={({ isSubmitting }) => {
            return (
              <Form className="d-block">
                <Field
                  type="password"
                  name="password"
                  placeholder="Type your password to verify"
                  component={TextField}
                />

                <Button variant="danger" type="submit" className="mr-2">
                  Delete
                </Button>
                <Button variant="warning" onClick={handleToggle}>
                  Cancel
                </Button>
              </Form>
            );
          }}
        />
      )}
    </div>
  );
}
