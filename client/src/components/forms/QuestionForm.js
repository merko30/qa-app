import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextField";

const questionSchema = Yup.object().shape({
  question: Yup.string()
    .min(16, "Question should be longer than 16 characters")
    .required("Required")
});

export default class QuestionForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    mode: PropTypes.string,
    question: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }),
    handleClose: PropTypes.func.isRequired
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
          question: editMode ? question.text : ""
        }}
        validationSchema={questionSchema}
        onSubmit={async values => {
          if (editMode) {
            await onSubmit(question.id, { text: values.question });
            handleClose();
          } else {
            await onSubmit({ text: values.question });
            handleClose();
          }
        }}
        render={({ isSubmitting }) => {
          return (
            <Form>
              <Field
                type="text"
                name="question"
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
