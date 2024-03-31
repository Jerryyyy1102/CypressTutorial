describe('Access to any website, then check content automatically',function () {
    it('Visits the Kitchen Sink',{defaultCommandTimeout: 5000}, function() {
      cy.visit('')

//Tìm element cho id idbatki, custom Timeout cho 1 element cụ thể, giống exists () in selenium

      cy.get('textarea').eq(0).type("Hello")
      cy.get('textarea').eq(1).type("Hi")

      //verify that the value has been updated

      cy.get('textarea').then(eq=>{
          cy.get(eq[0]).clear()
          cy.get(eq[0]).type("hi")
          cy.get(eq[0]).should('have.value',"verify")
      })
      cy.get('#compareButton').click()

      expect(1)
      cy.wait(3000)
    })
  })