import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextArea from "./components/TextArea";
import Button from "react-bootstrap/Button";

const answerSchema = Yup.object().shape({
  answer: Yup.string()
    .min(24, "Too Short!")
    .required("Required")
});

export default class AnswerForm extends React.Component {
  render() {
    const { onSubmit, answer, mode = "add", loggedIn, questionId } = this.props;
    return (
      <Formik
        initialValues={{
          answer: mode === "edit" ? answer : ""
        }}
        validationSchema={answerSchema}
        onSubmit={values => {
          onSubmit(questionId, { text: values.answer });
        }}
        render={({ isSubmitting }) => {
          return (
            <Form>
              <Field
                disabled={!loggedIn}
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
