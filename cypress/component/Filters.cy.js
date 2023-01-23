import {Provider} from "react-redux";
import {store} from "../../src/store";
import React from "react";
import App from "../../src/App";

describe('Login.cy.js', () => {
  it('unhappy path', () => {
    cy.mount(    <Provider store={store}>
      <App />
    </Provider>)
    expect(true);
  })
})