const { italic, cyan } = require("ansi-colors")



describe('Rest API Get Request', () => {

    // it("Test GET Request " +  Cypress.env('$testname'), () => {
    // ^^ using the env variables here shows misleading information.  Don't do it
    it("Test GET Request ", () => {

        var url = Cypress.env('$url')
        var expectedReturnCode = parseInt(Cypress.env('$expectedreturncode'))
        cy.log("=================== " + Cypress.env('$testname') + " ===================")
        cy.log("jsonresponsefile: " + Cypress.env('$jsonresponsefile'))
        cy.log("expectedReturnCode: " + expectedReturnCode)
        cy.readFile(Cypress.env('$jsonresponsefile')).then(expectedJson => {
            cy.log("expectedJson: " + JSON.stringify(expectedJson, undefined, 2))
            cy.request({ url: url, failOnStatusCode: false })
                .then((response) => {
                    cy.log("ActualJson:\n" + JSON.stringify(response.body, null, 2))  
                    expect(response.status).equal(expectedReturnCode)
                    // cy.assertJsonEquals(expectedJson, response.body)
                    expect(response.body).to.deep.equal(expectedJson)
                    if (expectedReturnCode != 200) {
                        cy.log("Negative test case")
                    }
                })
        })
    })
})


