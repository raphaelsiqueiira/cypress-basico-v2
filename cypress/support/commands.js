Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
  cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
  cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
  cy.get("#open-text-area").should("be.visible").type("Teste").should("have.value", "Teste");
  cy.get("button[type='submit'].button").click();
});
