describe('AEM Registration Page', () => {
    let results = []; //mảng để lưu trữ kết quả của từng tab
    const environment = 'stg';
    beforeEach(() => {
        cy.loginToAAD_AEM(Cypress.env('aad_username'), Cypress.env('aad_password'), environment);
        cy.visit('https://author.stg.iqos.com/editor.html/content/pmisite/id/en.html');
        cy.get('coral-actionbar-item').eq(2).click(); // Mở menu button

        cy.get('button[title="Open Properties"]').should('be.visible').click(); // Click vào nút Properties
    });


    it('Properties', () => {
        // Lặp qua các tab từ 3 đến 23
        for (let i = 3; i <= 23; i++) {
            cy.get('a').eq(i).then((tab) => {  
                tab.click(); // Nhấp vào tab
                const trimmedAValue = tab.text().trim();
                results.push({ "tab": trimmedAValue });
    
                // Lấy tất cả các phần tử từ #coral-94 đến #coral-114 (bao gồm cả phần tử ẩn)
                const parentSelector = `#coral-${737 + (i - 3)}`; // Tính toán id cha tương ứng
                cy.get(parentSelector).should('exist').then(($parent) => {
                    // Lấy toàn bộ các phần tử con, kể cả những phần tử ẩn
                    const elements = $parent.find('*'); // Lấy tất cả các phần tử con, kể cả phần tử ẩn
                    let elementContent = {};
    
                    elements.each((index, element) => {
                        const $el = Cypress.$(element); // Chuyển đổi thành jQuery object để dễ xử lý
                        const tagName = $el.prop('tagName').toLowerCase();
    
                        // Trường hợp 1: Xử lý logic với <label> có thuộc tính for
                        if (tagName === 'label' && $el.attr('for')) {
                            const labelForId = $el.attr('for');
                            const labelText = $el.text().trim();
    
                            // Tìm thẻ input hoặc textarea có id tương ứng với giá trị for của label
                            const inputElement = elements.filter(`#${labelForId}`);
                            if (inputElement.length > 0) {
                                const inputValue = inputElement.val() || inputElement.text().trim();
                                elementContent[labelText] = inputValue;
                            }
                        }
    
                        // Trường hợp 2: Xử lý với <label> có thuộc tính id (aria-labelledby)
                        else if (tagName === 'label' && $el.attr('id')) {
                            const labelId = $el.attr('id');
                            const labelText = $el.text().trim();
    
                            const inputElement = elements.filter((index, el) => {
                                const ariaLabelledby = Cypress.$(el).attr('aria-labelledby');
                                return ariaLabelledby && ariaLabelledby.split(' ').includes(labelId);
                            });
    
                            if (inputElement.length > 0) {
                                let inputValue;
                                const $inputElement = Cypress.$(inputElement);
    
                                if ($inputElement.is('textarea')) {
                                    inputValue = $inputElement.val().trim();
                                } else if ($inputElement.is('select')) {
                                    inputValue = $inputElement.find('option:selected').text();
                                } else {
                                    inputValue = $inputElement.val() || $inputElement.text().trim();
                                }
    
                                elementContent[labelText] = inputValue;
                            }
                        }
    
                        // Trường hợp 3: Nếu không có thuộc tính `for` hoặc `aria-labelledby`
                        else if (tagName === 'label' && !$el.attr('for') && !$el.attr('id')) {
                            const labelText = $el.text().trim();
                            const nextElement = $el.next();
    
                            if (nextElement.is('textarea') || nextElement.is('input')) {
                                const nextValue = nextElement.val() || nextElement.text().trim();
                                elementContent[labelText] = nextValue;
                            }
                        }
    
                        // Trường hợp 4: nếu có thẻ <h> trước <label>
                        else if (tagName.match(/^h[1-6]$/)) {
                            const headingText = $el.text().trim();
                            elementContent[headingText] = "";
                        }

                        else if (tagName === 'span' && ($el.hasClass('coral-Checkbox-description'))) {
                            const descriptionText = $el.text().trim();
                        
                            // Tìm checkbox liên quan trong label
                            const relatedCheckbox = $el.closest('label').find('input[type="checkbox"]');
                            if (relatedCheckbox.length > 0) {
                                // Kiểm tra trực tiếp nếu checkbox có thuộc tính disabled
                                const isDisabled = relatedCheckbox.attr('disabled') !== undefined;
                                
                                if (isDisabled) {
                                    elementContent[descriptionText] = 'false';
                                } else {
                                    elementContent[descriptionText] = relatedCheckbox.is(':checked');
                                }
                        
                            }
                        }
                    });
    
                    results.push(elementContent);
                    cy.log(results);
                });
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
        cy.writeFile('cypress/fixtures/registration_properties_stg.json', JSON.stringify(allResultsContent, null, 2))
        .then(() => {
            // Sau khi ghi vào file JSON thành công, chuyển đổi thành chuỗi văn bản để ghi vào file .txt
            const contentString = JSON.stringify(allResultsContent, null, 2); // Chuẩn bị chuỗi nội dung
            // Ghi vào file .txt với tên chứa ngày tháng và thời gian
            cy.writeFile(`cypress/report/registration_STG_${year}${month}${day}${hours}${minutes}.txt`, contentString);
        })
        .then(() => {
            cy.log('Tất cả kết quả đã được ghi vào file final_results.json');
        });
    });
});
