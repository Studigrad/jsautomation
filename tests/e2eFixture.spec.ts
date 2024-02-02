import { test } from "../fixtures/fixture";
import { HomePage } from "../page-object/HomePage";
import { LoginPage } from "../page-object/LoginPage";

test.describe.only("e2e Test for hillel",()=>{

    test("Check first lesson",async ({page,homePage,number7})=>{
        await homePage.checkFirstLesson()
        await homePage.header.profile.click()
    })

})

