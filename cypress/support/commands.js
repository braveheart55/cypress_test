// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('isEmpty', (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({})
})
Cypress.Commands.add('assertJsonEquals', (expectedJson, actualJson) => {
    for (var key of Object.keys(expectedJson)) {
        if (JSON.stringify(expectedJson[key]) === JSON.stringify({})) {
            cy.log("Empty value for key '" + key + "'")
        } else {
            cy.log(key + " => Expected: '" + expectedJson[key] + "' Actual: '" + actualJson[key] + "'")
            expect(actualJson).has.property(key, expectedJson[key])
        }
    }
})