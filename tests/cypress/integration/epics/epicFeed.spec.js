/// <reference types="cypress" />

describe('epic feed page', () => {
    before(() => {                
        cy.login();    
    })

    it('create an epic from the UI', () => {
        cy.setTokenLoadHome();
        cy.get('[data-cy=epicName] > input')
    })
})