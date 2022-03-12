/// <reference types="Cypress" />


describe('Update User record', () => {
    let updateUrl = 'users/2'
    context('When I send PUT /user with new details', () => {
        it('Then it should update the user details', () => {
            cy.request({
                method : 'PUT',
                url    : updateUrl,
                body   : {
                    "name" : "morpheus",
                    "job"  : "zion resident"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('name','job','updatedAt')
                expect(response.body.name).to.eq("morpheus")
                expect(response.body.job).to.eq("zion resident")
            })
        })
    })

    context('When I send PATCH /user with updated name', () => {
        it('Then it should update the name in user details', () => {
            cy.request({
                method : 'PATCH',
                url    : updateUrl,
                body   : {
                    "name" : "morpheus"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('name','updatedAt')
                expect(response.body.name).to.eq("morpheus")
            })
        })
    })

    context('When I send PATCH /user with updated job', () => {
        it('Then it should update the job in user details', () => {
            cy.request({
                method : 'PATCH',
                url    : updateUrl,
                body   : {
                    "job"  : "zion resident"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('job','updatedAt')
                expect(response.body.job).to.eq("zion resident")
            })
        })
    })

})