const { login } = require("../support/cypress-utils.js");

describe("User profile management", () => {
  const email = "seman6745+testNovice@gmail.com";
  const password = "Test12345";

  beforeEach(() => {
    cy.visit(`${Cypress.env().baseUrl}/login`);
    login({ email, password }, cy);
 
    cy.get("#menu-button-11").click();
    cy.get("#menu-list-11-menuitem-9").click();
  });

  it("Should contain necessary tab Edit Information", () => {
    cy.contains('.chakra-tabs__tab', 'Edit Information')
  });
  it("Should contain necessary tab User Avatar", () => {
    cy.contains('.chakra-tabs__tab', 'User Avatar ')
  });
  it("Should contain necessary tab Change Password", () => {
    cy.contains('.chakra-tabs__tab', 'Change Password')
  });

  it.only("Should contain necessary tab Edit Information", () => {
    cy.get('#firstName').clear().type('test')
    cy.get('#lastName').clear().type('test')
    cy.get('#tabs-56--tabpanel-0 > .css-0 > .css-1tcp311 > .css-1f06yfw').click()
    cy.contains('button', 'Cancel').click()
    
  });
});
