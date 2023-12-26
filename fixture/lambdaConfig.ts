import { chromium, test as base, Page } from "@playwright/test";
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import path from "path"

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

      export const test = base.extend({
        browserContext: async ({}, run, testInfo) => {
            let fileName = testInfo.file.split(path.sep).pop();
                modifyCapabilities(
                    testInfo.project.name,
                    `${testInfo.title} - ${fileName}`
                );
            const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
            const context = await browser.newContext(testInfo.project.use)
            await context.grantPermissions(['microphone','camera']);
            await run(context);
            const testStatus = {
                action: "setTestStatus",
                arguments: {
                    status: testInfo.status,
                    remark: getErrorMessage(testInfo, ["error", "message"]),
                },
            };
        }
      });
