/// <reference types="cypress" />

function signup({ firstName, lastName, email, role, password }, cy) {
  cy.findByPlaceholder("Enter your First Name").type(firstName);
  cy.findByPlaceholder("Enter your Last Name").type(lastName);
  cy.findByPlaceholder("Enter your email").type(email);
  cy.get('[data-testid="select-role"]').select(role);
  cy.findByPlaceholder("Enter your password").type(password);
  cy.findByPlaceholder("Confirm your password").type(password);
  cy.get(".chakra-checkbox").click();
}

function login({ email, password }, cy) {
  cy.intercept('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBiylN50xSWKqsN9mqCVWLOYj9Bwfle_6c').as('login')
  cy.findByPlaceholder("Enter your email address").type(email);
  cy.findByPlaceholder("Enter your password").type(password);
  cy.contains("button", "Sign In").click();
  cy.wait('@login')
}

module.exports = { signup, login };