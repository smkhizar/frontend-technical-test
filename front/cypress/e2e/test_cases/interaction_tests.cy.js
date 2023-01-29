/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/// <reference types="cypress" />
import "cypress-xpath";
export let baseUrl = "http://localhost:8081/";

describe("Scolling Messages List & Click Message Then Details Check ", () => {
  it("Start from root url", () => {
    cy.visit(baseUrl);
    cy.get('.agent-button').click()
    cy.get("#agence0").should('not.have.text', null);
    cy.get("#agence0").click()
    cy.scrollTo('bottom', { duration: 800 });
    for(let i=2;i<=4;i++){
        cy.scrollTo('bottom', { duration: 1000 }).then(() => {
            cy.url().should('include', 'page='+i)
            cy.wait(5)
        });
    }
    cy.scrollTo('top', { duration: 500 });
    cy.get("#message0").should('exist')
    cy.get(".v-avatar").should('be.visible')
    cy.get(".v-list-item__title").should('be.visible')
    cy.get(".v-list-item__subtitle").should('be.visible')
    cy.get("#message0").click();
    cy.wait(5);
    cy.get("#message-details").should('exist');
    cy.get("#message-name").should('exist');
    cy.get("#message-email").should('exist');
    cy.get("#message-phone").should('exist');
    cy.get("#message-body-name").should('exist');
    cy.get("#message-body-date").should('exist');
    cy.get("#message-body").should('exist');
  });
});
