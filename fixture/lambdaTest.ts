// @ts-check
import { chromium, test as baseTest } from "@playwright/test";
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import path from "path"
import { CreateAccPage } from "../page-objects/CreateAccPage";

type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    createAccPage: CreateAccPage;
}

// LambdaTest capabilities
const username = "ilya.s"
const accessKey = "P0jpl705uQDWihcRe4hGq92MT2ddwRZl2izn33XYB5nGISG2A8"

const capabilities = {
  browserName: "Chrome", // default values, Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
      platform: "Windows 10",
      build: "Playwright Test Build",
      name: "Playwright Test",
      user: username,
      accessKey: accessKey,
      network: true,
      video: true,
      console: true,
      tunnel: false, // Add tunnel configuration if testing locally hosted webpage
      tunnelName: "", // Optional
      geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
  },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
    let config = configName.split("@lambdatest")[0];
    let [browserName, browserVersion, platform] = config.split(":");
    capabilities.browserName = browserName
        ? browserName
        : capabilities.browserName;
    capabilities.browserVersion = browserVersion
        ? browserVersion
        : capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = platform
        ? platform
        : capabilities["LT:Options"]["platform"];
    capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) =>
    keys.reduce(
        (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

    const testPages = baseTest.extend<pages>({
        page: async ({}, use, testInfo) => {
            let fileName = testInfo.file.split(path.sep).pop();
            if (testInfo.project.name.match(/lambdatest/)) {
                modifyCapabilities(
                    testInfo.project.name,
                    `${testInfo.title} - ${fileName}`
                );

            const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
            const context = await browser.newContext(testInfo.project.use)
            await context.grantPermissions(['microphone','camera']);
            const lmdPage = await context.newPage()
            await use(lmdPage)
            const testStatus = {
                    action: "setTestStatus",
                    arguments: {
                        status: testInfo.status,
                        remark: getErrorMessage(testInfo, ["error", "message"]),
                    },
                };
            await lmdPage.evaluate(() => { },`lambdatest_action: ${JSON.stringify(testStatus)}`);
            await lmdPage.close()
            await context.close()
            await browser.close()
            } else {
                const browser = await chromium.launch();
                const context = await browser.newContext();
                const page = await context.newPage()
                await use(page);
            }
        },
        loginPage: async ({ page }, use) => {
            await use(new LoginPage(page));
        },
        homePage: async ({ page }, use) => {
            await use(new HomePage(page));
        },
        createAccPage: async ({ page }, use) => {
            await use(new CreateAccPage(page));
        },
    })


export const test = testPages;
