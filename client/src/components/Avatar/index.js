import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FileField from "../FileField";
import { Button } from "react-bootstrap";

const Avatar = ({ src, onEdit, handleToggle, alt, editable }) => {
  return (
    <div className="row mx-auto">
      {!editable ? (
        <div className="row mx-auto">
          <div>
            <button onClick={handleToggle}>edit</button>
            <img
              src={`http://localhost:5000/uploads/${src}`}
              className="rounded-circle my-2"
              alt={alt}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            avatar: {}
          }}
          validationSchema={{
            avatar: Yup.object()
              .shape({
                file: Yup.mixed().required("Avatar is required field")
              })
              .nullable()
          }}
          onSubmit={async values => {
            await onEdit(values);
            handleToggle();
          }}
          render={({ isSubmitting, setFieldValue }) => {
            return (
              <Form className="mx-auto">
                <Field
                  name="avatar"
                  component={FileField}
                  data-testid="avatar"
                  className="my-2"
                />

                <Button variant="success" type="submit" className="m-2">
                  Change image
                </Button>

                <Button variant="danger" onClick={handleToggle} type="submit">
                  Cancel
                </Button>
              </Form>
            );
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
