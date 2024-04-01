const dropdown_Name="select=['select.form-control.form-control-sm.is-invalid']"

describe('Check chatbox', ()=>{
    it('Check chatbox at LongChau Website', () => {
        cy.visit('/')
        cy.wait(6000)
        cy.get('.icon__chat-error',{timeout:3000}).click()
        cy.get('.icon__report-chat',{timeout:3000}).click()

        cy.get('smt-[14px].flex w-[30%].cursor-pointer.flex-col.items-center.px-0').click()
        cy.get('select.form-control.form-control-sm.is-invalid').type('Anh').click()
        // cy.get('.css-17ehq8p').click()
        // cy.wait(2000)
        // cy.get('.css-1l2nfdo').get('button.css-11umpck').eq(2).should('be.visible').click()
        //cy.get('[type="button"]').find('button.css-11umpck').eq(2).click()
        //const buttonLiveChat= document.getElementById('livechat-button');
        //const buttonElements = document.querySelectorAll('.livechat-button');
        //const buttonElement = $('.livechat-button');
        //const buttonElement = Sizzle('.livechat-button')[0];
        //const buttonElement = document.evaluate("//button[@class='livechat-button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //const buttonElement = document.querySelector('.livechat-button').shadowRoot.querySelector('button');
        //cy.get(buttonLiveChat).click();
        cy.wait(3000)
        // action that causes exception
      
      });
   
})