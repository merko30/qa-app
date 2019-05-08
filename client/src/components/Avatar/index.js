import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AvatarField from "../AvatarField";
import { Button } from "react-bootstrap";

const defaultImage = process.env.PUBLIC_URL + "/assets/img/default.png";

const Avatar = ({ src, onEdit, handleToggle, alt, editable }) => {
  const imageSrc =
    src === "" ? defaultImage : process.env.REACT_APP_HOST_UPLOADS + src;
  return (
    <div className="row mx-auto">
      {!editable ? (
        <div className="row mx-auto">
          <div>
            <button onClick={handleToggle}>edit</button>
            <img
              src={imageSrc}
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

                <AvatarField />

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
