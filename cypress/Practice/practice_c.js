const dropdown_Name="select=['select.form-control.form-control-sm.is-invalid']"

describe('Check chatbox', ()=>{
    it('Check chatbox at BachHoaXanh Website', () => {
        cy.visit('/')
        cy.wait(2000)
        cy.get('i',{timeout:3000}).eq(54).click({force:true})
        cy.wait(2000)
        cy.get('textarea').eq(0).type('Em test anh chị đừng gọi, em cám ơn')
        cy.get('button').eq(92).click()
        cy.get('button').eq(94).click()


        cy.wait(3000)
        //cy.get('i',{timeout:3000}).eq(54).click()
        

        // cy.get('select.form-control.form-control-sm.is-invalid').eq(0).click()
        // cy.get('select.form-control.form-control-sm.is-invalid').click()
        // cy.get('.css-17ehq8p').click()
        // cy.wait(2000)
       
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