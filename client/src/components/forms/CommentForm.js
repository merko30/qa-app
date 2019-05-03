import React from "react";
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
  onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { onSubmit, answerId, mode } = this.props;
    const editMode = mode === "edit";
    if (editMode) {
      await onSubmit(answerId, { text: values.comment });
      setSubmitting(false);
      resetForm();
    } else {
      await onSubmit(answerId, { text: values.comment });
      setSubmitting(false);
      resetForm();
    }
  };

  render() {
    const { onSubmit, comment, mode = "add" } = this.props;
    const editMode = mode === "edit";
    return (
      <Formik
        initialValues={{
          comment: editMode ? comment.text : ""
        }}
        validationSchema={commentSchema}
        onSubmit={onSubmit}
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
                {mode[0] + mode.slice(1)} Comment
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

export default CommentForm;
