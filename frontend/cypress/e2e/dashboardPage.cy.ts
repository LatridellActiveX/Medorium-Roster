/// <reference types="cypress" />
import "../support/commands";

const newCharacterName = "Admin N";

Cypress.Commands.add("addCharacter", (isMain = true) => {
  cy.get("button").contains("Add new").click();

  cy.get('input[name="name"]').type(newCharacterName);
  cy.get("select").select(isMain ? "main" : "alt");
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("deleteCharacter", () => {
  cy.get(`[aria-label="Delete ${newCharacterName} character"]`).click();
});

Cypress.Commands.add("closeDialog", () => {
  cy.get('button[aria-label="Close dialog"]').click();
});

describe("Dashboard page", () => {
  beforeEach('Environment setup', () => {
    cy.login();

    cy.visit("http://localhost:5173/dashboard"); //cy.visit(dashboard) does not work without cy.get(a/dashboard).click() 0_0
    cy.get('a[href*="/dashboard"]').click();
  });

  it("Add a new character", () => {
    cy.addCharacter();
  });

  it("Delete the previously created character", () => {
    cy.deleteCharacter();
  });

  it("Try to create two identical characters", () => {
    cy.addCharacter(false);
    cy.addCharacter(false);

    cy.get("form > small").should("have.class", "text-red-600");

    //cleanup
    cy.closeDialog();
    cy.deleteCharacter();
  });

  it("Confirm that the main option is disabled when there is a main character", () => {
    cy.addCharacter();

    cy.get("button").contains("Add new").click();
    cy.get('input[name="name"]').type(newCharacterName);

    cy.get("select").get('[value="main"]').should("be.disabled");
    cy.closeDialog();

    //cleanup
    cy.deleteCharacter();
  });
});
