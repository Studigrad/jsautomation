## Run commands
    "tests": "playwright test --workers 1",
    "tests:ui": "playwright test --ui",
    "tests:all": "playwright test --workers 1",
    "tests:headed": "playwright test --workers 1 --headed",
    "tests:debug": "playwright test --workers 1 --headed --debug",
    "tests:lambda": "playwright test --config=playwright-lambda.config.ts",
    "tests:local": "playwright test --config=playwright.config.ts --headed"

To run test on lambda just run "npm run tests:lambda" command
To change running tests u can configure projects array in playwright-lambda.config.ts