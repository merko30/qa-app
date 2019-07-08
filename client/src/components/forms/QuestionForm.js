import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";

import TextArea from "../TextArea";
import TextField from "../TextField";

import Select from "react-select";

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

  state = {
    options: []
  };

  async componentDidMount() {
    const { tags } = await (await fetch("/api/tags", {
      headers: {
        "Content-type": "application/json"
      },
      method: "GET"
    })).json();

    this.setState({
      options: tags.map(tag => ({ label: tag.name, value: tag.id }))
    });
  }

  onSelectChange = (values, setField) => {
    setField("tags", values.map(v => v.value));
  };

  render() {
    const { options } = this.state;
    const { onSubmit, question, mode = "add", handleClose } = this.props;
    const editMode = mode === "edit";
    return (
      <Formik
        initialValues={{
          text: editMode ? question.text : "",
          title: editMode ? question.title : ""
        }}
        validationSchema={questionSchema}
        onSubmit={async values => {
          if (editMode) {
            await onSubmit(question.id, values);
            handleClose();
          } else {
            await onSubmit(values);
            handleClose();
          }
        }}
        render={({ isSubmitting, setFieldValue }) => {
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

              <Select
                options={options}
                isMulti={true}
                onChange={values => this.onSelectChange(values, setFieldValue)}
                className="my-2"
                placeholder="Select tags..."
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
