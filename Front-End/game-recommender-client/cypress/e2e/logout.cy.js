/// <reference types="cypress" />

describe('Game Recommender Logout User', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit(process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3000')
    })

    it('should logout user', () => {
        const email = 'Test@gmail.com'
        const password = 'Test@123'

        cy.login(email, password)

        cy.get('[data-testid=login-button]').should('not.exist')
        cy.get('[data-testid=logout-button]').click()
        cy.get('[data-testid=logout-button]').should('not.exist')
    })
})
