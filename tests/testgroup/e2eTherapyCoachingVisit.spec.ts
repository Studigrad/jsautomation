// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { setTestStatus } from '../../helpers/helpers';
import { Member } from '../../page-objects/Member';
import { Provider } from '../../page-objects/Provider';
dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe.skip("Playwright - Member creation and provider completion for scheduled Health Coaching therapy", () => {
  test.describe.configure({ mode: 'serial' });
  let member: Member;
  let provider: Provider;

  let date: string;
  let time: string;

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

  test("Playwright - Member creation and provider completion for scheduled Health Coaching therapy",async()=>{
    await member.page.bringToFront()
    await member.loginPage.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  })

  test("Create new Health Coaching therapy visit as member", async () => {
    [date,time] = await member.homePage.e2eGetCareFlowCounselingOrCoaching("healthCoaching")
  });

  test("Start a Health Coaching therapy visit ...",async()=>{
    await provider.homePage.startScheduledTherapy(date,time)
  })

  test("Accept Health Coaching visit as a member",async()=>{
    await member.homePage.deleteCard("scheduled")
  })

  // test("End therapy visit",async()=>{
  //   await provider.homePage.endTalklNowTherapy()
  // })

  // test("Member rate skipping",async()=>{
  //   await homePageMember.skipRates()
  // })

});
