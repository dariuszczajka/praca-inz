import React from "react";
import {Provider} from "react-redux";
import {store} from "../../src/store";
import Login from "../../src/components/Login";
import "cypress-localstorage-commands";

const typeOptions = { delay: 35 }



describe('end-to-end', () => {

    it('clear data', () => {
        cy.restoreLocalStorage();
    })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })

  })

    it('login', () => {
        cy.get('[data-testid="login-test-open-button"]').click()

        cy.get('[data-testid="login-test-email"]').type('aaa', typeOptions)
        cy.get('[data-testid="login-test-password"]').type('aaa', typeOptions)

        cy.get('[data-testid="login-test-submit"]').click()
        cy.on('window:alert', (str) => {
            expect(cy.getLocalStorage('loggedUser').status).to.equal('ok');
            cy.setLocalStorage("user", cy.getLocalStorage('loggedUser'));
        })
    })

    it('add new listing', () => {
        cy.get('[data-testid="login-test-open-button"]').click()

        cy.get('[data-testid="login-test-email"]').type('aaa', typeOptions)
        cy.get('[data-testid="login-test-password"]').type('aaa', typeOptions)

        cy.get('[data-testid="login-test-submit"]').click()
        cy.get('[data-testid="add-listing-button"]').click()

        cy.get('[data-testid="test-new-listing"]').should('have.text', 'Dodaj nowe ogłoszenie')

        cy.get('[data-testid="listing-image-add"]').selectFile('karta.jpeg')
        cy.get('[data-testid="listing-name"]').type('samochod', typeOptions)
        cy.get('[data-testid="listing-category"]').click();
        cy.contains("Motoryzacja").then((option) => {
            option[0].click();
        })
        cy.get('[data-testid="listing-price"]').type('123', typeOptions)
        cy.get('[data-testid="listing-desc"]').type('super fura', typeOptions)
        cy.get('body').click(50, 50, { force: true })
        cy.get('[data-testid="listing-phone"]').type('212321321', typeOptions)
        cy.get('[data-testid="listing-email"]').type('test@mail.com', typeOptions)
        cy.get('[data-testid="listing-submit"]').click()

        cy.wait(1000)
        cy.reload()

    })

    it('searchbar', () => {
        cy.get('[data-testid="search-bar"]').type('iphone', typeOptions);
        cy.wait(1000);
        cy.get('div').contains('iphone', { matchCase: false })
    })

    it('filters - city', () => {
        cy.get('[data-testid="filter-button"]').click()
        cy.get('[data-testid="filter-city"]').type('tarnów', typeOptions);
        cy.get('body').click(0,0);
        cy.get('div').contains('iphone', { matchCase: false }).should('not.exist');
    })

    it('filters - price', () => {
        cy.get('[data-testid="filter-button"]').click()
        cy.get('[data-testid="filter-price"]').type('300', typeOptions);
        cy.get('body').click(0,0);
        cy.get('div').contains('samochod', { matchCase: false }).should('not.exist');
    })

    it('delete offer - button show', () => {
        cy.get('[data-testid="single-offer"]').first().click()
        cy.get('div').contains('usuń', { matchCase: false }).should('not.exist');
    })

    it('delete offer - api delete', () => {
        cy.get('[data-testid="login-test-open-button"]').click()

        cy.get('[data-testid="login-test-email"]').type('aaa', typeOptions)
        cy.get('[data-testid="login-test-password"]').type('aaa', typeOptions)

        cy.get('[data-testid="login-test-submit"]').click()
        cy.on('window:alert', (str) => {
            expect(cy.getLocalStorage('loggedUser').status).to.equal('ok');
            cy.setLocalStorage("user", cy.getLocalStorage('loggedUser'));
        })

        cy.get('[data-testid="single-offer"]').filter(':contains("samochod")').first().click();
        cy.get('div').contains('usuń', { matchCase: false })
    })
})
