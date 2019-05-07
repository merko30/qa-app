import React from "react";
import { render } from "react-testing-library";

import { DetailQuestionContainer } from "../DetailQuestionContainer.js";
import renderWithRouter from "../../utils/renderWithRouter.js";

const props = {
  id: 1,
  getQuestion: jest.fn()
};

it("should call componentDidMount and getQuestion", () => {
  const cDM = jest.spyOn(
    DetailQuestionContainer.prototype,
    "componentDidMount"
  );

  render(<DetailQuestionContainer {...props} />);

  expect(cDM).toHaveBeenCalledTimes(1);
  expect(props.getQuestion).toHaveBeenCalledTimes(1);
  expect(props.getQuestion).toHaveBeenCalledWith(props.id);
});

it("should show questions", () => {
  const newProps = {
    ...props,
    question: {
      user: { name: "John Doe", id: 1 },
      text: "A question to test detail page",
      id: 1,
      createdAt: Date.now(),
      answers: []
    }
  };
  const { getByText } = renderWithRouter(
    <DetailQuestionContainer {...newProps} />
  );

  expect(getByText(newProps.question.text)).not.toBeNull();
});

it("should show error", () => {
  const newProps = {
    ...props,
    error: "Internal server error"
  };
  const { getByText } = renderWithRouter(
    <DetailQuestionContainer {...newProps} />
  );

  expect(getByText(newProps.error)).not.toBeNull();
});
