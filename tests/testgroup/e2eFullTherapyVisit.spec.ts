// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { setTestStatus } from '../../helpers/helpers';
import { Member } from '../../page-objects/Member';
import { Provider } from '../../page-objects/Provider';

dotenv.config();

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

test.describe("Playwright - User creation and provider completion for ondemand therapy", () => {
  test.describe.configure({ mode: 'serial' });

  let member: Member;
  let provider: Provider;

  test.beforeAll(async ({page1,page2}) => {
    member = new Member(page1)
    provider = new Provider(page2)
  });

  test.afterAll(async ({},testInfo) => {
    await setTestStatus(testInfo, [member.page,provider.page]);
  });

  test("Login as a provider ...", async () => {
    await provider.page.bringToFront()
    await provider.loginPage.loginAsProvider(process.env.PROVIDER_ACCOUNT_1 || email,process.env.PROVIDER_PASSWORD_1 || pass)
  });

  test("Close existing visits", async () => {
    await provider.homePage.closeLastVisits()
   });

  test("Playwright - User creation and provider completion for ondemand therapy",async()=>{
    await member.page.bringToFront()
    let stamp = Math.floor(new Date().getTime()/1000.0)
    let mail = newEmail+stamp+"@gmail.com"

    await member.loginPage.goto()
    await member.loginPage.register(mail,birth,accessCode)
    await member.createAccPage.createNewAccount(firstName,lastName,birth,street,city,zip,phone,password)
  })

  test("Create new therapy visit as member", async () => {
    await member.homePage.newUserGetCare()
  });

  test("Start a therapy visit ...",async()=>{
    await provider.page.bringToFront()
    await provider.homePage.startTherapy()
  })

  test("Accept visit as a member",async()=>{
    await member.page.bringToFront()
    await member.homePage.acceptVisit()
  })

  test("End therapy visit",async()=>{
    await provider.page.bringToFront()
    await provider.homePage.endMedicalNowTherapy()
  })

  test("Member rate skipping",async()=>{
    await member.page.bringToFront()
    await member.homePage.skipRates()
  })

});
