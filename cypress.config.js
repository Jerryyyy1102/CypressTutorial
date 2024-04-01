const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId:"CypressTutorial",
    specPattern:"./cypress/Practice/**.*",
    baseUrl:"https://www.bachhoaxanh.com/"
  },
});
