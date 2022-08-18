/// <reference types="cypress" />
const { generateUser } = require("../support/generate.js");
const { signup } = require("../support/cypress-utils.js");

describe("Signup page", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env().baseUrl}/signup`);
  });

  it("should open Signup page", () => {
    cy.get(".chakra-heading").should("contain.text", "Sign Up");
  });

  it("should have possibility to read terms and policy", () => {
    cy.contains("a", "Terms and Policy").click();
    cy.contains("button", "Back").click();

    cy.get(".chakra-heading").should("contain.text", "Sign Up");
  });

  it("should allow to register a new user", () => {
    const { userFirstName, userLastName, email } = generateUser();

    signup(
      {
        firstName: userFirstName,
        lastName: userLastName,
        email: email,
        role: "nUser",
        password: "Test123454321",
      },
      cy
    );

    cy.contains("button", "Get started now").click();
    cy.contains(".chakra-toast", "User registered successfully");
  });

  it("should no ellow register with an existing email", () => {
    const { userFirstName, userLastName, email } = generateUser();
    signup(
      {
        firstName: userFirstName,
        lastName: userLastName,
        email: email,
        role: "nUser",
        password: "Test123454321",
      },
      cy
    );
    cy.contains("button", "Get started now").click();
    cy.contains(".chakra-toast", "User registered successfully");

    cy.get(".css-vczd0v").click();

    signup(
      {
        firstName: userFirstName,
        lastName: userLastName,
        email: email,
        role: "nUser",
        password: "Test123454321",
      },
      cy
    );
    cy.contains("button", "Get started now").click();
    cy.contains(
      ".chakra-toast",
      "Firebase: Error (auth/email-already-in-use)."
    );
  });

  // it("should contains login fields: email password", () => {
  //   cy.findByPlaceholder("Enter your email address");
  //   cy.findByPlaceholder("Enter your password");
  // });
  // it("should contain google login button", () => {
  //   cy.get(".css-1gh7dcb");
  // });
  // it("should contain facebook login button", () => {
  //   cy.get(".css-1e075yg");
  // });
});
