// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const authorizeTokens = {
  pp: {
      "iqos": {value: "rd2o00000000000000000000ffff0a91502do80"},
      "zyn": {value: "dfGXW82rANRSGkRe7wZX2COr6030MTNt36ln6242Y"},
      "veev-vape": {value: "dfGXW82rANRSGkRe7wZX2COr6030MTNt36ln6242Y"}
    },
  stg: {
      "iqos": {value: "rd2o00000000000000000000ffff0a91502do80"},
      "zyn": {value: "dvgXsjVSOzWIp4zynk97FYc7pGydgdETZrmaCq7EZ"},
      "veev-vape": {value: "dvgXsjVSOzWIp4zynk97FYc7pGydgdETZrmaCq7EZ"}
  }
}

Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes("Identifier 'PMISITE_CONTENT_REL_PATH' has already been declared") ||
        err.message.includes("Failed to set the \"primary\" property on \"Coral.ActionBar\"") ||
        err.message.includes("Failed to set the \"label\" property on \"Coral.AnchorButton\"") ||
        err.message.includes("Failed to set the \"label\" property on \"Coral.Button\"") ||
        err.message.includes("Failed to set the \"label\" property on \"Coral.Radio\"") ||
        err.message.includes("Cannot read properties of undefined (reading \"set\") ") ||
        err.message.includes("Failed to set the \"header\" property on \"Coral.Dialog\"")
    ) {
        // Bỏ qua lỗi này và không làm fail bài test
        return false;
    }
    return true;
});

    function loginViaAAD_Hybris(username, password, env) {
    let baseUrl;
  
    // Xác định URL dựa trên môi trường
    switch (env) {
      case 'pp':
        baseUrl = 'https://backoffice.pp.iqos.com';
        break;
      case 'stg':
        baseUrl = 'https://backoffice.stg.iqos.com';
        break;
      case 'prod':
        baseUrl = 'https://backoffice.iqos.com'; 
        break;
      default:
        throw new Error('Invalid environment specified.'); // Thông báo lỗi nếu môi trường không hợp lệ
    }
    
    cy.session([username, password], () => {
      cy.visit(`${baseUrl}/backoffice/login.zul`);
      cy.get('a').eq(0).click()
  
      // Login to your AAD tenant.
      cy.origin(
        'login.microsoftonline.com',
        {
          args: {
            username,password
          },
        },
        ({ username, password }) => {
          cy.get('input[type="email"]').type(username, {
            log: false,
          })
          cy.get('input[type="submit"]').click()
          cy.wait(5000)
          cy.get('a').eq(0).click()
          cy.get('input[type="password"]').type(password,{
              log:false,})
          cy.get('input[type="submit"]').click()
          cy.wait(30000)
        }
      )
    });
    }

    function Authenticating_AEM(username, password, env) {
      let baseUrl;
    
      // Xác định URL dựa trên môi trường
      switch (env) {
        case 'pp':
          baseUrl = 'https://www.pp.iqos.com/cgi-bin/authorize.cgi';
          break;
        case 'stg':
          baseUrl = 'https://www.stg.iqos.com/cgi-bin/authorize.cgi';
          break;
        default:
          throw new Error('Invalid environment specified.'); // Thông báo lỗi nếu môi trường không hợp lệ
      }
      
      cy.session([username, password], () => {
        cy.visit(`${baseUrl}/backoffice/login.zul`);
        cy.get('a').eq(0).click()
    
        // Login to your AAD tenant.
        cy.origin(
          'login.microsoftonline.com',
          {
            args: {
              username,password
            },
          },
          ({ username, password }) => {
            cy.get('input[type="email"]').type(username, {
              log: false,
            })
            cy.get('input[type="submit"]').click()
            cy.wait(5000)
            cy.get('a').eq(0).click()
            cy.get('input[type="password"]').type(password,{
                log:false,})
            cy.get('input[type="submit"]').click()
            cy.wait(30000)
          }
        )
      });
      }
  
    function loginViaAAD_AEM(username, password, env) {   
      let baseUrl;
  
    // Xác định URL dựa trên môi trường
    switch (env) {
      case 'pp':
        baseUrl = 'https://author.pp.iqos.com';
        break;
      case 'stg':
        baseUrl = 'https://author.stg.iqos.com';
        break;
      case 'prod':
        baseUrl = 'https://author.iqos.com'; 
        break;
      default:
        throw new Error('Invalid environment specified.'); // Thông báo lỗi nếu môi trường không hợp lệ
    }
    
    cy.session([username, password, baseUrl], () => {
      cy.visit(`${baseUrl}/aem/start.html`);
  
        // Login to your AAD tenant inside cy.origin
        cy.origin(
          'login.microsoftonline.com',
          {
            args: {
              username, password
            },
          },
          ({ username, password }) => {
            // Thực hiện các hành động trong trang đăng nhập của Azure AD
            cy.get('input[type="email"]').type(username, { log: false });
            cy.get('input[type="submit"]').click();
            cy.wait(5000);
    
            // Có thể cần điều chỉnh lại logic click, nếu không có thẻ <a> thì bỏ phần này
            cy.get('a').eq(0).click();
            
            cy.get('input[type="password"]').type(password, { log: false });
            cy.get('input[type="submit"]').click();
    
            // Thêm thời gian chờ cho quá trình redirect sau khi đăng nhập
            cy.wait(15000);
          }
        );
      });
    }
    
  
    Cypress.Commands.add('loginToAAD_Hybris', (username, password, env) => {
      const log = Cypress.log({
        displayName: 'Azure Active Directory Login',
        message: [`🔐 Authenticating | ${username} ${env}`],
        autoEnd: false,
      })
      log.snapshot('before')
    
      loginViaAAD_Hybris(username, password, env)
      
    
      log.snapshot('after')
      log.end()
    })
  
  
    Cypress.Commands.add('loginToAAD_AEM', (username, password, env) => {
      const log = Cypress.log({
        displayName: 'Azure Active Directory Login',
        message: [`🔐 Authenticating | ${username} ${env}`],
        autoEnd: false,
      })
      
      log.snapshot('before')
    
      cy.session([username, password, env], () => {
        loginViaAAD_AEM(username, password, env); 
      });
    
      log.snapshot('after')
      log.end()
    })


    Cypress.Commands.add('scrollToBottomUntilLoaded', () => {
      let previousHeight = 0;
  
      function scrollToEnd() {
          return cy.window().then((win) => {
              const currentHeight = win.document.documentElement.scrollHeight;
              
              // Kiểm tra nếu chưa cuộn hết
              if (previousHeight < currentHeight) {
                  previousHeight = currentHeight;
  
                  // Cuộn xuống cuối trang
                  return cy.scrollTo('bottom', { ensureScrollable: false }).wait(500).then(scrollToEnd);
              }
          });
      }
  
      return scrollToEnd();
    });
    