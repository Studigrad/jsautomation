// @ts-check
import { test } from '../../fixture/lambdaTest';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {expect, type Page } from '@playwright/test';

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

test.describe.skip("Playwright POC - member web",()=> {
    test("e2e Create User POC",async({loginPage,createAccPage})=>{
        let stamp = Math.floor(new Date().getTime()/1000.0)
        let mail = newEmail+stamp+"@gmail.com"
        await loginPage.goto()
        await loginPage.register(mail,birth,accessCode)

        await createAccPage.createNewAccount(firstName,lastName,birth,street,city,zip,phone,password)
        if(await createAccPage.isMyElementVisible(createAccPage.locators.homeText)){
          await expect(createAccPage.locators.homeText).toBeVisible()
        }
      })
})