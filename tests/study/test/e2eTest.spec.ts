import { test } from '../fixture/fixture';
import exp from 'node:constants';
import { before } from 'node:test';
import { LoginPage } from '../page-object/LoginPage';

test("Login",async({loginPage,page})=>{
    await page.page1.goto("https://lms.ithillel.ua/auth")
    await page.page2.goto("https://lms.ithillel.ua/auth")
    await loginPage.login()
})


