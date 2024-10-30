describe('AEM Registration Page', () => {
    let results = []; //mảng để lưu trữ kết quả của từng tab
    const environment = 'stg';
    beforeEach(() => {
        cy.loginToAAD_AEM(Cypress.env('aad_username'), Cypress.env('aad_password'), environment);
        cy.visit('https://author.stg.iqos.com/editor.html/content/pmisite/id/en.html');
        cy.wait(2000)
        cy.get('coral-actionbar-item').eq(2).click(); // Mở menu button

        cy.get('button[title="Open Properties"]').should('be.visible').click(); // Click vào nút Properties
    });


    it('Properties', () => {
        // Lặp qua các tab từ 3 đến 23
        for (let i = 3; i <= 83; i++) {
            cy.get('a').eq(i).then((tab) => {  
                tab.click(); // Nhấp vào tab
                const trimmedAValue = tab.text().trim(); 
                results.push({"tab": trimmedAValue}); 
            });
            
           // Lặp qua các phần tử con từ #coral-94 đến #coral-114
           const parentSelector = `#coral-${737 + (i - 3)}`; // Tính toán id cha tương ứng
           cy.get(parentSelector).should('exist').then(($parent) => {
               const elements = $parent.find('*'); // Lấy tất cả các phần tử con
               let elementContent = {};
   
               elements.each((index, element) => {
                   const $el = Cypress.$(element); // Chuyển đổi thành jQuery object để dễ xử lý
                   const text = $el.text().trim().replace(/[\n\t]+/g, ' ').replace(/\s\s+/g, ' '); // Xóa các ký tự xuống dòng và khoảng trắng thừa
                   
                   // Lấy khóa từ tagName, id, hoặc class nếu có, để tránh văn bản quá dài
                   const tagName = $el.prop('tagName').toLowerCase();
                   const id = $el.attr('id') || '';
                   const value = $el.attr('value') || '';
                   const className = $el.attr('class') ? $el.attr('class').split(' ').join('-') : '';
                   
                   let key;
   
                   // Xác định key dựa trên id, className hoặc tagName, sau đó thêm value nếu có
                   if (id) {
                       key = `${id}`;
                   } else if (className) {
                       key = `${className}_${index}`;
                   } else if (tagName) {
                       key = `${tagName}_${index}`;
                   }
   
                   // Thêm value vào key nếu value không trống
                   if (value) {
                       key = `${value}_${index}`;
                   } 
   
                   // Kiểm tra nếu element là checkbox
                   if ($el.is(':checkbox')) {
                       elementContent[key] = $el.is(':checked') ? true : false; // Gán true hoặc false
                   } else {
                       const value = text.length > 0 ? text : null; // Nếu nội dung trống, gán giá trị là null
           
                       // Nếu chưa có khóa này trong object thì thêm vào
                       if (!elementContent.hasOwnProperty(key)) {
                           elementContent[key] = value;
                       }
                   }
               });
               
               results.push(elementContent);
               cy.log(results);
           });
        }
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
        cy.writeFile('cypress/fixtures/language_properties_stg.json', JSON.stringify(allResultsContent, null, 2))
        .then(() => {
            // Sau khi ghi vào file JSON thành công, chuyển đổi thành chuỗi văn bản để ghi vào file .txt
            const contentString = JSON.stringify(allResultsContent, null, 2); // Chuẩn bị chuỗi nội dung
            // Ghi vào file .txt với tên chứa ngày tháng và thời gian
            cy.writeFile(`cypress/report/language_STG_${year}${month}${day}${hours}${minutes}.txt`, contentString);
        })
        .then(() => {
            cy.log('Tất cả kết quả đã được ghi vào file final_results.json');
        });
    });
});
