/// <reference types='Cypress' />


describe('Register API Test', () => {

    context('When I send POST /register request with valid data', () => {
        it('Then it should register the details', ()=> {
            cy.registerRequest('eve.holt@reqres.in','pistol', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.has.all.keys('id','token')
                expect(response.body.id).to.not.be.null
                expect(response.body.token).to.not.be.empty
            })
        })
    })

    context('When I send POST /register request with empty email', () => {
        it('Then it should not register and return the bad request error', ()=> {
            cy.registerRequest('','pistol', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing email or username')
            })
        })
    })

    context('When I send POST /register request with empty password', () => {
        it('Then it should not register and return the bad request error', ()=> {
            cy.registerRequest('eve.holt@reqres.in','', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing password')
            })
        })
    })

    context('When I send POST /register request with empty email,password', () => {
        it('Then it should not register and return the bad request error', ()=> {
            cy.registerRequest('','', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Missing email or username')
            })
        })
    })

    context('When I send POST /register request with invalid email', () => {
        it('Then it should not register and return the bad request error', ()=> {
            cy.registerRequest('eve.holt@reqres.in1','pistol', ()=> {
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.has.all.keys('error')
                expect(response.body.error).to.eq('Note: Only defined users succeed registration')
            })
        })
    })


})