import React from "react";

import renderWithRouter from "../../utils/renderWithRouter";

import Question from "../ui/Question";

const props = {
  question: {
    text: "some fake question here",
    createdAt: Date.now(),
    id: 1,
    user: { name: "John Doe" },
    answers: [],
    userId: 1
  },
  loggedIn: true
};

afterEach(() => {
  localStorage.clear();
});

it("renders the component and matches the snapshot", () => {
  const container = renderWithRouter(<Question {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it("should show edit, remove icon if user is logged in and matches the author of the question", () => {
  localStorage.setItem("token", "token");
  localStorage.setItem("userId", props.question.userId);

  const { getAllByTestId } = renderWithRouter(<Question {...props} />);

  const icons = getAllByTestId(/icon/i);

  expect(icons.length).toEqual(2);
});

it("shouldn't show any icons if user is not logged in", () => {
  const newProps = { ...props, loggedIn: false };
  const { queryAllByTestId } = renderWithRouter(<Question {...newProps} />);

  const icons = queryAllByTestId(/icon/i);

  expect(icons.length).toEqual(0);
});
