/// <reference types="cypress" />

const newCharacterName = "Admin N";

Cypress.Commands.add("addCharacter", () => {
  cy.get("button").contains("Add new").click();

  cy.get('input[name="name"]').type(newCharacterName);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("deleteCharacter", () => {
  cy.get(`[aria-label="Delete ${newCharacterName} character"]`).click();
});

Cypress.Commands.add("closeDialog", () => {
  cy.get('button[aria-label="Close dialog"]').click();
});

describe("Dashboard page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:5173/dashboard");
  });

  it("Add a new character", () => {
    cy.addCharacter();
  });

  it("Delete the previously created character", () => {
    cy.deleteCharacter();
  });

  it("Try to create two identical characters", () => {
    cy.addCharacter();
    cy.addCharacter();

    cy.get("form > small").should("have.class", "text-red-600");

    //cleanup
    cy.closeDialog();
    cy.deleteCharacter();
  });

  it("Confirm that the alt option is disabled when there is no characters", () => {
    //characters list must be empty

    cy.get("button").contains("Add new").click();
    cy.get('input[name="name"]').type(newCharacterName);

    cy.get("select").get('[value="alt"]').should("be.disabled");
  });

  it("Confirm that the main option is disabled when there is 1 character or more", () => {
    cy.addCharacter();

    cy.get("button").contains("Add new").click();
    cy.get('input[name="name"]').type(newCharacterName);

    cy.get("select").get('[value="main"]').should("be.disabled");
    cy.closeDialog();

    //cleanup
    cy.deleteCharacter();
  });
});
