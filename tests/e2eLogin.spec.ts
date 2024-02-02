import { test } from "@playwright/test";
import { LoginPage } from "../page-object/LoginPage";
import { HomePage } from "../page-object/HomePage";

test.describe("e2e Test for hillel",()=>{

    test.beforeEach(async ({page,isMobile})=>{
        let loginPage = new LoginPage(page)
        await loginPage.visit("https://lms.ithillel.ua/auth")
        await loginPage.login()
    })
    
    test("Check first lesson",async ({page})=>{
        let homePage = new HomePage(page)
        await homePage.checkFirstLesson()
    })

})

