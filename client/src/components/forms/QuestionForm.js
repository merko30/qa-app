import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextArea";
import TextField from "../TextField";

const questionSchema = Yup.object().shape({
  title: Yup.string()
    .min(16, "Question title should be longer than 16 characters")
    .required("Required"),
  text: Yup.string()
    .min(25, "Question should be longer than 25 characters")
    .required("Required")
});

export default class QuestionForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    mode: PropTypes.string,
    question: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    mode: "add"
  };

  render() {
    const { onSubmit, question, mode = "add", handleClose } = this.props;
    const editMode = mode === "edit";
    return (
      <Formik
        initialValues={{
          text: editMode ? question.text : "",
          title: editMode ? question.title : ""
        }}
        validationSchema={questionSchema}
        onSubmit={async ({ text, title }) => {
          if (editMode) {
            await onSubmit(question.id, { text, title });
            handleClose();
          } else {
            await onSubmit({ text, title });
            handleClose();
          }
        }}
        render={({ isSubmitting }) => {
          return (
            <Form>
              <Field
                type="text"
                name="title"
                placeholder="Question title"
                component={TextField}
              />
              <Field
                type="text"
                name="text"
                placeholder="Your question"
                component={TextArea}
              />

              <Button variant="success" type="submit" disabled={isSubmitting}>
                {mode[0].toUpperCase() + mode.slice(1)} question
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}
