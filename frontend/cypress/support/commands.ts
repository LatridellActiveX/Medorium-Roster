/// <reference types="cypress" />

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

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<() => void>;
      addCharacter(isMain?: boolean): Chainable<() => void>;
      deleteCharacter(): Chainable<() => void>;
      closeDialog(): Chainable<() => void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit("http://localhost:5173/login");

  cy.get('a[href*="/login"]').click();
  
  cy.get('input[name="username"]').type("useruser11");
  cy.get('input[name="password"]').type("user1user1");
  cy.get('button[type="submit"]').click();
})