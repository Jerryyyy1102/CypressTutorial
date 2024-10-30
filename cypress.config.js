const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
      
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    projectId:"CypressTutorial",
    specPattern:"./cypress/e2e/IQOS/**.*",
    baseUrl:"https://backoffice.pp.iqos.com/backoffice/"
  },
});
