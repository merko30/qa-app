import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextArea from "./components/TextArea";
import Button from "react-bootstrap/Button";

const questionSchema = Yup.object().shape({
  question: Yup.string()
    .min(24, "Too Short!")
    .required("Required")
});

export default class QuestionForm extends React.Component {
  render() {
    const { onSubmit, question, mode = "add", handleClose } = this.props;
    return (
      <Formik
        initialValues={{
          question: mode === "edit" ? question : ""
        }}
        validationSchema={questionSchema}
        onSubmit={async values => {
          await onSubmit({ text: values.question });
          handleClose();
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
                {mode[0] + mode.slice(1)} question
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}
