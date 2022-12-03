/// <reference types="cypress" />

describe('Game Recommender Register User', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit(process.env.REACT_APP_CLIENT_BASE_URL || 'http://localhost:3000')
    })

    it('should register user', () => {
        const email = 'Test' + Math.floor(Math.random() * 100000) + '@gmail.com'
        const password = 'Test@123'
        const name = 'Test'

        cy.get('[data-testid=register-button-login]').click()
        cy.get('[data-testid=login-button]').should('not.exist')

        cy.get('[data-testid=email-address]').type(`${email}`)
        cy.get('[data-testid=password]').type(`${password}`)
        cy.get('[data-testid=name]').type(`${name}`)
        cy.get('[data-testid=register-button]').click()

        cy.get('[data-testid=register-button]').should('not.exist')
        cy.get('[data-testid=login-button-successful-register]').should('exist')

        cy.get('[data-testid=login-button-successful-register]').click()

        cy.get('[data-testid=login-button-successful-register]').should('not.exist')
        cy.get('data-testid=login-button').should('exist')

        cy.login(email, password)

        cy.get('[data-testid=login-button]').should('not.exist')
    })

    it('should verify password requirements', () => {
        const no_caps_password = 'test@123'
        const no_num_password = 'test@'
        const no_num_caps_password = 'test'
        const valid_password = 'Test@123'

        cy.get('[data-testid=register-button-login]').click()
        cy.get('[data-testid=password]').focus()
        cy.get('[data-testid=password]').type(`${no_caps_password}`)
        cy.get('[data-testid=pwdnote]').should('be.visible')
        cy.get('[data-testid=password]').type(`${no_num_password}`)
        cy.get('[data-testid=pwdnote]').should('be.visible')
        cy.get('[data-testid=password]').type(`${no_num_caps_password}`)
        cy.get('[data-testid=pwdnote]').should('be.visible')
        cy.get('[data-testid=password]').type(`${valid_password}`)
        cy.get('[data-testid=pwdnote]').should('not.be.visible')
    })
})

