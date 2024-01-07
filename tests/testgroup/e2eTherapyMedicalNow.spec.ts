// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { setTestStatus } from "../../helpers/helpers";
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';
import 'dotenv/config';
import setCurrentTestInfo from '@playwright/test';

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for MedicalNow therapy", () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page1: Page;
  let page2: Page;
  let pages: Page[] = [];
  
  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

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

  test("Playwright - Member creation and provider completion for MedicalNow therapy",async()=>{
    await page1.bringToFront()
    await loginPageMember.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy visit as member", async () => {
    await homePageMember.e2egetCareFlowMedicalNow()
  });


  test("Start a therapy visit ...",async()=>{
    await page2.bringToFront()
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

  test("Member rate skipping",async()=>{
    await page1.bringToFront()
    await homePageMember.skipRates()
  })

});



