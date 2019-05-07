import React from "react";
import { render, fireEvent, wait, act } from "react-testing-library";

import { RegisterForm } from "../forms/RegisterForm";
// import renderWithRouter from "../../utils/renderWithRouter.js";

it("should call onSubmit when button is clicked", async () => {
  const onSubmit = jest.fn();
  const data = {
    email: "valid@email.com",
    password: "password",
    name: "Didier Drogba",
    username: "didierdrogba",
    file: new File([""], "image.png")
  };

  const { getByText, getByPlaceholderText, getByTestId } = render(
    <RegisterForm onSubmit={onSubmit} />
  );

  const button = getByText("Sign Up");
  const emailInput = getByPlaceholderText(/email/i);
  const passwordInput = getByPlaceholderText(/password/i);
  const usernameInput = getByPlaceholderText(/username/i);
  const nameInput = getByPlaceholderText(/your name/i);
  const avatarInput = getByTestId(/avatar/i);

  fireEvent.change(emailInput, { target: { value: data.email } });
  fireEvent.change(passwordInput, { target: { value: data.password } });
  fireEvent.change(nameInput, { target: { value: data.name } });
  fireEvent.change(usernameInput, { target: { value: data.username } });
  act(() => {
    fireEvent.change(avatarInput, { target: { files: [data.file] } });
  });

  await wait();

  await fireEvent.click(button);

  await wait();

  expect(onSubmit).toHaveBeenCalledTimes(1);
});

it("should call onSubmit when button is clicked", async () => {
  const onSubmit = jest.fn();
  const data = {
    email: "valid@email.com",
    password: "password",
    name: "Didier Drogba",
    username: "didierdrogba",
    file: new File([""], "image.png")
  };

  const { getByText, getByPlaceholderText, getAllByText } = render(
    <RegisterForm onSubmit={onSubmit} />
  );

  const button = getByText("Sign Up");
  const passwordInput = getByPlaceholderText(/password/i);
  const usernameInput = getByPlaceholderText(/username/i);
  const nameInput = getByPlaceholderText(/your name/i);

  fireEvent.change(passwordInput, { target: { value: data.password } });
  fireEvent.change(nameInput, { target: { value: data.name } });
  fireEvent.change(usernameInput, { target: { value: data.username } });

  await wait();

  await fireEvent.click(button);

  await wait();

  // email and avatar are required
  expect(getAllByText(/required/i).length).toEqual(2);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});
