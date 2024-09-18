describe("Central de Atendimento ao Cliente TAT", () => {
  Cypress._.times(5, () => {
    it.only("1 - Testa a página da política de privacidade de forma independente", () => {
      cy.visit("/src/privacy.html");
      cy.contains("Talking About Testing").should("be.visible");
    });
  });
});
