/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/// <reference types="cypress" />
import "cypress-xpath";
export let baseUrl = "http://localhost:8081/";

describe("Access Page From URL", () => {
  // beforeEach(() => {
  //   cy.visit(baseUrl);
  // });

  it("check root url without any params", () => {
    cy.visit(baseUrl);
    cy.get('.agent-button').click()
    cy.get("#agence0").should('not.have.text', null);
    cy.get('.message-button').should('contain.text',0)
  });

  it("check realtors are loaded", () => {
    cy.visit(baseUrl+"realtors");
    cy.get('.agent-button').click()
    cy.get("#agence0").should('not.have.text', '');
    cy.get('.message-button').should('contain.text',0)
    cy.get(".drawer-container").should('not.exist');
  });

  it("check realtors messages are loaded", () => {
    cy.visit(baseUrl + "realtors");
    cy.get('.agent-button').click()
    cy.get("#agence0").click();
    cy.get(".message-button > span")
      .invoke("text")
      .then(parseInt)
      .should("be.gte", 0)
      .then((count) => {
        cy.get("#message-details").should('not.exist');
        cy.log("Unread Message Count  " + count);
      });
  });

  it("check message details and messages list on Mobile Screen", () => {
    cy.visit(baseUrl + "realtors");
    cy.get('.agent-button').click()
    cy.get("#agence0").click();
    cy.url().then(url => {
      cy.viewport(375, 677)
      cy.visit(url);
      cy.get(".drawer-container").should('exist');
      cy.get("#message-details").should('not.exist');   
      cy.get("#message0").should('exist').then(url => {  
        cy.get("#message0").click();
        cy.get(".drawer-container").should('not.exist');
        cy.get("#message-details").should('exist').then(url => {  
          cy.viewport(1106, 882);
          cy.get(".drawer-container").should('exist');
          cy.get("#message-details").should('exist')
      })       
    })  
  })
  });
  
});
