// @ts-check
import { test, expect, chromium, BrowserContext } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for Medical Now therapy", () => {
  test.describe.configure({ mode: 'serial' });
  let context: BrowserContext;
  let page1: Page;
  let page2: Page;

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext()
    await context.grantPermissions(['microphone','camera']);
    page1 = await context.newPage();
    page2 = await context.newPage();

    loginPageMember = new LoginPage(page1)
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });

  test.afterAll(async () => {
    await context.close();
  });

  // test("Delete visit if exists ...",async()=>{
  //   await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  //   await providerPage.closeExistingVisit()
  // })

  test("Login as a member ...",async()=>{
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy Medical Now visit as member", async () => {
    await homePageMember.e2egetCareFlowMedicalNow()
  });

  test("Login as a provider ...", async () => {
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Start a Medical Now therapy visit ...",async()=>{
    await providerPage.startTherapy()
  })

  test("Accept Medical Now visit as a member",async()=>{
    await homePageMember.acceptVisit()
  })

  test("End Medical Now therapy visit",async()=>{
    await providerPage.endMedicalNowTherapy()
  })

  test("Member rate skipping for Medical Now",async()=>{
    await homePageMember.skipRates()
  })

});
