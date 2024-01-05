// @ts-check
import { test, expect, chromium, BrowserContext } from '@playwright/test';
//import { test } from '../../fixture/lambdaConfig';
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

const getErrorMessage = (obj, keys) =>
    keys.reduce(
        (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

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
        'goog:chromeOptions': [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
        ],
        'ms:edgeOptions': [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
        ],
    },
};



test.describe("Playwright - Member creation and provider completion for scheduled therapy", () => {
  test.describe.configure({ mode: 'serial' });
  let browserContext: BrowserContext;
  let page1: Page;
  let page2: Page;

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  test.beforeAll(async () => {
    const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
    browserContext = await browser.newContext()
    await browserContext.grantPermissions(['camera','microphone']);
    page1 = await browserContext.newPage();
    page2 = await browserContext.newPage();

    loginPageMember = new LoginPage(page1)
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });

  test.afterAll(async ({},testInfo) => {
    const testStatus = {
      action: "setTestStatus",
      arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ["error", "message"]),
      },
  };
    await page1.evaluate(() => { },`lambdatest_action: ${JSON.stringify(testStatus)}`);
    await page1.close()
    await page2.close()
    await browserContext.close();
  });

  test("Login as a member ...",async()=>{
    await page1.bringToFront()
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy visit as member", async () => {
    await homePageMember.e2egetCareFlowMedicalNow()
  });

  test("Login as a provider ...", async () => {
    await page2.bringToFront()
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Start a therapy visit ...",async()=>{
    await providerPage.startTherapy()
  })

  test("Accept visit as a member",async()=>{
    await page1.bringToFront()
    await homePageMember.acceptVisit()
  })

  test("End therapy visit",async()=>{
    await page2.bringToFront()
    await providerPage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async({},testInfo)=>{
    await page1.bringToFront()
    await homePageMember.skipRates()
  })

});
