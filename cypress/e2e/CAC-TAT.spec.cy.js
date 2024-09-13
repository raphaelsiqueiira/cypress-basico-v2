describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("/src/index.html");
  });

  it("1 - Verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("2 - Preenche os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 }).should("have.value", longText);
    cy.get("button[type='submit'].button").click();
    cy.get("span.success").should("be.visible");
  });

  it("3 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcostagmail.com").should("have.value", "gabrielcostagmail.com");
    cy.get("#open-text-area").should("be.visible").type("Teste").should("have.value", "Teste");
    cy.get("button[type='submit'].button").click();
    cy.get("span.error").should("be.visible");
  });

  it("4 - Deve permanecer vazio ao digitar um valor não númerico", () => {
    cy.get("#phone").should("be.visible").type("abc").should("have.value", "");
  });

  it("5 - Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#phone").should("be.visible").should("have.value", "");
    cy.get("#open-text-area").should("be.visible").type("Teste").should("have.value", "Teste");
    cy.get("button[type='submit'].button").click();
    cy.get("span.error").should("be.visible");
  });

  it("6 - Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Gabriel").should("have.value", "Gabriel").clear().should("have.value", "");
  });

  it("7 - Exibe mensagem de errro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get("button[type='submit'].button").click();
    cy.get("span.error").should("be.visible");
  });

  it.only("8 - Envia o formulário com sucesso usando um comando costumizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });
});
