/// <reference types="cypress" />

describe("Todo App", () => {
  // go on the page where we want to test
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to add a todo, see more details about the todo, update it status and delete it", () => {
    // add a todo
    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("Todo 1")
      .type("{enter}");

    cy.findByRole("textbox", {
      name: /body/i,
    })
      .type("Make the bed")
      .type("{enter}");

    cy.findByRole("button", {
      name: /add a todo/i,
    }).click();

    cy.wait(500);

    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("Todo 2")
      .type("{enter}");

    cy.findByRole("textbox", {
      name: /body/i,
    })
      .type("Clean the room")
      .type("{enter}");

    cy.findByRole("button", {
      name: /add a todo/i,
    }).click();

    // tests if todo have been added
    cy.findByText(/todo 1/i).should("exist");
    cy.findByText(/todo 2/i).should("exist");

    cy.get("ul.flex > :nth-child(1)").click();

    // test if the details of the todo 1 appears
    cy.findByText(/make the bed/i).should("exist");
    cy.findByRole("button", { name: /marked as finished/i }).should("exist");
    cy.findByRole("button", { name: /delete/i }).should("exist");

    cy.findByRole("button", { name: /marked as finished/i }).click();

    cy.findByRole("button", { name: /marked as finished/i }).should(
      "not.exist"
    );
    cy.findByRole("button", { name: /delete/i }).should("not.exist");

    // test if we can check the todo status
    cy.findByText(/todo 1/i).should("have.class", "line-through");
    cy.get(".border-teal-400").should("exist");
    cy.get(".border-teal-400 > img").should("exist");

    cy.get("ul.flex > :nth-child(1)").click();

    // test if the button text has changed
    cy.findByRole("button", { name: /not yet finished/i }).should("exist");

    cy.findByRole("button", { name: /not yet finished/i }).click();

    // test if we can uncheck the todo status
    cy.findByText(/todo 1/i).should("not.have.class", "line-through");
    cy.get(".border-teal-400").should("not.exist");
    cy.get(".border-teal-400 > img").should("not.exist");

    cy.get("ul.flex > :nth-child(2)").click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByRole("button", { name: /marked as finished/i }).should(
      "not.exist"
    );
    cy.findByRole("button", { name: /delete/i }).should("not.exist");

    // test if we can delete a todo
    cy.findByText(/todo 2/i).should("not.exist");
  });
});
