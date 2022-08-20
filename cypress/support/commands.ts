/// <reference types="cypress" />
const { login } = require("../support/cypress-utils.js");
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
interface Login {
  email: string;
  password: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      findByPlaceholder(placeholder: string): Chainable<void>;
      login(loginData?: Login): Chainable<void>;
    }
  }
}

Cypress.Commands.add("findByPlaceholder", (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add("login", (loginData?: Login) => {
  const email = "seman6745+testNovice34@gmail.com";
  const password = "Test12345";
  login(
    loginData || {
      email,
      password,
    },
    cy
  );
});

export {};
