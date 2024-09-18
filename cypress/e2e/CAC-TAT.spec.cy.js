describe("Central de Atendimento ao Cliente TAT", () => {
  const THREE_SECONDS_IN_MS = 3000;
  beforeEach(() => {
    cy.visit("/src/index.html");
  });

  it("1 - Verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("2 - Preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Teste ", 20);

    cy.clock();

    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 }).should("have.value", longText);
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get("span.success").should("not.be.visible");
  });

  it("3 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcostagmail.com").should("have.value", "gabrielcostagmail.com");
    cy.get("#open-text-area").should("be.visible").type("Teste").should("have.value", "Teste");
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get("span.error").should("not.be.visible");
  });

  it("4 - Deve permanecer vazio ao digitar um valor não númerico", () => {
    cy.get("#phone").should("be.visible").type("abc").should("have.value", "");
  });

  it("5 - Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
    cy.get("#firstName").should("be.visible").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#lastName").should("be.visible").type("Costa").should("have.value", "Costa");
    cy.get("#email").should("be.visible").type("gabrielcosta@gmail.com").should("have.value", "gabrielcosta@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#phone").should("be.visible").should("have.value", "");
    cy.get("#open-text-area").should("be.visible").type("Teste").should("have.value", "Teste");
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get("span.error").should("not.be.visible");
  });

  it("6 - Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Gabriel").should("have.value", "Gabriel").clear().should("have.value", "");
  });

  it("7 - Exibe mensagem de errro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get("span.error").should("not.be.visible");
  });

  it("8 - Envia o formulário com sucesso usando um comando costumizado", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("span.success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get("span.success").should("not.be.visible");
  });

  it("9 - Seleciona um produto (Youtube) por seu texto", () => {
    cy.get("#product").select("YouTube").find("option:selected").should("have.text", "YouTube");
  });

  it("10 - seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("11 - seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("12 - Marca o tipo de atendimento Feedback", () => {
    cy.get('input[type="radio"][value="feedback"]').check("feedback").should("have.value", "feedback");
  });

  it("13 - Marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("14 - Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type='checkbox']").check().last().uncheck().should("not.be.checked");
  });

  it("15 - Seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("16 - Seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("17 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("input[type='file']#file-upload")
      .selectFile("@sampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("18 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("a[href='privacy.html']").should("have.attr", "target", "_blank");
  });

  it("19 - Acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("a[href='privacy.html']").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });

  it("20 - Exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
    cy.get(".success").should("not.be.visible").invoke("show").should("be.visible").and("contain", "Mensagem enviada com sucesso.").invoke("hide").should("not.be.visible");
    cy.get(".error").should("not.be.visible").invoke("show").should("be.visible").and("contain", "Valide os campos obrigatórios!").invoke("hide").should("not.be.visible");
  });

  it("21 - Preenche a area de texto usando o comando invoke", () => {
    const longText = Cypress._.repeat("Teste ", 20);

    cy.get("#open-text-area").invoke("val", longText).should("have.value", longText);
  });

  it.only("22 - Faz uma requisição HTTP", () => {
    cy.request("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html").should((response) => {
      const { status, statusText, body } = response;
      expect(status).to.equal(200);
      expect(statusText).to.equal("OK");
      expect(body).to.include("CAC TAT");
    });
  });
});
