// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { setTestStatus } from '../../helpers/helpers';
dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe.skip("Playwright - Member creation and provider completion for scheduled Counseling therapy", () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page1: Page;
  let page2: Page;
  let pages: Page[] = [];

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  let date: string;
  let time: string;

  test.beforeAll(async ({browserContext}) => {
    context = browserContext
    page1 = await browserContext.newPage();
    page2 = await browserContext.newPage();

    pages.push(page1)
    pages.push(page2)

    loginPageMember = new LoginPage(page1)
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });

  test.afterAll(async ({},testInfo) => {
    await setTestStatus(testInfo, pages, context);
  });

  test("Login as a provider ...", async () => {
    await page2.bringToFront()
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Close existing visits ...", async () => {
    await providerPage.closeLastVisits()
   });
  
  test("Playwright - Member creation and provider completion for scheduled Counseling therapy",async()=>{
    await page1.bringToFront()
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new Counselling therapy visit as member", async () => {
    [date,time] = await homePageMember.e2eGetCareFlowCounselingOrCoaching("counseling")
  });


  test("Start a Counselling therapy visit ...",async()=>{
    await providerPage.startScheduledTherapy(date,time)
  })

  test("Accept Counselling visit as a member",async()=>{
    await homePageMember.deleteCard("scheduled")
  })

  // test("End therapy visit",async()=>{
  //   await providerPage.endTalklNowTherapy()
  // })

  // test("Member rate skipping",async()=>{
  //   await homePageMember.skipRates()
  // })

});
