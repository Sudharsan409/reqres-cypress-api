/// <reference types="Cypress" />


describe('Create User api', () => {
    let createUrl = 'users'
    context('When I send PUT /users', () => {
        it('Then it should create a new user', () => {
            cy.fixture('createUser').then((payLoad) => {
                cy.createUserRequest('POST',payLoad.name,payLoad.job,() =>{
                }).then((response) => {
                    cy.createUserResponseComValidation(response)
                    expect(response.body).to.have.all.keys('name','job','id','createdAt')
                    expect(response.body.name).to.eq(payLoad.name)
                    expect(response.body.job).to.eq(payLoad.job)
                })
            }) 
        })
    })

    context('When I send PUT /users with empty values', () => {
        it('Then should create a new user with empty job value', ()=> {
            cy.fixture('createUser').then((payLoad) => {
                cy.createUserRequest('POST',payLoad.name,'',() =>{
                }).then((response) => {
                    cy.createUserResponseComValidation(response)
                    expect(response.body).has.property('name',payLoad.name)
                    expect(response.body.job).to.be.empty
                })
            })
        })
    })
    context('When I send PUT /users without job key', () =>{
        it('Then should create a new user without job', () => {
            cy.fixture('createUser').then((payLoad) => {
                cy.request({
                    method : 'POST',
                    url : createUrl,
                    body : {
                        "name" : payLoad.name
                    }
                }).then((response) => {
                    cy.createUserResponseComValidation(response)
                    expect(response.body.name).to.eq(payLoad.name)
                    expect(response.body).to.have.all.keys('name','id','createdAt')
                })
            })
        }) 
    })

})