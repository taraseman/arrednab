/// <reference types="cypress" />

describe("Login page", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env().baseUrl}/login`);
  });

  it("should open login page", () => {
    cy.get(".chakra-heading").should("contain.text", "Welcome back");
  });

  it("should have posibillity to go to recovery password page", () => {
   
    cy.contains('a', 'Forgot Password')
    .should('have.attr', 'href', '/password-recovery')
  });

  it("should have posibillity to go to signup page", () => {
    cy.contains('a', `Don't have an account? Sign Up`)
    .should('have.attr', 'href', '/signup')
  });

  it("should contains login fields: email password", () => {
    cy.findByPlaceholder("Enter your email address");
    cy.findByPlaceholder("Enter your password");
  });
  it("should contain google login button", () => {
    cy.get(".css-1gh7dcb");
  });
  it("should contain facebook login button", () => {
    cy.get(".css-1e075yg");
  });
  it("test login", () => {
    const email = "seman6745+testNovice34@gmail.com";
    const password = "Test12345";
    cy.findByPlaceholder("Enter your email address")
    .type(email);
    cy.findByPlaceholder("Enter your password")
    .type(password);
    cy.contains('button', 'Sign In').click()
    cy.contains('.chakra-heading', 'Articles Dashboard')
  });
});
