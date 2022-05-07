// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
  })

Cypress.Commands.add('setTokenLoadHome', () => {
    const token = Cypress.env('token');
    localStorage.setItem("jwtToken", token);      
    cy.visit("/");
})

Cypress.Commands.add('login', () => {
    const loginMutation = `
        mutation login ($username: String!, $password: String!) {
            login (username: $username, password: $password) {
                id
                token
                username
            }
        }`;
        cy.request({
            url: 'http://localhost:5000',
            method: 'POST',
            body: {
                query: loginMutation,
                variables: {
                    username: 'joannpav',
                    password: 'joannpav'
                }                
            }
        }).then(($response) => {
            cy.log($response.body.data.login.token);
            Cypress.env('token', $response.body.data.login.token);             
        }) 
})

Cypress.Commands.add('createEpic', () => {
    const createEpicMutation = `
        mutation CreateEpic($epicName: String!, $description: String) {
            createEpic(epicName: $epicName, description: $description) {
                id
          }
    }`;
    cy.request({
        url: 'http://localhost:5000',
        method: 'POST',
        auth: {
            'bearer': Cypress.env("token")
        },
        body: {
            query: createEpicMutation,
            variables: {
                epicName: `MyEpic-${new Date()}`,
                description: 'My awesome epic'
            }                
        }
    }).then(($response) => {
        cy.log($response.body.data);
        Cypress.env('currentEpicId', $response.body.data.createEpic.id);             
    }) 
})


Cypress.Commands.add('createStory', (body) => {
        const mutation = `
            mutation createStory ($epicId: ID!, $body: String!, $acceptanceCriteria: String) {
                createStory (epicId: $epicId, body: $body, acceptanceCriteria: $acceptanceCriteria) {
                    id
                }
            }`;          
        const acceptance = "this is the acceptance";                      
        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',
            auth: {
                'bearer': Cypress.env("token")
            },
            body: { 
                query: mutation,
                variables: {
                    epicId: Cypress.env("currentEpicId"),
                    body: body,
                    acceptanceCriteria: acceptance
                }
            },
            failOnStatusCode: false
        }).then(($response) => {
            cy.log($response.body.data);
            // cy.wrap($response.body.data.createStory.id).as('currentStoryId');
            // cy.wrap(body).as('storyBody');
            Cypress.env('currentStoryId', $response.body.data.createStory.id);             
        }) 
})
