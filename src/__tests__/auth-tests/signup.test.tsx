/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "utils/test-utils";
import SignUp from "pages/auth/SignupPage";
import user from "@testing-library/user-event";

describe("login component", () => {
  it("render success", () => {
    render(<SignUp />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("should render the basics fields", () => {
    render(<SignUp />);
    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirm your password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get started now/i })
    ).toBeInTheDocument();
  });

  it("Sinup button is disabled if fields are empty", () => {
    render(<SignUp />);
    const sinupButton = screen.getByRole("button", {
      name: /get started now/i,
    });
    expect(sinupButton).toHaveAttribute("disabled");
  });

  it("Sinup button  is disabled if password are out of pattern", async () => {
    render(<SignUp />);
    const firstNameField = screen.getByRole("textbox", { name: /first name/i });
    const lastNameFiled = screen.getByRole("textbox", { name: /last name/i });
    const passwordField = screen.getByPlaceholderText(/Enter your password/i);
    const confirmPasswordField = screen.getByPlaceholderText(
      /Confirm your password/i
    );
    const emailField = screen.getByRole("textbox", { name: /email/i });
    const selectPositionField = screen.getByTestId("select-role");
    const checkbox = screen.getByTestId("signup-checkbox");

    await act(async () => {
      user.type(firstNameField, "John");
      user.type(lastNameFiled, "John");
      user.selectOptions(selectPositionField, "nUser");
      user.type(emailField, "seman6745@gmail.com");
      user.type(passwordField, "123454321");
      user.type(confirmPasswordField, "123454321");
      user.click(checkbox);
    });

    const signupButton = screen.getByRole("button", {
      name: /get started now/i,
    });
    expect(signupButton).toHaveAttribute("disabled");
  });
});
