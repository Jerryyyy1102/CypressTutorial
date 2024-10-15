describe('Compare Configuration Between Environments', () => {
    let devConfig;
    let stagingConfig;
  
    before(() => {
      // Fetch configuration from DEV environment
      cy.request(Cypress.env('devUrl')).then((response) => {
        devConfig = response.body;
      });
  
      // Fetch configuration from STAGING environment
      cy.request(Cypress.env('stagingUrl')).then((response) => {
        stagingConfig = response.body;
      });
    });
  
    it('should have matching configurations between environments', () => {
      // Compare the configurations
      expect(devConfig).to.deep.equal(stagingConfig);
    });
  });
  