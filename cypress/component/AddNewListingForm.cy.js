import React from 'react'
import AddNewListingForm from '../../src/components/AddNewListingForm'
import {store} from "../../src/store";
import {Provider} from "react-redux";

const typeOptions = { delay: 35 }

describe('Login.cy.js', () => {
  it('render', () => {
    cy.mount(    <Provider store={store}>
      <AddNewListingForm />
    </Provider>)
    cy.get('[data-testid="test-new-listing"]').should('have.text', 'Dodaj nowe ogłoszenie')

    cy.get('[data-testid="listing-image-add"]').selectFile('karta.jpeg')
    cy.get('[data-testid="listing-name"]').type('samochod', typeOptions)
    cy.get('[data-testid="listing-category"]').click();
    cy.contains("Motoryzacja").then((option) => {
      option[0].click();
    })
    cy.get('[data-testid="listing-price"]').type('123', typeOptions)
    cy.get('[data-testid="listing-desc"]').type('super fura', typeOptions)
    cy.get('[data-testid="listing-location"]').type('50,21', typeOptions)
    cy.get('[data-testid="listing-phone"]').type('212321321', typeOptions)
    cy.get('[data-testid="listing-email"]').type('test@mail.com', typeOptions)
    cy.get('[data-testid="listing-submit"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.not.equal(`something went wrong`)
    })
  })
})
/*
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
*/