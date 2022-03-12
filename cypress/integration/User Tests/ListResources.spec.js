/// <reference types = 'Cypress' />

describe('List Resources Details', ()=> {
    let getUrl = '/unknown'
    context('When I send the GET /unknown request with id', () => {
        it('Then it should get the single resource details', () => {
            cy.request({
                method : 'GET',
                url    : getUrl+'/2'
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data).to.have.all.keys('id','name','year','color','pantone_value')
                expect(response.body.data.id).to.eq(2)
                expect(response.body.data.name).to.eq("fuchsia rose")
            })
        })
    })

    context('When I send the GET /unknown request with invalid id', () => {
        it('Then it should get the resource not found error', () => {
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

    context('When I send the GET /unknown request',()=> {
        it('Then it should get all the resources details', () => {
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
                                expect(user.name).to.not.be.null
                                expect(user.year).to.be.not.null
                                expect(user.color).to.be.not.null
                                expect(user.pantone_value).to.be.not.null
                                expect(user).to.have.all.keys('id','name','year','color','pantone_value')
                            })
                        })
                    })  
                }    
            })
        })
    })

    


})