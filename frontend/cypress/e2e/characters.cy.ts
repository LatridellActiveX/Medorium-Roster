/// <reference types="cypress" />
import "../support/commands";

const defaultCharacterName = "Admin N";
const defaultRankName = "Rank N";
const defaultPayGrade = "80";

Cypress.Commands.add("openEditModal", () => {
  cy.get(
    `button[aria-label="Edit ${defaultCharacterName} character"]`
  ).click();
});
Cypress.Commands.add("submitEdit", () => {
  cy.get(`form[id="Edit ${defaultCharacterName}"] button`)
  .should("contain.text", "Submit")
  .click();
});

describe("Characters", () => {
  beforeEach("Environment setup", () => {
    cy.login();

    cy.visit("http://localhost:5173/roster");
  });

  it("Add a character", () => {
    //add a character for future manipulations
    cy.visit("http://localhost:5173/dashboard");
    cy.addCharacter();
    cy.addCharacter(false, 'Admin 2N');
  });

  it("Edit character rank", () => {
    cy.openEditModal();
    cy.get("#rank").type(defaultRankName);
    cy.submitEdit();

    cy.get(`p`).should("contain.text", defaultRankName);
  });

  it('Check if the main option is disabled if there is already a main character', () => {
    cy.openEditModal();
    cy.get('select[name="main"]').find('option:disabled').should('have.text', 'main');
  })

  it('Cleanup', () => {
    cy.deleteCharacter();
    cy.deleteCharacter('Admin 2N');
  });
});
