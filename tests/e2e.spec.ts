// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import {type Page } from '@playwright/test';

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright POC - member web",()=> {
  let page: Page;
  let loginPage : LoginPage
  let homePage : HomePage

  test.beforeAll("Login Test",async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await loginPage.loginAsMember(email,pass)
  });

  test("e2e Get care POC",async()=>{
    await homePage.e2egetCareFlow()
    await homePage.deleteCard()
  })

  test.afterAll(async () => {
    await page.close();
  });

})

