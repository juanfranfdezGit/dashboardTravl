describe('Login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('login con credenciales válidas', () => {
    cy.get('input#username').type('admin'); 
    cy.get('input#password').type('admin'); 

    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
  });

  it('rechaza credenciales incorrectas', () => {
    cy.get('input#username').type('admin4124');
    cy.get('input#password').type('admin124124');

    cy.contains('Login').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Credenciales incorrectas');
    });

    cy.url().should('include', '/');
  });
});