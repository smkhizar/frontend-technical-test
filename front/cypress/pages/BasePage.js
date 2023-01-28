/* eslint-disable no-undef */
import "cypress-xpath";
export let baseUrl = "http://localhost:8081/";

class BasePage {
  clickAgenceList() {
    cy.xpath("//*[@id='app']/div[1]/main/div/div/div[1]/header/div/div[3]/button[2]").click();
  }
}

export default new BasePage();
