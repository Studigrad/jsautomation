// @ts-check
import { expect, chromium, BrowserContext } from '@playwright/test';
import { test } from '../../fixture/lambdaConfig';
import {type Page } from '@playwright/test';
import dotenv from 'dotenv';;
import 'dotenv/config'
import { convertDateToArray, setTestStatus } from '../../helpers/helpers';
import { Member } from '../../page-objects/Member';
import { Provider } from '../../page-objects/Provider';
import api from '../../page-objects/components/api';
dotenv.config();

const email = "timelyautomation+payfails@gmail.com"
const pass = "*bstract1nheritEncapspoly"

test.describe("Playwright - Member creation and provider completion for scheduled Health Coaching therapy", () => {
  test.describe.configure({ mode: 'serial' });
  let member: Member;
  let provider: Provider;
  let result:any

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

  test("API - Create new Health Counseling therapy visit as member",async()=>{
    let memberData = await api.returnMemberObject("timely.bot.member.1@gmail.com", "Test12345@");
    let providerData = await api.loginProvider("timely.bot.provider.1@gmail.com", "Test12345###");
    let createCurrentVisit = await api.scheduleCurrentVisit(
      memberData,
      providerData,
      "therapy",
      "Anxiety",
    );
    result = convertDateToArray(createCurrentVisit)
  })

  // test("Create new Health Coaching therapy visit as member", async () => {
  //   [date,time] = await member.homePage.e2eGetCareFlowCounselingOrCoaching("counseling")
  // });

  test("Start a Health Counseling therapy visit ...",async()=>{
    await provider.homePage.startScheduledTherapy(result)
  })

  test("Fill the survey",async()=>{
    await member.homePage.fillTheSurvey()
  })

  test("Accept Health Counseling visit as a member",async()=>{
    await member.homePage.acceptVisit()
  })

  test("End therapy visit",async()=>{
    await provider.homePage.endCounselingTherapy()
  })

  test("Member rate skipping",async()=>{
    await member.homePage.skipRates()
  })

  // test.only("Test",async()=>{
  //   await member.page.bringToFront()
  //   await member.loginPage.loginAsMember(process.env.MEMBER_ACCOUNT_1 || email,process.env.MEMBER_PASSWORD_1 || pass)
  //   await member.homePage.fillTheSurvey()
  // })

});
