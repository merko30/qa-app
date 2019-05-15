import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextField";
import history from "../../config/history";

const commentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(12, "Your comment should be longer than 12 characters")
    .required("Required")
});

class CommentForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    answerId: PropTypes.number.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { loggedIn, onSubmit, answerId } = this.props;
    if (loggedIn) {
      await onSubmit(answerId, { text: values.comment });
      setSubmitting(false);
      resetForm();
    } else {
      history.push("/login");
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          comment: ""
        }}
        validationSchema={commentSchema}
        onSubmit={this.onSubmit}
        render={({ isSubmitting }) => {
          return (
            <Form>
              <Field
                type="text"
                name="comment"
                placeholder="Your comment"
                component={TextArea}
              />

              <Button variant="success" type="submit" disabled={isSubmitting}>
                Add Comment
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

export default CommentForm;
