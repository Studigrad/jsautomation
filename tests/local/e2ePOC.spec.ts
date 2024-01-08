// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';
import { Member } from '../../page-objects/Member';

const email = "timely.bot.member.1@gmail.com"
const pass = "Test12345@"

test.describe("Playwright POC - member web",()=> {
  let page: Page;
  let member: Member

  test.beforeAll("Login Test",async ({ browser }) => {
    page = await browser.newPage();
    member = new Member(page)

    await member.loginPage.loginAsMember(email,pass)
  });

  test("e2e Get care POC",async()=>{
    await member.homePage.e2egetCareFlowTalkNow()
    await member.homePage.deleteCard("demand")
  })

  test.afterAll(async () => {
    await page.close();
  });

})

