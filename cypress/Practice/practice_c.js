describe('Check chatbox', ()=>{
    it('Check chatbox at SamSung Website',()=>{
        cy.visit('/')
        cy.wait(10000)
        cy.get('.css-17ehq8p').click()
        cy.get('[type="button"]').find('button.css-11umpck').eq(2).click()
        cy.wait(3000)
       
    })
})