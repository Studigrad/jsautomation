// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { CreateAccPage } from '../../page-objects/CreateAccPage';
import { setTestStatus } from '../../helpers/helpers';

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

const newEmail = "timelyautomation+pw"
const birth = "03-26-2002"
const accessCode = "Z-Z-U-6-4-Y"
const firstName = "Ilya"
const lastName = "Studigrad"
const street = "Nezalezhnosti"
const city = "Brovary"
const zip = "07400"
const phone = "3809887635"
const password = "*bstract1nheritEncapspoly"

test.describe("Playwright - User creation and provider completion for ondemand therapy", () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page1: Page;
  let page2: Page;
  let pages: Page[] = [];

  let loginPageMember: LoginPage;
  let loginPageProvider: LoginPage;

  let homePageMember: HomePage;
  let providerPage: ProviderHomePage;

  let createAccPage: CreateAccPage;
  
  test.beforeAll(async ({browserContext}) => {
    context = browserContext
    page1 = await browserContext.newPage();
    page2 = await browserContext.newPage();

    pages.push(page1)
    pages.push(page2)

    loginPageMember = new LoginPage(page1);
    createAccPage = new CreateAccPage(page1);
    homePageMember = new HomePage(page1)

    loginPageProvider = new LoginPage(page2)
    providerPage = new ProviderHomePage(page2)
  });


  test.afterAll(async ({},testInfo) => {
    await setTestStatus(testInfo, pages);
  });

  test("Login as a provider ...", async () => {
    await page2.bringToFront()
    await loginPageProvider.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Close existing visits", async () => {
    await providerPage.closeLastVisits()
   });

  test("Playwright - User creation and provider completion for ondemand therapy",async()=>{
    await page1.bringToFront()
    let stamp = Math.floor(new Date().getTime()/1000.0)
    let mail = newEmail+stamp+"@gmail.com"
    await loginPageMember.goto()
    await loginPageMember.register(mail,birth,accessCode)
    await createAccPage.createNewAccount(firstName,lastName,birth,street,city,zip,phone,password)
  })

  test("Create new therapy visit as member", async () => {
    await homePageMember.newUserGetCare()
  });

  test("Start a therapy visit ...",async()=>{
    await page2.bringToFront()
    await providerPage.startTherapy()
  })

  test("Accept visit as a member",async()=>{
    await homePageMember.acceptVisit()
    //await page2.pause()
  })

  test("End therapy visit",async()=>{
    await providerPage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async()=>{
    await homePageMember.skipRates()
  })

});
