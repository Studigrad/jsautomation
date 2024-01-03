// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for scheduled therapy", () => {
  test.describe.configure({ mode: 'serial' });
  //let context: BrowserContext;
  let page1: Page;
  let page2: Page;

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  test.beforeAll(async ({browserContext}) => {
    await browserContext.grantPermissions(['microphone','camera']);
    page1 = await browserContext.newPage();
    page2 = await browserContext.newPage();

    loginPageMember = new LoginPage(page1)
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });

  test.afterAll(async ({browserContext}) => {
    await browserContext.close();
  });

  test("Login as a member ...",async()=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy visit as member", async () => {
    await homePageMember.e2egetCareFlowMedicalNow()
  });

  test("Login as a provider ...", async () => {
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Start a therapy visit ...",async()=>{
    await providerPage.startTherapy()
  })

  test("Accept visit as a member",async()=>{
    await homePageMember.acceptVisit()
  })

  test("End therapy visit",async()=>{
    await providerPage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async()=>{
    await homePageMember.skipRates()
  })

});
