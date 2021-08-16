# Cypress Tests

Provides an example POC for cypress test automation against Zuora APIs

# Resources
https://docs.cypress.io/guides/overview/why-cypress
https://www.velotio.com/engineering-blog/full-stack-qa-testing-using-cypress
https://example.cypress.io/ (kitchen sink testing app)
https://www.pixelite.co.nz/article/json-api-testing-with-cypress/
https://cypress.io/blog/tag/tutorials/
https://medium.com/@you54f/dynamically-generate-data-in-cypress-from-csv-xlsx-7805961eff55
https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__csv-table/README.md
https://www.constellation.xyz/docs/#/example
https://gitter.im/cypress-io/cypress (cypress chat room)
https://github.com/bahmutov/cy-spok 
https://github.com/thlorenz/spok#readme
https://www.ryanjyost.com/advanced-cypress-tips/
https://www.npmjs.com/package/@constellation-cloud/core

# Installation
```
cd cypress_test
npm install cypress --save-dev
npm install --save-dev @constellation-cloud/core
npm i --save-dev cypress-mochawesome-reporter
```
# Running tests interactively
```
$(npm bin)/cypress open
```
From there use the cypress UI to select the desired test and run.  When editing a test, the entire suite is run on save action, when cypress is running in this fashion

# Running tests on the commandline
```
npx cypress run -spec "cypress/integration/zuora_mock_spec.js" --headless
```
![cypress cli run](./cypress/screenshots/cypress_screenshot.png)
with mochawesome report
```
npx cypress run --spec cypress/integration/zuora_mock_dd3_spec.js --record false --reporter mochawesome --headless
```

# Data driven tests with constellation
These tests are data driven (dd) 
* cypress/integration/dd_test1_spec.js
* cypress/integration/dd_test2_spec.js

The pairing of test -> csv file is found in constellation.json, where the convention is the <testname>_spec.js matches <testname>.csv

Constellation uses a csv file located in `constellation/data` to drive data realized as Cypress.env variables used in the test.  The header row defines the variable names, and each subsequent row should be a distinct test run. 

The spec file `dd_test1_spec.js` is a data driven test where a name, url expected json file, and expected return code are provided in a csv file to drive the test  Expected json responses are stored in `constellation/data/json`.  An experimental custom json validation function assertJsonEquals is defined in support/commands.js which will compare two json structures.  Calls to assertJsonEquals are commented out. 

### Run data driven tests on the commandline
```
npx constellation --data-file constellation/data/dd_test1.csv --spec cypress/integration/dd_test1_spec.js  --reporter mochawesome
npx constellation --data-file constellation/data/dd_test2.csv --spec cypress/integration/dd_test2_spec.js  --reporter mochawesome
```
### The results 
test3_fail_body_mismatch fails, but it is not evident what the mismatch is from the available output in cypress.
test3_fail_body_mismatch should fail when run from the commandline above as it does in interactive mode, but it passes with a false positive

### Issues:
1. Cypress console log is lost in headless run
2. Data Driven Tests deliver false positives when a test fails 
3. Parameters to a test are not printed in the log to differentiate one data driven test from another
4. Html report from mochawesome only shows code snippet
4. deep.equal does not show exact failure.

### Related open issues:
https://github.com/cypress-io/cypress/issues/448 

https://github.com/cypress-io/cypress/issues/8823 

https://github.com/cypress-io/cypress/issues/4084 
