import React from "react";
import { render } from "react-testing-library";
import Answer from "../ui/Answer";
import { fireEvent } from "react-testing-library/dist";

const props = {
  answer: {
    text: "some text for the answer",
    id: 1,
    userId: 1,
    user: {
      name: "John Doe"
    },
    createdAt: Date.now(),
    comments: [],
    likes: []
  },
  questionId: 1,
  loggedIn: true
};

afterEach(() => {
  localStorage.clear();
});

it("renders the component and matches the snapshot", () => {
  const container = render(<Answer {...props} />, {});

  expect(container.firstChild).toMatchSnapshot();
});

it("should show edit and remove icons if user matches the author of the answer", () => {
  localStorage.setItem("token", "token");
  localStorage.setItem("userId", props.answer.userId);
  const { getAllByTestId } = render(<Answer {...props} />);

  // like, edit, remove icon should be there
  expect(getAllByTestId(/icon/i).length).toEqual(3);
});

it("shouldn't show like, edit and remove icon if user is not logged in", () => {
  const newProps = { ...props, loggedIn: false };

  const { queryAllByTestId } = render(<Answer {...newProps} />);

  const icons = queryAllByTestId(/icon/i);

  expect(icons.length).toEqual(0);
});

it("should show comment form when user clicks 'add comment' button", () => {
  const { getByText, getByPlaceholderText } = render(<Answer {...props} />);

  const button = getByText(/add comment/i);

  fireEvent.click(button);

  const commentInput = getByPlaceholderText(/your comment/i);

  expect(commentInput).not.toBeNull();
});
