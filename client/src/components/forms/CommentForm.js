import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextField";

const commentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(10, "Too Short!")
    .required("Required")
});

class CommentForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    answerId: PropTypes.number.isRequired
  };

  onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { onSubmit, answerId } = this.props;
    await onSubmit(answerId, { text: values.comment });
    setSubmitting(false);
    resetForm();
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
