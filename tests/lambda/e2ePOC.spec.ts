// @ts-check
import { test } from '../../fixture/lambdaTest';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {type Page } from '@playwright/test';

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe.skip("Playwright POC - member web",()=> {
    test("e2e Get care POC",async({loginPage,homePage})=>{
        await loginPage.loginAsMember(email,pass)
        await homePage.e2egetCareFlowMedicalNow()
        await homePage.deleteCard("demand")
      })
      
    
})

