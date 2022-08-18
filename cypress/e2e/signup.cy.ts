/// <reference types="cypress" />
const { generateUser } = require("../support/generate.js");

describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should open Signup page", () => {
    cy.get(".chakra-heading").should("contain.text", "Sign Up");
  });

  it("should allow to register a new user", () => {
    const { userFirstName, userLastName, email } = generateUser();

    cy.findByPlaceholder("Enter your First Name").type(userFirstName);
    cy.findByPlaceholder("Enter your Last Name").type(userLastName);
    cy.findByPlaceholder("Enter your email").type(email);
    cy.get('[data-testid="select-role"]').select("nUser");

    cy.findByPlaceholder("Enter your password").type("Test12345");
    cy.findByPlaceholder("Confirm your password").type("Test12345");
    cy.get(".chakra-checkbox").click();

    cy.contains("button", "Get started now").click();

    cy.contains(".chakra-toast", "User registered successfully");

    // cy.url()
    // .should('equl', Cypress.config().baseUrl + '/login')

    //https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBiylN50xSWKqsN9mqCVWLOYj9Bwfle_6c
  });

  it("should no ellow register with an existing email", () => {
    const { userFirstName, userLastName, email } = generateUser();

    cy.findByPlaceholder("Enter your First Name").type(userFirstName);
    cy.findByPlaceholder("Enter your Last Name").type(userLastName);
    cy.findByPlaceholder("Enter your email").type(email);
    cy.get('[data-testid="select-role"]').select("nUser");
    cy.findByPlaceholder("Enter your password").type("Test12345");
    cy.findByPlaceholder("Confirm your password").type("Test12345");
    cy.get(".chakra-checkbox").click();
    cy.contains("button", "Get started now").click();
    cy.contains(".chakra-toast", "User registered successfully");

    cy.get(".css-vczd0v").click();

    cy.findByPlaceholder("Enter your First Name").type(userFirstName + "n");
    cy.findByPlaceholder("Enter your Last Name").type(userLastName + "n");
    cy.findByPlaceholder("Enter your email").type(email);
    cy.get('[data-testid="select-role"]').select("nUser");
    cy.findByPlaceholder("Enter your password").type("Test12345");
    cy.findByPlaceholder("Confirm your password").type("Test12345");
    cy.get(".chakra-checkbox").click();
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
