/// <reference types="cypress" />
import "../support/commands";

/**LATRIDELL - Test cases */

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
    cy.visit("http://localhost:5173/");
    cy.addCharacter();
  });

  it("Edit character rank", () => {
    cy.openEditModal();
    cy.get("#rank").type(defaultRankName);
    cy.submitEdit();

    cy.get(`p`).should("contain.text", defaultRankName);
  });

  it('Cleanup', () => {
    cy.deleteCharacter();
  });
});
