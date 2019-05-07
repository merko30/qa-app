import React from "react";
import { render, fireEvent, wait } from "react-testing-library";

import { LoginForm } from "../forms/LoginForm";
import renderWithRouter from "../../utils/renderWithRouter.js";

it("should call onSubmit when button is clicked", async () => {
  const onSubmit = jest.fn();
  const data = {
    email: "email@email.com",
    password: "password"
  };

  const { getByText, getByPlaceholderText } = render(
    <LoginForm onSubmit={onSubmit} />
  );

  const button = getByText("Sign In");
  const emailInput = getByPlaceholderText(/email/i);
  const passwordInput = getByPlaceholderText(/password/i);

  fireEvent.change(emailInput, { target: { value: data.email } });
  fireEvent.change(passwordInput, { target: { value: data.password } });

  fireEvent.click(button);

  await wait();

  expect(onSubmit).toHaveBeenCalledTimes(1);
});

it("shouldn't call onSubmit if email is invalid", async () => {
  const onSubmit = jest.fn();
  const data = {
    email: "invalidemail",
    password: "password"
  };

  const { getByText, getByPlaceholderText } = renderWithRouter(
    <LoginForm onSubmit={onSubmit} />
  );

  const button = getByText("Sign In");
  const emailInput = getByPlaceholderText(/email/i);
  const passwordInput = getByPlaceholderText(/password/i);

  fireEvent.change(emailInput, { target: { value: data.email } });
  fireEvent.change(passwordInput, { target: { value: data.password } });

  fireEvent.click(button);

  await wait();

  expect(onSubmit).toHaveBeenCalledTimes(0);
  // there should be error message "Invalid email"
  expect(getByText(/invalid/i)).not.toBeNull();
});
