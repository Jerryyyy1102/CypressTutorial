let otp="";
const inpP="0765641761";
describe('Access to any website, then check content automatically',function () {
    it('Visits the Kitchen Sink',{defaultCommandTimeout: 5000}, function() {
      cy.visit('/dang-nhap')
      // cy.get('.mt-2 > span').click()
      cy.get('#phone').type(inpP).should('have.value','0765641761').then(p=>{
        cy.get('button').eq(1).click()
      })
      cy.wait(30000)
      cy.get('#otp-input').then(($input) => {
        otp = $input.val();
      });
      cy.get('button').eq(3).click()
      cy.wait(3000)
    })
  })