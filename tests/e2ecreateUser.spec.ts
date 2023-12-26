// @ts-check
import { test, expect } from '@playwright/test';
import {type Page } from '@playwright/test';
import { CreateAccPage } from '../page-objects/CreateAccPage';
import { LoginPage } from '../page-objects/LoginPage';
const { chromium } = require('playwright');

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

test.describe.only("Playwright POC - create user",()=> {
  let page: Page;
  let loginPage : LoginPage;
  let createAccPage: CreateAccPage;

  test.beforeAll("Visit create user page",async () => {
    const proxyServer = 'proxy.pbank.com.ua:8080';

    // Launch a browser with the proxy configuration
    const browser = await chromium.launch({
      proxy: {
        server: proxyServer,
        username: 'DN260302SIV',
        password: 'Il0988763518',
      },
    });
    
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    createAccPage = new CreateAccPage(page);

    let stamp = Math.floor(new Date().getTime()/1000.0)
    let mail = newEmail+stamp+"@gmail.com"
    await loginPage.goto()
    await loginPage.register(mail,birth,accessCode)
    //await expect(createAccPage.header).toBeVisible()
  });

  test("Create user",async()=>{
    await createAccPage.createNewAccount(firstName,lastName,birth,street,city,zip,phone,password)
    //await expect(createAccPage.locators.homeText).toBeVisible()
  })

  test.afterAll(async () => {
    await page.close();
  });

})