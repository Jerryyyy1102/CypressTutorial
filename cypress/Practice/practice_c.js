describe('Check chatbox', ()=>{
    it('Check chatbox at SamSung Website',()=>{
        cy.visit('/')
        cy.wait(10000)
        cy.get('.css-17ehq8p').click()
        cy.wait(6000)
        cy.get('button').eq(2).should('be.visible').wait(3000).click({ force: true })
        cy.wait(3000)
       
    })
})