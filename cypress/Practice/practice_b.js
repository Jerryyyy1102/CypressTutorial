let otp="";
describe('Access to any website, then check content automatically',function () {
    it('Visits the Kitchen Sink',{defaultCommandTimeout: 5000}, function() {
      cy.visit('/')
      cy.get('.mt-2 > span').click()
      cy.get('#phone').type('0822623925')
      cy.get('button').eq(1).click()
      cy.wait(60000)
      cy.get('#otp-input').then(($input) => {
        otp = $input.val();
      });
      cy.get('button').eq(3).click()
      
      // Sử dụng giá trị OTP
      console.log('OTP:', otp);
      
      cy.wait(6000)
      expect(1)
      cy.wait(3000)
    })
  })