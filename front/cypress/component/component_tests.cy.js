/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import SideDrawerList from "@/components/SideDrawerList.vue";
import TopNavBar from "@/components/TopNavBar.vue";
import MessageDetails from "@/components/MessageDetails.vue";

describe("Component Testings", () => {
  it("top bar component", () => {
    let agenceSelected = undefined;
    cy.request("GET", "http://localhost:8080/realtors").then((response) => {
      expect(response.body[0]).to.have.property("name");
      cy.log("http://localhost:8080/realtors  fetch successfully.");
      agenceSelected = response.body[0];
      cy.mount(TopNavBar, { props: { agences: response.body, selectedAgenceName: agenceSelected["name"], messagesCount: agenceSelected["unread_messages"], onAgenceChange: undefined } });
      cy.log("Top Bar Mounted With Data Successfully.");
      cy.get("#selectedAgence").should("contain.text", agenceSelected["name"]);
    });
  });

  it("side drawer component", () => {
    cy.request("GET", "http://localhost:8080/realtors").then((response) => {
      expect(response.body[0]).to.have.property("name");
      cy.request("GET", "http://localhost:8080/realtors/" + response.body[0]["id"] + "/messages").then((realtor) => {
        expect(realtor.body[0]).to.have.property("type");
        cy.log("Realtor Messages Loaded Successfully.");
        cy.mount(SideDrawerList, { props: { messages: realtor.body, handleMessageDetails: undefined, continousScrolling: undefined } });
        cy.get("#message0-name").should("exist");
        cy.get("#message0-date").should("exist");
        cy.get("#message0-subject").should("exist");
        cy.get("#message0-body").should("exist");
        cy.log("Side Drawer Messages List Mounted With Data Successfully.");
      });
    });
  });

  it("message details component", () => {
    cy.request("GET", "http://localhost:8080/realtors").then((response) => {
      expect(response.body[0]).to.have.property("name");
      let agences = response.body;
      cy.request("GET", "http://localhost:8080/realtors/" + agences[0]["id"] + "/messages").then((realtor) => {
        expect(realtor.body[0]).to.have.property("type");
        cy.request("GET", "http://localhost:8080/realtors/" + agences[0]["id"] + "/messages/" + realtor.body[0].id).then((message) => {
          expect(message.body).to.have.property("body");
          cy.log("Message Details fetch successfully.");
          cy.mount(MessageDetails, { props: { "message-selected": message.body } });
          cy.get("#message-name").should("exist");
          cy.get("#message-email").should("exist");
          cy.get("#message-phone").should("exist");
          cy.get("#message-body-name").should("exist");
          cy.get("#message-body-date").should("exist");
          cy.get("#message-body").should("exist");
          cy.log("Message Details Mounted Successfully.");
        });
      });
    });
  });
});
