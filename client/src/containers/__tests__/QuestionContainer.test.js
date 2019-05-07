import React from "react";
import { render } from "react-testing-library";

import { QuestionContainer } from "../QuestionContainer.js";
import renderWithRouter from "../../utils/renderWithRouter.js";

it("should call componentDidMount and getQuestions", () => {
  const getQuestions = jest.fn();
  const cDM = jest.spyOn(QuestionContainer.prototype, "componentDidMount");

  render(<QuestionContainer getQuestions={getQuestions} />);

  expect(cDM).toHaveBeenCalledTimes(1);
  expect(getQuestions).toHaveBeenCalledTimes(1);
});

it("should show questions", () => {
  const getQuestions = jest.fn();
  const questions = [
    {
      id: 1,
      text: "question1",
      user: {
        name: "John Doe"
      },
      createdAt: Date.now(),
      answers: []
    },
    {
      id: 2,
      text: "question2",
      user: {
        name: "John Doe"
      },
      createdAt: Date.now(),
      answers: []
    }
  ];
  const { getByText, getAllByText } = renderWithRouter(
    <QuestionContainer questions={questions} getQuestions={getQuestions} />
  );

  expect(getByText("question1")).not.toBeNull();
  expect(getAllByText(/question/).length).toEqual(2);
});
