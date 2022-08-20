/// <reference types="cypress" />

describe("User profile management", () => {
  const email = "seman6745+testNovice34@gmail.com";
  const password = "Test12345";

  beforeEach(() => {
    cy.visit(`${Cypress.env().baseUrl}/login`);
    cy.login();

    cy.get('[data-testid="menu-button-header"]').click();
    cy.get('[data-testid="menu-button-edit-option"]').click();
  });

  it("Should contain necessary tab Edit Information", () => {
    cy.contains(".chakra-tabs__tab", "Edit Information");
  });
  it("Should contain necessary tab User Avatar", () => {
    cy.contains(".chakra-tabs__tab", "User Avatar ");
  });
  it("Should contain necessary tab Change Password", () => {
    cy.contains(".chakra-tabs__tab", "Change Password");
  });

  it("Should have posibilitty to change personal info", () => {
    cy.get("#firstName").clear().type("test");
    cy.get("#lastName").clear().type("test");
    cy.get('[data-testid="edit-user-info-save"]').click();

    cy.get('[data-testid="edit-user-info-cancel"]').click();
    cy.contains("#menu-button-11", "test test");
  });

  it("Should have posibilitty to change only one field", () => {
    cy.get("#firstName").clear().type("ivan");
    cy.get('[data-testid="edit-user-info-save"]').click();
    cy.get('[data-testid="edit-user-info-cancel"]').click();

    cy.contains("#menu-button-11", "ivan test");
  });

  it("Should have posibilitty to change password", () => {
    const newPassword = "Test123456";

    cy.contains("button", "Change Password").click();
    cy.findByPlaceholder("Old Password").type("Test12345");
    cy.findByPlaceholder("New Password").type(newPassword);
    cy.findByPlaceholder("Confirm your Password").type(newPassword);

    cy.get('[data-testid="edit-user-password-save"]').click();
    cy.get('[data-testid="edit-user-password-cancel"]').click();
    cy.get(".css-ohcjdv > .chakra-button").click();

    cy.login({ email, password: newPassword });
    cy.get('[data-testid="menu-button-header"]').click();
    cy.get('[data-testid="menu-button-edit-option"]').click();

    cy.contains("button", "Change Password").click();
    cy.findByPlaceholder("Old Password").type(newPassword);
    cy.findByPlaceholder("New Password").type(password);
    cy.findByPlaceholder("Confirm your Password").type(password);

    cy.get('[data-testid="edit-user-password-save"]').click();
    cy.contains(".chakra-toast", "Password updated successfully");
  });
});
