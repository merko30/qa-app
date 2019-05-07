import React from "react";

import { render, fireEvent, wait } from "react-testing-library";
import QuestionForm from "../forms/QuestionForm";

it("should call onSubmit and close the modal", async () => {
  const props = {
    onSubmit: jest.fn(),
    handleClose: jest.fn(),
    mode: "add"
  };
  const question = "Question longer than 24 characters";

  const { getByText, getByPlaceholderText } = render(
    <QuestionForm {...props} />
  );

  const questionInput = getByPlaceholderText(/your question/i);
  const button = getByText(/add question/i);

  fireEvent.change(questionInput, { target: { value: question } });

  fireEvent.submit(button);

  await wait();

  expect(props.onSubmit).toHaveBeenCalled();
  expect(props.handleClose).toHaveBeenCalled();
  expect(props.onSubmit).toHaveBeenCalledWith({ text: question });
});

it("should show error message if question is shorter than 24 characters", async () => {
  const props = {
    onSubmit: jest.fn(),
    handleClose: jest.fn(),
    mode: "add"
  };
  const question = "too short";

  const { getByText, getByPlaceholderText } = render(
    <QuestionForm {...props} />
  );

  const questionInput = getByPlaceholderText(/your question/i);
  const button = getByText(/add question/i);

  fireEvent.change(questionInput, { target: { value: question } });

  fireEvent.submit(button);

  await wait();

  expect(props.onSubmit).not.toHaveBeenCalled();
  expect(props.handleClose).not.toHaveBeenCalled();
  expect(getByText(/too short/i)).not.toBeNull();
});

it("should set input value to passed question prop if editMode is true", async () => {
  const props = {
    onSubmit: jest.fn(),
    handleClose: jest.fn(),
    mode: "edit",
    question: {
      text: "Valid question to test stuff"
    }
  };

  const { getByPlaceholderText } = render(<QuestionForm {...props} />);

  const questionInput = getByPlaceholderText(/your question/i);

  expect(questionInput.value).toBe(props.question.text);
});
