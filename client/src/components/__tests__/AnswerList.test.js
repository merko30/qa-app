import React from "react";
import { render } from "react-testing-library";

import AnswerList from "../ui/AnswerList";

it("renders the component and matches the snapshot", () => {
  const props = {
    answers: [
      {
        text: "answer1",
        id: 1,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      },
      {
        text: "answer2",
        id: 2,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      },
      {
        text: "answer3",
        id: 3,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      }
    ]
  };

  const container = render(<AnswerList {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

it("renders the right number of answers", () => {
  const props = {
    answers: [
      {
        text: "answer1",
        id: 1,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      },
      {
        text: "answer2",
        id: 2,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      },
      {
        text: "answer3",
        id: 3,
        user: { name: "John Doe" },
        createdAt: Date.now(),
        comments: [],
        likes: []
      }
    ]
  };

  const { getAllByText } = render(<AnswerList {...props} />);

  const answers = getAllByText(/answer/i);

  expect(answers.length).toEqual(3);
});
