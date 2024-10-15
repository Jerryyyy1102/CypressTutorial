// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')




function loginViaAAD(username, password) {
    cy.visit('https://backoffice.pp.iqos.com/backoffice/login.zul')
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
  }


  Cypress.Commands.add('loginToAAD', (username, password) => {
    const log = Cypress.log({
      displayName: 'Azure Active Directory Login',
      message: [`🔐 Authenticating | ${username}`],
      autoEnd: false,
    })
    log.snapshot('before')
  
    loginViaAAD(username, password)
  
    log.snapshot('after')
    log.end()
  })
  