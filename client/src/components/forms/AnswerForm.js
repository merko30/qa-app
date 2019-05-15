import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextArea";
import history from "../../config/history";

const answerSchema = Yup.object().shape({
  answer: Yup.string()
    .min(12, "Your answer should be longer than 12 characters")
    .required("Required")
});

class AnswerForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    mode: PropTypes.string,
    questionId: PropTypes.number.isRequired,
    answer: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    mode: "add"
  };

  submit = async (values, { resetForm }) => {
    const {
      handleClose,
      onSubmit,
      mode,
      questionId,
      answer,
      loggedIn
    } = this.props;
    if (loggedIn) {
      if (mode === "edit") {
        await onSubmit(questionId, answer.id, { text: values.answer });
        handleClose();
      }
      await onSubmit(questionId, { text: values.answer });
      resetForm();
    } else {
      history.push("/login");
    }
  };

  render() {
    const { answer, mode = "add" } = this.props;
    return (
      <Formik
        initialValues={{
          answer: mode === "edit" ? answer.text : ""
        }}
        validationSchema={answerSchema}
        onSubmit={this.submit}
        render={({ isSubmitting }) => {
          return (
            <Form className="d-block">
              <Field
                type="text"
                name="answer"
                placeholder="Answer the question"
                component={TextArea}
              />

              <Button variant="success" type="submit">
                {mode[0] + mode.slice(1)} answer
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

export default AnswerForm;
