/* eslint-disable no-undef */
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue2";
import Vuetify from "vuetify";
import Vue from "vue";
import { VApp } from "vuetify/lib/components/VApp";
Vue.use(Vuetify);

Cypress.Commands.add("mount", (component, args) => {
  args.vuetify = new Vuetify();
  return mount({ render: (h) => h(VApp, [h(component, args)]) }, args);
});

// Example use:
// cy.mount(MyComponent)
