import { BrowserContext, Page, test as baseTest } from "@playwright/test";
import { LoginPage } from "../page-object/LoginPage";
import { HomePage } from "../page-object/HomePage";
import { chromium } from "@playwright/test";

type basePage = {
  loginPage: LoginPage,
  homePage: HomePage,
  browserContext: BrowserContext,
  page: Page,
  number7:number
}

export const test = baseTest.extend<basePage>({
      browserContext:async ({}, use) => {
        let browser = await chromium.launch()
    
        let context = await browser.newContext()
        await use(context);
      },
    page: async ({browserContext}, use) => {
        let page = await browserContext.newPage()
        await use(page);
        console.log(page.isClosed())
        
      },
    homePage: async ({page}, use) => {
        let loginPage = new LoginPage(page)
        await loginPage.visit("https://lms.ithillel.ua/auth")
        await loginPage.login()
        let homePage = new HomePage(page)
        await use(homePage);
      },
      loginPage: async ({page}, use) => {
        console.log("Before loginPage was created")
        let loginPage = new LoginPage(page)
        await use(loginPage);
        console.log("After loginPage was created")
      },
      number7: async({},use)=>{
        await use(7);
      }
})
