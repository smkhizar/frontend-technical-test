/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
export class DynamicWaits {
  waitForRequestToLoad(requestUrl, alias) {
    cy.intercept(requestUrl).as(alias);
    cy.wait("@" + alias)
      .its('response.statusCode')
      .should('equal', 200);
  }
}
