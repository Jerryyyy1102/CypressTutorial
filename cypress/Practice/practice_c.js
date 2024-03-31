describe('Check chatbox', ()=>{
    it('Check chatbox at SamSung Website',()=>{
        cy.visit('/')
        cy.wait(10000)
        cy.get('.css-17ehq8p').click()
        //cy.get('[type="button"]').find('button.css-11umpck').eq(2).click()
        
        const buttonLiveChat= document.getElementById('livechat-button');
        //const buttonElements = document.querySelectorAll('.livechat-button');
        //const buttonElement = $('.livechat-button');
        //const buttonElement = Sizzle('.livechat-button')[0];
        //const buttonElement = document.evaluate("//button[@class='livechat-button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //const buttonElement = document.querySelector('.livechat-button').shadowRoot.querySelector('button');
        cy.get(buttonLiveChat).click();
        cy.wait(3000)
       
    })
})