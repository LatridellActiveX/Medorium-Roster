/// <reference types="cypress" />
import "../support/commands";
import "cypress-real-events";

describe("Access code", () => {
  it("Full use", () => {
    cy.login();
    // cy.visit("http://localhost:5173/adminPanel");

    // let regLink: string = "";
    // cy.get("button").contains("Request registration code").realClick();
    // cy.get('textarea[id="regCode"]').should(
    //   "contain.text",
    //   "/registration?accessCode="
    // );
    // cy.get('textarea[id="regCode"]')
    //   .invoke("text")
    //   .then((val) => {
    //     regLink = String(val);
    //   });

    // cy.then(() => {
    //   cy.logOut();

    //   cy.visit(regLink);
    //   cy.get("h1").should("have.text", "Registration");

    //   cy.get('input[name="username"]').type(
    //     Math.random().toString().slice(2, 15)
    //   );
    //   cy.get('input[name="password"]').type("password");
    //   cy.get('button[type="submit"]').click();
      
    //   cy.url().should("not.contain", "registration");
    // });
  });
});
