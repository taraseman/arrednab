/// <reference types="cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env().baseUrl}/login`);
    cy.login();
  });

  it("Should render component", () => {
    cy.contains("h2", "Articles Dashboard");
  });
  it("Should contain search field", () => {
    cy.findByPlaceholder("Find articles...");
  });
  it("Should contain filter by category", () => {
    cy.get('[data-testid="dashbord-select-category"]');
  });
  it("Should filter by category", () => {
    const selectCategory = "science";
    cy.get('[data-testid="dashbord-select-category"]').select(selectCategory);
    cy.contains(
      ":nth-child(2) > .css-1tke83q > .css-uvy7q4 > .css-cjl653",
      selectCategory.toUpperCase()
    );
    cy.contains(
      ":nth-child(3) > .css-1tke83q > .css-uvy7q4 > .css-cjl653",
      selectCategory.toUpperCase()
    );
  });
  it("Should find by search", () => {
    const searchTerm = "test";
    cy.findByPlaceholder("Find articles...").type(searchTerm);
    cy.contains("p", searchTerm);
  });
});
