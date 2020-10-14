// https://docs.cypress.io/api/introduction/api.html

describe('E2E testing', done => {
  it('Contains ul, .clickable and checkbox after data loads', () => {
    cy.visit('/');
    setTimeout(() => {
      cy.contains('ul');
      cy.contains('.clickable');
      cy.contains('input[type=checkbox]');
    }, 3000);
  });
});
