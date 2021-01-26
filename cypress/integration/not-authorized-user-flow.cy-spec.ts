/// <reference types="Cypress" />

describe('Not authorized flow', () => {
  it('should display the app name on the left corner of home page', () => {
    cy.visit('/'); // go to the home page

    const title = 'Angular Weather App';

    // get the element and verify that the app name is in it
    cy.get('#top-bar-title').should('contain', title);
  });

  it('should display help message to log in on the home page', () => {
    cy.visit('/'); // go to the home page

    // get the element and verify that the help message is in it
    cy.get('.home-message').should(($h3) => {
      expect($h3).to.have.text('Please, Log in by clicking on the button above to proceed!');
    });
  });

  it('should have Log in button on the right corner of home page', () => {
    cy.visit('/'); // go to the home page

    // get the element and verify that the Log in button is in it
    cy.get('#login-button').should('contain', 'LOG IN');
  });

  it('should be redirected form a restricted  route to home page\'', () => {
    cy.visit('country-list').then(() => {
      cy.url().should('eq', 'http://localhost:4200/');
    });

    cy.visit('city-list/DE').then(() => {
      cy.url().should('eq', 'http://localhost:4200/');
    });

    cy.visit('user-profile').then(() => {
      cy.url().should('eq', 'http://localhost:4200/');
    });
  });
})
;
