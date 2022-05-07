/// <reference types="cypress" />
import { hasOperationName, aliasQuery, aliasMutation } from '../../utilities/graphql-test-utils';


describe('story feed page', () => {    
    before(() => { 
        cy.login();   
        cy.createEpic();         
    })    

    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:5000/graphql', (req) => {                        
            aliasQuery(req, 'getStories')                    
            aliasMutation(req, 'createStory')            
        })
    })
    
    it.skip('fetches all stories', () => {
        // todo: this endpoint doesn't require security right now, but it should        
        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',
            body: { 
                operationName: 'getStories',
                query: `
                query getStories {
                    getStories {
                        id
                    }
                }`,
             },
        })
    })

    it('can create a story from the UI', () => {    
        cy.setTokenLoadHome();
        const epicId = Cypress.env('currentEpicId');
        cy.visit(`/PumpkinPie/${epicId}/stories`);
        
        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',            
            body: { 
                operationName: 'getStories',
                query: `
                    query getStories($epicId: ID!) {
                        getStories (epicId: $epicId) {
                            id
                        }
                    }`,
                variables: {
                    epicId: epicId 
                }
            },
            failOnStatusCode: false
        }).then($resp => {
            cy.log($resp.body.data.getStories.length);
            const initialStoryCount = $resp.body.data.getStories.length            
            cy.get('[data-cy=body] > input').type("A user that is logged in should be able to manage a story");
            cy.get('[data-cy=acceptance] > input').type("User can add, delete, like and comment on a story");
            cy.get('[data-cy=submit]').click();
            
            // if (hasOperationName($resp, 'getStories')) {            
            //     cy.wait('@gqlgetStoriesMutation')
            //     // cy.wait(500);
                   
            // }
            // Workaround bc can't get intercept to work just yet
            cy.wait(500);
            cy.reload();
            cy.get('[data-cy=feedItem]')
                    .its("length")
                    .should("be.gt", initialStoryCount);  
        })
    })

    it('can delete a story from the UI', () => {  
        const uuid = () => Cypress._.random(0, 1e6).toString()     
        const body = uuid();        
        cy.createStory(body);        
        expect(Cypress.env("currentStoryId")).to.not.be.null;
        cy.setTokenLoadHome();
        cy.visit(`/PumpkinPie/${Cypress.env("currentEpicId")}/stories`);
            
        cy.contains(body).parent().parent().parent().find('[data-cy=deleteButton]').then(($ele) => {
            $ele.click();
            cy.get('.primary').click();
        })                  
        cy.contains(body).should('not.exist');        
    })
    
    it('clicking story name opens single story page', () => {        
        const uuid = () => Cypress._.random(0, 1e6).toString()     
        const body = uuid();  
        cy.setTokenLoadHome();      
        cy.createStory(body);  
        cy.visit(`/PumpkinPie/${Cypress.env("currentEpicId")}/stories`);
        cy.contains(body).click();
        cy.get("[data-cy=storyLabel]").should('exist');
        cy.contains(body).should('exist');

    })
    it('clicking like increases like count and updates color', () => {
        const uuid = () => Cypress._.random(0, 1e6).toString()     
        const body = uuid();        
        cy.createStory(body);        
        expect(Cypress.env("currentStoryId")).to.not.be.null;
        cy.setTokenLoadHome();
        cy.visit(`/PumpkinPie/${Cypress.env("currentEpicId")}/stories`);
        cy.get('[data-cy=feedContainer] > :nth-child(1) > :nth-child(1)')
            .find("[data-cy=likeButton]")
            .should('contain.text', "0")
            .click();        
        cy.get('[data-cy=feedContainer]')
            .find("[data-cy=likeButton]")
            .should('contain.text', "1");
        cy.get('[data-cy=feedContainer]').find('[data-cy=likeButton] > .like')
            .should('have.css', 'color', 'rgb(219, 40, 40)');
    })
    it.skip('adding scenarios updates scenario count and changes color', () => {
        // This should move to the scenario spec
        assert.fail("Not implemented") 
    })

})