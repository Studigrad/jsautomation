import { test as baseTest, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../page-object/LoginPage';

type TestType ={
    loginPage: LoginPage,
    page: {
        page1: Page,
        page2:Page
    }
}

export const test = baseTest.extend<TestType>({
    page: async ({}, use, testInfo) => {
        let browser = await chromium.launch({headless:true})
        let context = await browser.newContext()
        let page1 = await context.newPage()
        let page2 = await context.newPage()

        await use({page1,page2})
    },
    loginPage: async ({page}, use, testInfo) => {
        let loginPage = new LoginPage(page.page1)
        await use(loginPage)
    },
})