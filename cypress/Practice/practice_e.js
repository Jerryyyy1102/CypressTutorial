describe('Check API',()=>{
    it('GET',()=>{
        cy.request({
            method: 'OPTIONS',
            url: 'https://apibhx.tgdd.vn/Home/GetBestPromotion',
          })
          .then((response) => {
            // Kiểm tra status code
            expect(response.status).to.equal(200);
          });
          
    });
})