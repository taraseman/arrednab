/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "utils/test-utils";
import Login from "pages/auth/LoginPage";
import user from '@testing-library/user-event';


describe("login component", () => {
  it("render success", () => {
    render(<Login />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });
  it("should render the basics fields", () => {
    render(<Login />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
  it("login button is disabled if fields are empty", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /sign in/i });
    expect(loginButton).toHaveAttribute("disabled");
  });
  it("login button is active if fields are filled", async() => {
    render(<Login />);
    const passwordField = screen.getByPlaceholderText(/Enter your password/i);
    const emailField = screen.getByPlaceholderText(/enter your email address/i);

    await act( async () => {
      user.type(emailField, 'seman6745@gmail.com');
      user.type(passwordField, '12345678');
     });
  
    const loginButton = screen.getByRole("button", { name: /sign in/i });
      expect(loginButton).not.toHaveAttribute("disabled");
  });
});

