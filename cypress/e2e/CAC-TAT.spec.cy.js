describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("/src/index.html");
  });
  it("1 - Verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it.only("2 - preenche os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 }).should("have.value", longText);
    cy.get("button[type='submit'].button").click();
    cy.get("span.success").should("be.visible");
  });
});
