// @ts-check
import { test, expect } from '@playwright/test';
import {type Page } from '@playwright/test';
import { CreateAccPage } from '../../page-objects/CreateAccPage';
import { LoginPage } from '../../page-objects/LoginPage';
const { chromium } = require('playwright');

const newEmail = "timelyautomation+pw"
const birth = "03-26-2002"
const accessCode = "Z-Z-U-6-4-Y"
const firstName = "Ilya"
const lastName = "Studigrad"
const street = "Nezalezhnosti"
const city = "Texas"
const zip = "07400"
const phone = "3809887635"
const password = "*bstract1nheritEncapspoly"

test.describe("Playwright POC - create user",()=> {
  let page: Page;
  let loginPage : LoginPage;
  let createAccPage: CreateAccPage;

  test.beforeAll("Visit create user page",async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    createAccPage = new CreateAccPage(page);

    let stamp = Math.floor(new Date().getTime()/1000.0)
    let mail = newEmail+stamp+"@gmail.com"
    await loginPage.goto()
    await loginPage.register(mail,birth,accessCode)
  });

  test("Create user",async()=>{
    await createAccPage.createNewAccount(firstName,lastName,birth,street,city,zip,phone,password)
  })

  test.afterAll(async () => {
    await page.close();
  });

})