import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import TextField from "../TextField";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  username: Yup.string()
    .min(8, "Too short")
    .required("Required"),
  name: Yup.string().required("Required")
});

class UserInfo extends Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired
  };

  render() {
    const initialValues = Object.entries(this.props.data).map(item => {
      return [[item[0]], item[1]];
    });
    const items = Object.fromEntries(initialValues);
    const { editable, data, onEdit, handleToggle } = this.props;
    return (
      <div>
        {!editable ? (
          <div>
            <ul className="list-group">
              {Object.entries(items).map(item => {
                return (
                  <li className="list-group-item" key={item[0]}>
                    {item[0][0].toUpperCase() + item[0].slice(1)}: {item[1]}
                  </li>
                );
              })}
            </ul>
            <Button variant="info" className="m-2" onClick={handleToggle}>
              Update info
            </Button>
          </div>
        ) : (
          <Formik
            initialValues={items}
            validationSchema={schema}
            onSubmit={async values => {
              await onEdit(values);
              handleToggle();
            }}
            render={({ isSubmitting }) => {
              return (
                <Form className="d-block">
                  {Object.entries(data).map(item => {
                    return (
                      <Field
                        key={item[0]}
                        type="text"
                        name={item[0]}
                        placeholder={`Edit ${item[0]}`}
                        component={TextField}
                      />
                    );
                  })}

                  <Button variant="success" className="m-2" type="submit">
                    Edit
                  </Button>

                  <Button variant="info" onClick={handleToggle}>
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
}

export default UserInfo;
