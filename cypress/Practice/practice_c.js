describe('Check chatbox', ()=>{
    it('Check chatbox at SamSung Website',()=>{
        cy.visit('/')
        cy.wait(10000)
        cy.get('.css-17ehq8p').click()
        // cy.get('[type="button"]').find('button.css-11umpck').eq(2).click()
        cy.get('.text1').then(($elements) => {
            // Lặp qua từng phần tử văn bản
            $elements.each((i, element) => {
              // Lấy vị trí và kích thước của phần tử
              const elementRect = element.getBoundingClientRect();
          
              // So sánh vị trí và kích thước của phần tử với các phần tử khác
              for (let j = i + 1; j < $elements.length; j++) {
                const otherElementRect = $elements[j].getBoundingClientRect();
          
                // Kiểm tra xem hai phần tử có chồng chéo hay không
                if (isOverlapping(elementRect, otherElementRect)) {
                  // Báo cáo lỗi nếu có chồng chéo
                  cy.log('Lỗi: Phần tử văn bản bị chong cheo', element, $elements[j]);
                }
              }
            });
          });
        cy.wait(3000)
       
    })
})