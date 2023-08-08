/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(): Chainable<() => void>;
    addCharacter(): Chainable<() => void>;
    deleteCharacter(): Chainable<() => void>;
    closeDialog(): Chainable<() => void>;
  }
}