describe('Access to any website, then check content automatically',function () {
    it('Visits the Kitchen Sink',{defaultCommandTimeout: 5000}, function() {
      cy.visit('')


    cy.get('text').type("")

      expect(1)
      cy.wait(3000)
    })
  })