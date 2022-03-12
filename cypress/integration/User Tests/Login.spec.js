/// <reference types='Cypress' />


describe('Login API Test', () => {

    context('When I send POST /login request with valid data', () => {
        it('Then it should get the token', ()=> {
            cy.loginRequest('eve.holt@reqres.in','cityslicka', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.has.all.keys('token')
                expect(response.body.token).to.not.be.empty
            })
        })
    })

    context('When I send POST /login request with empty email', () => {
        it('Then it should return the bad request missing email error', ()=> {
            cy.loginRequest('','cityslicka', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing email or username')
            })
        })
    })

    context('When I send POST /login request with empty password', () => {
        it('Then it should return the bad request missing password error', ()=> {
            cy.loginRequest('eve.holt@reqres.in','', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing password')
            })
        })
    })

    context('When I send POST /login request with empty email,password', () => {
        it('Then it should return the bad request error', ()=> {
            cy.loginRequest('','', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing email or username')
            })
        })
    })

    context('When I send POST /login request with invalid email', () => {
        it('Then it should return the bad request user not found error', ()=> {
            cy.loginRequest('eve.holt@reqres.in1','pistol', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('user not found')
            })
        })
    })


})