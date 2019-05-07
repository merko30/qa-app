import React from "react";

import renderWithRouter from "../../utils/renderWithRouter";

import QuestionList from "../ui/QuestionList";

it("renders the component and matches the snapshot", () => {
  const props = {
    questions: [
      {
        text: "question1",
        id: 1,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      },
      {
        text: "question2",
        id: 2,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      },
      {
        text: "question3",
        id: 3,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      }
    ]
  };

  const container = renderWithRouter(<QuestionList {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

it("renders the right number of questions", () => {
  const props = {
    questions: [
      {
        text: "question1",
        id: 1,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      },
      {
        text: "question2",
        id: 2,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      },
      {
        text: "question3",
        id: 3,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        answers: []
      }
    ]
  };

  const { getAllByText } = renderWithRouter(<QuestionList {...props} />);

  const questions = getAllByText(/question/i);

  expect(questions.length).toEqual(3);
});
