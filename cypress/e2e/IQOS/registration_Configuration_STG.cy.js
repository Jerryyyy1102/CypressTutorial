describe('AEM Registration Page', () => {
    let results = []; //mảng để lưu trữ kết quả của từng tab
    const environment = 'stg';
    beforeEach(() => {
        cy.loginToAAD_AEM(Cypress.env('aad_username'), Cypress.env('aad_password'), environment);
        cy.visit('https://author.stg.iqos.com/editor.html/content/pmisite/id/en/registration.html');


        
        cy.get('coral-actionbar-item').eq(1).click();
        cy.get('#coral-id-14')
            .select('coral-id-19')
            .should('have.value', 'Content Tree');

        
    });


    it('Configuration', () => {
        
       // Gọi hàm logContentTree và lưu trữ kết quả vào mảng
       cy.logContentTree().then((result) => {
        results.push(result); // Lưu kết quả vào mảng
    });
    });


    after(() => {
        // Lấy ngày và giờ hiện tại
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString(); // Định dạng ngày tháng chuẩn ISO

        // Tạo chuỗi để làm phần đuôi cho tên file theo định dạng: YYYYMMDDHHmm
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        const allResultsContent = {
            results, // Ghi lại tất cả nội dung
            count: results.length // Thêm thông tin số lượng kết quả
        };
        allResultsContent['timestamp'] = formattedDate; // Thêm thông tin thời gian tạo file

        // Ghi nội dung vào file cuối cùng
        cy.writeFile('cypress/fixtures/registration_configuration_stg.json', JSON.stringify(allResultsContent, null, 2))
        .then(() => {
            // Sau khi ghi vào file JSON thành công, chuyển đổi thành chuỗi văn bản để ghi vào file .txt
            const contentString = JSON.stringify(allResultsContent, null, 2); // Chuẩn bị chuỗi nội dung
            // Ghi vào file .txt với tên chứa ngày tháng và thời gian
            cy.writeFile(`cypress/report/registration_configuration_STG_${year}${month}${day}${hours}${minutes}.txt`, contentString);
        })
        .then(() => {
            cy.log('Tất cả kết quả đã được ghi vào file final_results.json');
        });
    });
});
