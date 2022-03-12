/// <reference types = 'Cypress' />

describe('List User Details', ()=> {
    let getUrl = '/users'
    context('When I send the GET /users request with id', () => {
        it('Then it should get the user details', () => {
            cy.request({
                method : 'GET',
                url    : getUrl+'/2'
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data).to.have.all.keys('id','email','first_name','last_name','avatar')
                expect(response.body.data.id).to.eq(2)
                expect(response.body.data.first_name).to.eq("Janet")
            })
        })
    })

    context('When I send the GET /users request with invalid id', () => {
        it('Then it should get the user not found error', () => {
            cy.request({
                method : 'GET',
                url    : getUrl+'/23',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.be.empty
            })
        })
    })

    context('When I send the GET /users request',()=> {
        it.only('Then it should get all the users details', () => {
            cy.request({
                method : 'GET',
                url    : getUrl
            }).then((response) => {
                expect(response.status).to.eq(200)
                const pageCount = response.body.total_pages 
                return pageCount
            }).then((pageCount) => {
                for(let i=1; i<=pageCount; i++){
                    cy.then(() => {
                        cy.log("Page Number "+i)
                        cy.request({
                            method : 'GET',
                            url    : getUrl+'?page='+i
                        }).then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.per_page).to.eq(response.body.data.length)
                            Cypress._.each(response.body.data, (user) => {
                                expect(user.id).to.not.be.null
                                expect(user.first_name).to.not.be.null
                                expect(user.email).to.be.not.null
                                expect(user).to.have.all.keys('id','email','first_name','last_name','avatar')
                            })
                        })
                    })  
                }    
            })
        })
    })

    


})