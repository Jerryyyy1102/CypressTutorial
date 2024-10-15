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
      const compareConfigs = (dev, staging) => {
        const differences = [];
        Object.keys(dev).forEach((key) => {
          if (dev[key] !== staging[key]) {
            differences.push({
              key: key,
              devValue: dev[key],
              stagingValue: staging[key],
            });
          }
        });
        return differences;
      };
  
      const differences = compareConfigs(devConfig, stagingConfig);
  
      if (differences.length > 0) {
        cy.log('Configuration Differences Found:', JSON.stringify(differences, null, 2));
        throw new Error(`Found ${differences.length} differences in configurations`);
      }
    });
  });
  