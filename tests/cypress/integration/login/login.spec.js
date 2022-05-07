/// <reference types="cypress" />

describe('login page', () => {
    it('can login through UI', () => {
        cy.visit("http://localhost:3000");
        cy.contains('Username').type("joannpav");
        cy.contains("Password").type("joannpav");
        cy.get('#loginButton').click();
        cy.get('[data-cy=loggedInUsername]').should('exist');
    })
})