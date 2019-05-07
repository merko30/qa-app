import React from "react";
import { render, fireEvent, wait } from "react-testing-library";

import AnswerForm from "../forms/AnswerForm";

it("should call onSubmit", async () => {
  const props = {
    onSubmit: jest.fn(),
    questionId: 1,
    mode: "add"
  };
  const answer = "Answer longer than 24 characters";

  const { getByText, getByPlaceholderText } = render(<AnswerForm {...props} />);

  const answerInput = getByPlaceholderText(/answer the question/i);
  const button = getByText(/add answer/i);

  fireEvent.change(answerInput, { target: { value: answer } });

  fireEvent.submit(button);

  await wait();

  expect(props.onSubmit).toHaveBeenCalled();
  expect(props.onSubmit).toHaveBeenCalledWith(props.questionId, {
    text: answer
  });
  expect(answerInput.value).toEqual("");
});

it("shouldn't call onSubmit if answer is too short", async () => {
  const props = {
    onSubmit: jest.fn(),
    questionId: 1,
    mode: "add"
  };
  const answer = "answer";

  const { getByText, getByPlaceholderText } = render(<AnswerForm {...props} />);

  const answerInput = getByPlaceholderText(/answer the question/i);
  const button = getByText(/add answer/i);

  fireEvent.change(answerInput, { target: { value: answer } });

  fireEvent.submit(button);

  await wait();

  expect(props.onSubmit).not.toHaveBeenCalled();
  expect(getByText(/too short/i)).not.toBeNull();
});

it("should fill the input if editMode, call onSubmit, handleClose", async () => {
  const props = {
    onSubmit: jest.fn(),
    handleClose: jest.fn(),
    questionId: 1,
    mode: "edit",
    answer: {
      id: 1,
      text: "a valid answer to test stuff if working"
    }
  };
  const { getByText, getByPlaceholderText } = render(<AnswerForm {...props} />);

  const answerInput = getByPlaceholderText(/answer the question/i);
  const button = getByText(/edit answer/i);

  expect(answerInput.value).toEqual(props.answer.text);
  expect(button.textContent).toMatch(/edit answer/i);

  fireEvent.submit(button);

  await wait();

  expect(props.onSubmit).toHaveBeenCalled();
  expect(props.onSubmit).toHaveBeenCalledWith(
    props.questionId,
    props.answer.id,
    { text: props.answer.text }
  );
});
