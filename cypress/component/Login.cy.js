import React from 'react'
import Login from '../../src/components/Login'
import {store} from "../../src/store";
import {Provider} from "react-redux";
import App from "../../src/App";

const typeOptions = { delay: 35 }

describe('Login.cy.js', () => {
  it('render', () => {
    cy.mount(    <Provider store={store}>
      <Login />
    </Provider>)
    cy.get('[data-testid="login-test-open-button"]').click()
    cy.get('[data-testid=login-info]').should('have.text', 'Masz już konto? Świetnie! Podaj swoje dane.')
  })
})

describe('Login.cy.js', () => {
  it('unhappy path', () => {
    cy.mount(    <Provider store={store}>
      <Login />
    </Provider>)
    cy.get('[data-testid="login-test-open-button"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`something went wrong`)
    })
  })
})

describe('Login.cy.js', () => {
  it('happy path - correct login data', () => {
    cy.mount(    <Provider store={store}>
      <Login />
    </Provider>)

    cy.get('[data-testid="login-test-open-button"]').click()

    cy.get('[data-testid="login-test-email"]').type('www', typeOptions)
    cy.get('[data-testid="login-test-password"]').type('www', typeOptions)

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`login was successful`)
    })
  })
})

describe('Login.cy.js', () => {
  it('happy path - incorrect login data', () => {
    cy.mount(    <Provider store={store}>
      <Login />
    </Provider>)

    cy.get('[data-testid="login-test-open-button"]').click()

    cy.get('[data-testid="login-test-email"]').type('test@test.com', typeOptions)
    cy.get('[data-testid="login-test-password"]').type('111', typeOptions)

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`something went wrong`)
    })
  })
})

describe('Login.cy.js', () => {
  it('cancel button', () => {
    cy.mount(    <Provider store={store}>
      <Login />
    </Provider>)
    cy.get('[data-testid="login-test-open-button"]').click()
    cy.get('[data-testid=login-info]').should('have.text', 'Masz już konto? Świetnie! Podaj swoje dane.')
    cy.get('[data-testid="login-test-cancel-button"]').click()
    cy.get('[data-testid=login-info]').should('not.be.visible');
  })
})
