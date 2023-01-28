/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/// <reference types="cypress" />
import "cypress-xpath";
import { baseUrl } from "../../pages/BasePage.js";
import BasePage from "../../pages/BasePage.js";

describe("Access Page From URL", () => {
  // beforeEach(() => {
  //   cy.visit(baseUrl);
  // });

  it("check root url without any params", () => {
    cy.visit(baseUrl);
    cy.get('.agent-button').click()
    cy.get("#agence0").should('not.have.text', '');
    cy.get('.message-button').should('contain.text',0)
    cy.get("#bottom-view").should('not.exist');
  });

  it("check realtors are loaded", () => {
    cy.visit(baseUrl+"realtors");
    cy.get('.agent-button').click()
    cy.get("#agence0").should('not.have.text', '');
    cy.get('.message-button').should('contain.text',0)
    cy.get(".home-view > .drawer-container").should('not.exist');
  });

  it("check realtors messages are loaded", () => {
    cy.visit(baseUrl + "realtors/101");
    cy.get(".message-button > span")
      .invoke("text")
      .then(parseInt)
      .should("be.gte", 0)
      .then((count) => {
        cy.log("Unread Message Count  " + count);
      });
  });
});
