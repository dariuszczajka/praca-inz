import React from 'react'
import Register from '../../src/components/Register'

const typeOptions = { delay: 35 }

describe('Register.cy.js', () => {
  it('render', () => {
    cy.mount(<Register />)
    cy.get('[data-cy=create-account]').click()
    cy.get('[data-cy=register-info]').should('have.text', 'Hej! Świetnie Cię widzieć! Powiedz nam coś o sobie.')
  })
})

describe('Register.cy.js', () => {
  it('register unhappy path', () => {
    cy.mount(<Register />)
    cy.get('[data-cy=create-account]').click()

    cy.get('[data-testid=register-test-email-disabled]').should('be.visible')
  })
})

describe('Register.cy.js', () => {
  it('register happy path', () => {
    cy.mount(<Register />)
    cy.get('[data-cy=create-account]').click()

    cy.get('[data-testid=register-test-email]').type('test@test.com', typeOptions)
    cy.get('[data-testid=register-test-username]').type('user', typeOptions)
    cy.get('[data-testid=register-test-password]').type('p@ssw0rD', typeOptions)
    cy.get('[data-testid=register-test-location]').type('Warszawa', typeOptions)
    cy.get('[data-testid=register-test-phone]').type('222111343', typeOptions)
    cy.get('[data-testid=register-test-checkbox]').parent().click();

    cy.get('[data-testid=register-test-email-enabled]').should('be.visible')
  })
})

describe('Register.cy.js', () => {
  it('unchecked checkbox', () => {
    cy.mount(<Register />)
    cy.get('[data-cy=create-account]').click()

    cy.get('[data-testid=register-test-email]').type('test@test.com', typeOptions)
    cy.get('[data-testid=register-test-username]').type('user', typeOptions)
    cy.get('[data-testid=register-test-password]').type('p@ssw0rD', typeOptions)
    cy.get('[data-testid=register-test-location]').type('Warszawa', typeOptions)
    cy.get('[data-testid=register-test-phone]').type('222111343', typeOptions)
    cy.get('[data-testid=register-test-checkbox]').parent().click();

    cy.get('[data-testid=register-test-checkbox]').parent().click();

    cy.get('[data-testid=register-test-email-disabled]').should('be.visible')
  })
})

