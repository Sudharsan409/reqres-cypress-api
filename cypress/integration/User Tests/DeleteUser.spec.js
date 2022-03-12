/// <reference types="Cypress" />


describe('Delete User API Test', () => {
    context('When I send the DELETE /user request', ()=> {
        it('Then it should delete the user record', ()=> {
            cy.request({
                method : 'DELETE',
                url : '/users/2'
            }).then((response) => {
                expect(response.status).to.eq(204)
                expect(response.body).to.be.empty
            })
        })
    })
})