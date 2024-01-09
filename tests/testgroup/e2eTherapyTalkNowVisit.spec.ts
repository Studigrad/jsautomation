// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import { ProviderHomePage } from '../../page-objects/ProviderHomePage';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { setTestStatus } from "../../helpers/helpers";
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';
import 'dotenv/config';
import setCurrentTestInfo from '@playwright/test';
import { Member } from '../../page-objects/Member';
import { Provider } from '../../page-objects/Provider';

dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for TalkNow therapy", () => {
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

  test("Close existing visits ...", async () => {
    await provider.homePage.closeLastVisits()
   });

  test("Playwright - Member creation and provider completion for TalkNow therapy",async()=>{
    await member.page.bringToFront()
    await member.loginPage.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new therapy visit as member", async () => {
    await member.homePage.e2egetCareFlowTalkNow()
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
    await provider.homePage.endTalklNowTherapy()
  })

  test("Member rate skipping",async()=>{
    await member.page.bringToFront()
    await member.homePage.skipRates()
  })

});



