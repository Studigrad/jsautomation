// @ts-check
import { chromium, test as base, Page, BrowserContext } from "@playwright/test";
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import path from "path"
import { ProviderHomePage } from "../page-objects/ProviderHomePage";

type pages = {
    loginPageMember: LoginPage;
    loginPageProvider: LoginPage;
    homePageMember: HomePage;
    providerPage: ProviderHomePage;
    browserContext: BrowserContext;
    testHook: void
}

// LambdaTest capabilities
const username = "ilya.s"
const accessKey = "P0jpl705uQDWihcRe4hGq92MT2ddwRZl2izn33XYB5nGISG2A8"

const capabilities = {
    "browserName": "Chrome",
    "browserVersion": "latest",
    "LT:Options": {
        "platform": "Windows 10",
        "build": "Playwright Test",
        "name": "Playwright Lambda Test",
        "user":username,
        "accessKey":accessKey,
        "network": true,
        "console": true,
        "idleTimeout": 50,
        'goog:chromeOptions': [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
        ],
        'ms:edgeOptions': [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
        ]
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

const getErrorMessage = (obj: any, keys: any[]) =>
    keys.reduce(
        (obj: { [x: string]: any; }, key: string | number) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );
//<{ testHook: void,browserContext: any }>
      export const test = base.extend<pages>({
        // testHook: [
        //     async ({}, use) => {
        //       console.log("BEFORE EACH HOOK FROM FIXTURE");
        
        //       await use();
        
        //       console.log("AFTER EACH HOOK FROM FIXTURE");
        //     },
        //     { auto: true },
        //   ],
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
                }else{
                    const browser = await chromium.launch();
                    const context = await browser.newContext();
                    await context.grantPermissions(['camera','microphone']);
                    const page = await context.newPage()
                    await use(page);
                }
        },
        loginPageMember: async ({ page }, use) => {
            await use(new LoginPage(page));
        },
        loginPageProvider: async ({ page }, use) => {
            await use(new LoginPage(page));
        },
        homePageMember: async ({ page }, use) => {
            await use(new HomePage(page));
        },
        providerPage: async ({ page }, use) => {
            await use(new ProviderHomePage(page));
        },
    });
