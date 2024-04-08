describe('Access to any website, then check content automatically',function () {
    it('Visits the Kitchen Sink',{defaultCommandTimeout: 5000}, function() {
      cy.visit('/')


      cy.get('span').eq(2).then(spanElement=>{
        // Kiểm tra nội dung xem có nội dung 'sốc'
        expect(spanElement.text()).to.contain('sốc');
      })
      cy.wait(3000)
    })
  })