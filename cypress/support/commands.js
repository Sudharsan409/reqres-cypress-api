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
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUserRequest',(methodType,usrname,job) => {
    cy.request({
        method : methodType,
        url : 'user',
        body : {
            "name" : usrname,
            "job"  : job 
        }
    }).then((response) => {
        return cy.wrap(response)
    })
})

Cypress.Commands.add('createUserResponseComValidation', (response) => {
    expect(response.status).to.eq(201)
    expect(response.body.id).to.not.be.null
    expect(response.body.createdAt).to.not.be.null
})