/// <reference types = 'Cypress' />

describe('List User Details', ()=> {
    let getUrl = '/users'

    context('When I send the GET /users request with delay',()=> {
        it.only('Then it should get all the users details', () => {
            cy.request({
                method : 'GET',
                url    : getUrl+'?delay=3'
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
        })
    })
